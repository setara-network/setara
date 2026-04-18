#!/usr/bin/env python3
"""
Blog Syndication Pipeline
Fetches published blogs from Strapi and cross-posts to:
- Dev.to (full article with canonical URL)
- Hashnode (full article with canonical URL)
- Social media via Postiz (Threads, Bluesky, Mastodon, LinkedIn, Facebook, Discord)

Runs as K8s CronJob after blog-publisher (e.g., 11 AM IST daily).
Tracks syndicated posts to avoid duplicates.
"""

import os
import sys
import json
import time
import requests
from datetime import datetime, timedelta, timezone

# --- Configuration ---
STRAPI_URL = os.environ.get("STRAPI_URL", "https://cms.setara.network")
STRAPI_API_TOKEN = os.environ.get("STRAPI_API_TOKEN", "")
POSTIZ_API_URL = os.environ.get("POSTIZ_API_URL", "https://social.setara.network/api/public/v1/posts")
POSTIZ_API_KEY = os.environ.get("POSTIZ_API_KEY", "26ff0e09c3d887caafd26a6cf185ed26ad4d9fffdabae4a79e0903c8f64a6ba3")
STATE_FILE = os.environ.get("STATE_FILE", "/data/syndicate-state.json")
BASE_URL = os.environ.get("BASE_URL", "https://setara.network")

IST = timezone(timedelta(hours=5, minutes=30))

# Postiz Integration IDs
INTEGRATIONS = {
    "devto": "cmmavdbcz000bi52xeej6ztp2",
    "hashnode": "cmmavkpkc000di52x1674kh2r",
    "threads": "cmmavswlc000fi52xamqcfuqi",
    "bluesky": "cmmate0w10003i52xyg1aad5l",
    "mastodon": "cmmatd0c30001i52xqcdmnlq6",
    "facebook": "cmmasvipg0005he2wri2o5avx",
    "discord": "cmmb14v8u0001qh2wfzophpyi",
    "lemmy": "cmmato60u0007i52xwngdff8h",
}

HASHNODE_PUB = "69a721b556428acc6f00af2c"
DISCORD_CHANNEL = "1478477723566608458"

POSTIZ_HEADERS = {
    "Content-Type": "application/json",
    "Authorization": POSTIZ_API_KEY,
}


def load_state():
    try:
        with open(STATE_FILE, "r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {"syndicated_slugs": []}


def save_state(state):
    os.makedirs(os.path.dirname(STATE_FILE) or ".", exist_ok=True)
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)


def fetch_todays_blogs():
    """Fetch blogs published today from Strapi."""
    today = datetime.now(IST).strftime("%Y-%m-%d")
    headers = {"Authorization": f"Bearer {STRAPI_API_TOKEN}"} if STRAPI_API_TOKEN else {}
    try:
        resp = requests.get(
            f"{STRAPI_URL}/api/setara-blogs?filters[date][$eq]={today}&populate=*&sort=id:asc&pagination[limit]=20",
            headers=headers,
            timeout=15,
        )
        if resp.ok:
            return resp.json().get("data", [])
    except Exception as e:
        print(f"Error fetching blogs: {e}")
    return []


def blog_to_markdown(blog):
    """Convert Strapi blog to markdown for Dev.to/Hashnode."""
    b = blog.get("attributes", blog)
    sections = b.get("blogSection", [])

    md = f"*{b.get('description', '')}*\n\n"

    for section in sections:
        if section.get("blogTitle"):
            md += f"## {section['blogTitle']}\n\n"
        if section.get("blogDse"):
            md += f"{section['blogDse']}\n\n"

    md += f"\n---\n\n*Originally published on [Setara Network Blog]({BASE_URL}/blog/{b.get('slug', '')})*\n"
    return md


def blog_to_social_post(blog):
    """Create a short social media post from blog."""
    b = blog.get("attributes", blog)
    title = b.get("title", "")
    desc = b.get("description", "")[:150]
    slug = b.get("slug", "")
    url = f"{BASE_URL}/blog/{slug}"
    category = b.get("category", "")

    return f"{title}\n\n{desc}...\n\n{url}\n\n#SetaraNetwork #BlockchainVerification #DocumentVerification #India #{category.replace(' ', '')}"


