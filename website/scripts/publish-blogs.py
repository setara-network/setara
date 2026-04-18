#!/usr/bin/env python3
"""
Setara Blog Publisher - Generates blogs with illustrations and publishes to Strapi.
Uses Groq API (Llama 3.3 70B) for content, Storyset for illustrations.

Usage:
    python3 publish-blogs.py                    # Publish next batch of 10
    python3 publish-blogs.py --dry-run          # Generate without publishing
    python3 publish-blogs.py --start-from 50    # Start from blog ID 50
    python3 publish-blogs.py --single 42        # Publish only blog ID 42
"""

import os
import sys
import json
import time
import re
import argparse
import requests
import random
from datetime import datetime, timedelta, timezone
from io import BytesIO

# --- Configuration ---
STRAPI_URL = os.environ.get("STRAPI_URL", "https://cms.nubo.email")
STRAPI_API_TOKEN = os.environ.get("STRAPI_API_TOKEN", "")
GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
STATE_FILE = os.environ.get("STATE_FILE", "./publish-state.json")
TOPICS_FILE = os.environ.get("TOPICS_FILE", "./blog-topics-1000.json")
GROQ_MODEL = os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile")

IST = timezone(timedelta(hours=5, minutes=30))

# --- Illustration Configuration ---
# Search queries mapped to blog categories for Storyset
CATEGORY_ILLUSTRATION_QUERIES = {
    "Technology": ["blockchain", "server", "data+protection", "encryption", "cloud+storage"],
    "Use Cases": ["certificate", "education", "government", "healthcare", "authentication"],
    "Compliance": ["data+protection", "privacy", "authentication", "server", "encryption"],
    "Tutorials": ["coding", "server", "cloud+storage", "data+protection", "authentication"],
    "Industry": ["education", "government", "healthcare", "certificate", "authentication"],
    "Comparisons": ["data+protection", "server", "blockchain", "encryption", "cloud+storage"],
    "Glossary": ["education", "server", "data+protection", "blockchain", "encryption"],
}

# Color mapping for dark theme (black bg, white text)
# Replace Storyset's default accent colors with white/gray shades
COLOR_REPLACEMENTS = {
    "#407BFF": "#e0e0e0",   # Primary blue -> light gray
    "#407bff": "#e0e0e0",
    "#2563EB": "#e0e0e0",   # Another blue
    "#2563eb": "#e0e0e0",
    "#6c63ff": "#d0d0d0",   # unDraw default purple
    "#FF6584": "#aaaaaa",   # Pink accent -> medium gray
    "#ff6584": "#aaaaaa",
    "#3f3d56": "#888888",   # Dark elements -> lighter for dark bg
    "#2f2e41": "#999999",   # Dark purple -> medium gray
    "#f0f0f0": "#2a2a2a",   # Light bg elements -> dark (for contrast on black)
    "#ebebeb": "#333333",   # Light gray bg -> dark gray
    "#e6e6e6": "#3a3a3a",   # Light gray -> dark gray
    "#f5f5f5": "#222222",   # Near white bg -> near black
    "#fafafa": "#1a1a1a",   # White bg -> very dark
    "#263238": "#cccccc",   # Dark text -> light
}

# Pre-fetched illustration cache
_illustration_cache = {}


def load_state():
    try:
        with open(STATE_FILE, "r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {"published_ids": [], "last_batch_date": None, "errors": []}


def save_state(state):
    os.makedirs(os.path.dirname(STATE_FILE) or ".", exist_ok=True)
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2, default=str)


def load_topics():
    with open(TOPICS_FILE, "r") as f:
        data = json.load(f)
    return data.get("blogs", [])


def fetch_illustration_urls(query):
    """Fetch PNG illustration URLs from Storyset for a given query."""
    if query in _illustration_cache:
        return _illustration_cache[query]

    try:
        resp = requests.get(f"https://storyset.com/search?q={query}", timeout=15)
        if resp.status_code == 200:
            # Get PNG illustrations (transparent background, work great on dark themes)
            urls = re.findall(
                r'(https://stories\.freepiklabs\.com/storage/\d+/[^"]+\.png)',
                resp.text,
            )
            unique = list(dict.fromkeys(urls))
            _illustration_cache[query] = unique
            return unique
    except Exception as e:
        print(f"  Warning: Could not fetch illustrations for '{query}': {e}")

    return []


def get_illustration_for_blog(topic):
    """Find and download an appropriate illustration for a blog post."""
    category = topic.get("category", "Security")
    queries = CATEGORY_ILLUSTRATION_QUERIES.get(category, ["email", "data+protection"])

    # Use blog ID to deterministically pick query and illustration
    query = queries[topic["id"] % len(queries)]
    urls = fetch_illustration_urls(query)

    if not urls:
        # Fallback to generic email illustrations
        urls = fetch_illustration_urls("email")

    if not urls:
        print("  Warning: No illustrations found")
        return None

    # Pick illustration deterministically based on blog ID
    url = urls[topic["id"] % len(urls)]
    return url


def download_illustration(url):
    """Download PNG illustration from Storyset (transparent bg, works on dark themes)."""
    try:
        resp = requests.get(url, timeout=15)
        if resp.status_code != 200:
            print(f"  Warning: Failed to download illustration ({resp.status_code})")
            return None
        return resp.content
    except Exception as e:
        print(f"  Warning: Error downloading illustration: {e}")
        return None


def upload_image_to_strapi(image_data, filename):
    """Upload PNG image to Strapi media library."""
    if not STRAPI_API_TOKEN:
        return None

    headers = {
        "Authorization": f"Bearer {STRAPI_API_TOKEN}",
    }

    files = {
        "files": (filename, BytesIO(image_data), "image/png"),
    }

    data = {
        "fileInfo": json.dumps({
            "name": filename,
            "alternativeText": filename.replace("-", " ").replace(".png", ""),
            "caption": "Illustration by Storyset (storyset.com)",
        }),
    }

    try:
        resp = requests.post(
            f"{STRAPI_URL}/api/upload",
            headers=headers,
            files=files,
            data=data,
            timeout=30,
        )

        if resp.status_code in (200, 201):
            result = resp.json()
            if isinstance(result, list) and len(result) > 0:
                img_id = result[0].get("id")
                img_url = result[0].get("url", "")
                print(f"  Image uploaded (ID: {img_id}, URL: {img_url[:60]}...)")
                return img_id
            elif isinstance(result, dict) and "id" in result:
                print(f"  Image uploaded (ID: {result['id']})")
                return result["id"]
        else:
            print(f"  Image upload failed ({resp.status_code}): {resp.text[:200]}")

    except Exception as e:
        print(f"  Image upload error: {e}")

    return None


def generate_blog_content(topic):
    """Generate blog content using Groq API (Llama 3.3 70B)."""
    if not GROQ_API_KEY:
        print("  ERROR: No GROQ_API_KEY set")
        sys.exit(1)

    prompt = f"""You are an expert content writer for Setara Network (setara.network), India's Proof-of-Authority blockchain purpose-built for document verification. Write a comprehensive, SEO-optimized blog post.

BLOG DETAILS:
- Title: {topic['title']}
- Target Keywords: {', '.join(topic.get('target_keywords', []))}
- Category: {topic['category']}
- SEO Type: {topic.get('seo_type', 'content')}
- Target Read Time: {topic.get('estimated_read_time', 7)} minutes (~{topic.get('estimated_read_time', 7) * 200} words)

ABOUT SETARA NETWORK (reference naturally 2-3 times where relevant, do NOT force it):
- India's first PoA blockchain for document verification at setara.network
- Built on Cosmos SDK v0.53.6 with CometBFT consensus
- Zero gas fees — uses fiat credits (1 credit = 1 INR per document registration)
- 5,000 free credits on signup, no cryptocurrency required
- Organizations register document SHA-256 hashes on an immutable ledger
- Document files stored on IPFS, hashes stored on-chain
- Anyone can verify documents via the free public API (no auth required)
- 100% NBF (National Blockchain Framework) compliant
- Data localization: all data stays in India
- Organizations become validators and run their own nodes via Docker
- REST API with code examples in Node.js, Python, Go, and curl
- Target users: universities, government departments, NGOs, hospitals, sports federations, law firms
- IBC interoperability with the broader Cosmos ecosystem
- Competitors: DigiLocker (complementary), Hyperledger Fabric, traditional Certificate Authorities
- Made in India by Chandorkar Technologies

WRITING RULES:
1. Start with a direct 50-60 word summary paragraph answering the core question (for Google AI Overviews)
2. Use ## for main sections and ### for subsections
3. Include at least one statistic or data point every 200 words (cite real Indian sources: UGC, AICTE, MoHFW, AIU, NHA, state governments)
4. Write for university registrars, government IT officers, NGO administrators, and hospital compliance teams
5. Include a "## Frequently Asked Questions" section with 4-5 Q&As at the end
6. End with a "## Conclusion" section with a subtle call-to-action mentioning setara.network
7. Use clear, professional language (Flesch reading score 60+)
8. NO meta commentary, NO "In this article we'll cover...", NO filler
9. Be specific, authoritative, and data-driven
10. Reference real Indian institutions, laws (IT Act 2000, Indian Evidence Act, DPDP Act), and frameworks

OUTPUT: Return ONLY the blog content in markdown format. Start with the introduction paragraph directly (not the title)."""

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {GROQ_API_KEY}",
    }

    payload = {
        "model": GROQ_MODEL,
        "messages": [{"role": "user", "content": prompt}],
        "max_tokens": 4096,
        "temperature": 0.7,
        "top_p": 0.9,
    }

    for attempt in range(3):
        try:
            resp = requests.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers=headers,
                json=payload,
                timeout=120,
            )
            if resp.status_code == 429:
                wait = 30 * (attempt + 1)
                print(f"  Rate limited, waiting {wait}s...")
                time.sleep(wait)
                continue
            resp.raise_for_status()
            data = resp.json()
            content = data["choices"][0]["message"]["content"]
            usage = data.get("usage", {})
            print(f"  Content generated: {usage.get('total_tokens', '?')} tokens")
            return parse_blog_content(content, topic)
        except Exception as e:
            print(f"  Error generating content (attempt {attempt + 1}): {e}")
            if attempt < 2:
                time.sleep(10)

    print("  FAILED: Could not generate content after 3 attempts")
    return None