def post_to_postiz(integration_id, content, post_type="article", settings=None, schedule_date=None):
    """Post to Postiz API."""
    if settings is None:
        settings = {"__type": "unknown"}

    payload = {
        "type": "now" if not schedule_date else "schedule",
        "shortLink": False,
        "tags": [],
        "posts": [{
            "integration": {"id": integration_id},
            "value": [{"content": content, "image": []}],
            "settings": settings,
        }],
    }

    if schedule_date:
        payload["date"] = schedule_date

    for attempt in range(3):
        try:
            resp = requests.post(POSTIZ_API_URL, headers=POSTIZ_HEADERS, json=payload, timeout=60)
            if resp.status_code == 429:
                wait = 30 * (attempt + 1)
                print(f"    Rate limited, waiting {wait}s...")
                time.sleep(wait)
                continue
            return resp.status_code, resp.text[:200]
        except Exception as e:
            if attempt < 2:
                time.sleep(10)
            else:
                return 0, str(e)
    return 0, "Max retries"


def syndicate_to_devto(blog, schedule_time):
    """Post full article to Dev.to via Postiz."""
    b = blog.get("attributes", blog)
    title = b.get("title", "")
    slug = b.get("slug", "")
    canonical = f"{BASE_URL}/blog/{slug}"
    markdown = blog_to_markdown(blog)
    category = b.get("category", "Security").lower().replace(" ", "")

    content = markdown

    settings = {
        "__type": "devto",
        "title": title,
        "tags": [category, "email", "privacy", "security"],
        "canonical": canonical,
    }
    status, resp = post_to_postiz(INTEGRATIONS["devto"], content, "article", settings, schedule_time)
    return status in (200, 201), resp


def syndicate_to_hashnode(blog, schedule_time):
    """Post full article to Hashnode via Postiz."""
    b = blog.get("attributes", blog)
    title = b.get("title", "")
    slug = b.get("slug", "")
    canonical = f"{BASE_URL}/blog/{slug}"
    markdown = blog_to_markdown(blog)

    content = f"# {title}\n\n{markdown}"

    category = b.get("category", "Security").lower().replace(" ", "")
    settings = {
        "__type": "hashnode",
        "publication": HASHNODE_PUB,
        "title": title,
        "subtitle": b.get("description", "")[:140],
        "tags": [category, "email", "privacy"],
        "canonical": canonical,
    }
    status, resp = post_to_postiz(INTEGRATIONS["hashnode"], content, "article", settings, schedule_time)
    return status in (200, 201), resp


def syndicate_to_social(blog, platform, schedule_time):
    """Post short social post to a platform via Postiz."""
    content = blog_to_social_post(blog)
    settings = {"__type": platform}

    if platform == "discord":
        settings["channel"] = DISCORD_CHANNEL

    status, resp = post_to_postiz(INTEGRATIONS[platform], content, "post", settings, schedule_time)
    return status in (200, 201), resp


def main():
    state = load_state()
    blogs = fetch_todays_blogs()

    if not blogs:
        print("No blogs published today. Skipping syndication.")
        return

    print(f"Found {len(blogs)} blogs to syndicate")

    # Schedule times: stagger posts throughout the day
    now = datetime.now(IST)
    base_time = now.replace(hour=12, minute=0, second=0, microsecond=0)

    syndicated = 0
    for i, blog in enumerate(blogs):
        b = blog.get("attributes", blog)
        slug = b.get("slug", "")
        title = b.get("title", "")

        if slug in state["syndicated_slugs"]:
            print(f"  [{i+1}] Skipping (already syndicated): {title[:50]}")
            continue

        print(f"\n[{i+1}/{len(blogs)}] {title}")

        # Stagger by 30 min per blog
        schedule_time = (base_time + timedelta(minutes=30 * i)).strftime("%Y-%m-%dT%H:%M:%S.000Z")

        # 1. Dev.to
        ok, resp = syndicate_to_devto(blog, schedule_time)
        print(f"  Dev.to: {'OK' if ok else 'FAIL'} - {resp[:60]}")
        time.sleep(3)

        # 2. Hashnode
        ok, resp = syndicate_to_hashnode(blog, schedule_time)
        print(f"  Hashnode: {'OK' if ok else 'FAIL'} - {resp[:60]}")
        time.sleep(3)

        # 3. Social platforms (pick 3 per blog to avoid spam)
        platforms = ["threads", "bluesky", "mastodon"]
        if i % 3 == 0:
            platforms.append("facebook")
        if i % 5 == 0:
            platforms.append("discord")

        for platform in platforms:
            ok, resp = syndicate_to_social(blog, platform, schedule_time)
            print(f"  {platform}: {'OK' if ok else 'FAIL'}")
            time.sleep(2)

        state["syndicated_slugs"].append(slug)
        save_state(state)
        syndicated += 1
        time.sleep(5)

    print(f"\nSyndication complete: {syndicated} blogs distributed")


if __name__ == "__main__":
    main()