def parse_blog_content(markdown_content, topic):
    """Parse generated markdown into Strapi blog sections."""
    sections = []
    current_title = ""
    current_content = []

    for line in markdown_content.split("\n"):
        if line.startswith("## "):
            if current_title or current_content:
                sections.append({
                    "blogTitle": current_title,
                    "blogDse": "\n".join(current_content).strip(),
                })
            current_title = line[3:].strip()
            current_content = []
        else:
            current_content.append(line)

    if current_title or current_content:
        sections.append({
            "blogTitle": current_title,
            "blogDse": "\n".join(current_content).strip(),
        })

    description = ""
    if sections and sections[0]["blogDse"]:
        first_para = sections[0]["blogDse"].split("\n\n")[0]
        description = first_para[:300].strip()
        if len(first_para) > 300:
            description = description[:description.rfind(" ")] + "..."

    return {
        "description": description,
        "sections": sections,
        "read_time": topic.get("estimated_read_time", 7),
    }


def publish_to_strapi(topic, content, publish_time, image_id=None):
    """Publish a blog post to Strapi via REST API."""
    if not STRAPI_API_TOKEN:
        print("  ERROR: STRAPI_API_TOKEN not set")
        return False

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {STRAPI_API_TOKEN}",
    }

    blog_data = {
        "data": {
            "title": topic["title"],
            "slug": topic["slug"],
            "description": content["description"],
            "date": publish_time.strftime("%Y-%m-%d"),
            "readTime": str(content["read_time"]),
            "category": topic["category"],
            "isPopular": topic.get("seo_type") in ["pillar", "product-led"],
            "blogSection": content["sections"],
        }
    }

    # Attach featured image if uploaded
    if image_id:
        blog_data["data"]["image"] = image_id

    try:
        resp = requests.post(
            f"{STRAPI_URL}/api/setara-blogs",
            headers=headers,
            json=blog_data,
            timeout=30,
        )

        if resp.status_code in (200, 201):
            result = resp.json()
            blog_id = result.get("data", {}).get("id", "unknown")
            print(f"  Published to Strapi (ID: {blog_id})")
            return True
        else:
            print(f"  Strapi FAILED ({resp.status_code}): {resp.text[:300]}")
            return False

    except Exception as e:
        print(f"  Strapi ERROR: {e}")
        return False


def trigger_website_rebuild():
    """Trigger nubo-website rollout restart to rebuild with updated sitemap."""
    print("\nTriggering website rebuild for updated sitemap...")
    try:
        # Use Kubernetes API from inside the cluster
        import subprocess
        result = subprocess.run(
            ["kubectl", "rollout", "restart", "deployment/setara-website", "-n", "nubo"],
            capture_output=True, text=True, timeout=30,
        )
        if result.returncode == 0:
            print("  Website rebuild triggered successfully")
        else:
            print(f"  kubectl not available (expected in CronJob): {result.stderr[:100]}")
            # Alternative: call GitHub Actions API to trigger rebuild
            gh_token = os.environ.get("GITHUB_TOKEN", "")
            if gh_token:
                resp = requests.post(
                    "https://api.github.com/repos/setara-network/setara/dispatches",
                    headers={"Authorization": f"token {gh_token}", "Accept": "application/vnd.github.v3+json"},
                    json={"event_type": "rebuild-sitemap"},
                    timeout=10,
                )
                print(f"  GitHub dispatch: {resp.status_code}")
            else:
                print("  Skipping rebuild (no kubectl or GITHUB_TOKEN)")
    except Exception as e:
        print(f"  Rebuild trigger failed: {e}")


def get_publish_times(batch_date):
    times = []
    base = datetime(batch_date.year, batch_date.month, batch_date.day, 9, 0, 0, tzinfo=IST)
    for hour_offset in range(10):
        times.append(base + timedelta(hours=hour_offset))
    return times


def main():
    parser = argparse.ArgumentParser(description="Nubo Blog Publisher")
    parser.add_argument("--dry-run", action="store_true", help="Generate content but don't publish")
    parser.add_argument("--start-from", type=int, default=None, help="Start from blog ID")
    parser.add_argument("--single", type=int, default=None, help="Publish only this blog ID")
    parser.add_argument("--batch-size", type=int, default=10, help="Blogs per batch")
    parser.add_argument("--no-images", action="store_true", help="Skip image generation")
    args = parser.parse_args()

    state = load_state()
    topics = load_topics()

    if not topics:
        print("ERROR: No topics found.")
        sys.exit(1)

    print(f"Loaded {len(topics)} blog topics")
    print(f"Already published: {len(state['published_ids'])} blogs")
    print(f"Model: {GROQ_MODEL}")
    print(f"Images: {'disabled' if args.no_images else 'Storyset (dark theme recolored)'}")

    if args.single:
        pending = [t for t in topics if t["id"] == args.single]
    elif args.start_from:
        pending = [t for t in topics if t["id"] >= args.start_from and t["id"] not in state["published_ids"]]
    else:
        pending = [t for t in topics if t["id"] not in state["published_ids"]]

    if not pending:
        print("No pending blogs to publish!")
        return

    batch = pending[:args.batch_size]
    today = datetime.now(IST).date()
    publish_times = get_publish_times(today)

    print(f"\n{'='*60}")
    print(f"Publishing batch of {len(batch)} blogs for {today}")
    print(f"{'='*60}\n")

    success_count = 0
    fail_count = 0

    for i, topic in enumerate(batch):
        publish_time = publish_times[i % len(publish_times)]

        print(f"[{i+1}/{len(batch)}] #{topic['id']}: {topic['title']}")
        print(f"  Category: {topic['category']} | SEO: {topic.get('seo_type', 'content')}")

        # Step 1: Get illustration
        image_id = None
        if not args.no_images and not args.dry_run:
            illustration_url = get_illustration_for_blog(topic)
            if illustration_url:
                print(f"  Illustration: {illustration_url.split('/')[-1][:50]}")
                img_data = download_illustration(illustration_url)
                if img_data:
                    filename = f"{topic['slug']}.png"
                    image_id = upload_image_to_strapi(img_data, filename)

        # Step 2: Generate content via Groq
        content = generate_blog_content(topic)

        if content is None:
            fail_count += 1
            state["errors"].append({
                "id": topic["id"], "title": topic["title"],
                "date": str(today), "error": "generation_failed",
            })
            save_state(state)
            print()
            continue

        print(f"  Sections: {len(content['sections'])}")

        # Step 3: Publish
        if args.dry_run:
            print(f"  [DRY RUN] Would publish with image_id={image_id}")
            success_count += 1
        else:
            success = publish_to_strapi(topic, content, publish_time, image_id)
            if success:
                state["published_ids"].append(topic["id"])
                state["last_batch_date"] = str(today)
                save_state(state)
                success_count += 1
            else:
                fail_count += 1
                state["errors"].append({
                    "id": topic["id"], "title": topic["title"],
                    "date": str(today), "error": "publish_failed",
                })
                save_state(state)

        print()

        # Rate limit: Groq free tier ~14K tokens/min
        if i < len(batch) - 1:
            time.sleep(8)

    print(f"{'='*60}")
    print(f"Batch complete: {success_count} success, {fail_count} failed")
    print(f"Total published: {len(state['published_ids'])}")
    print(f"Remaining: {len(topics) - len(state['published_ids'])}")
    print(f"{'='*60}")

    # Trigger website rebuild to update sitemap with new blog URLs
    if success_count > 0 and not args.dry_run:
        trigger_website_rebuild()


if __name__ == "__main__":
    main()
