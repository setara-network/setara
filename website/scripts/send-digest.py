#!/usr/bin/env python3
"""
Daily blog digest emailer.
Fetches new blogs published today from Strapi, sends email to all subscribers.
Runs as a K8s CronJob at 9 PM IST (3:30 PM UTC) — after all 10 blogs are published.
"""

import os
import sys
import json
import smtplib
import requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timedelta, timezone

STRAPI_URL = os.environ.get("STRAPI_URL", "https://cms.setara.network")
STRAPI_API_TOKEN = os.environ.get("STRAPI_API_TOKEN", "")
SMTP_HOST = os.environ.get("SMTP_HOST", "mail.setara.network")
SMTP_PORT = int(os.environ.get("SMTP_PORT", "587"))
SMTP_USER = os.environ.get("SMTP_USER", "noreply@setara.network")
SMTP_PASS = os.environ.get("SMTP_PASS", "Welcome@123")
FROM_EMAIL = os.environ.get("FROM_EMAIL", "Setara Blog <noreply@setara.network>")
BASE_URL = os.environ.get("BASE_URL", "https://setara.network")

IST = timezone(timedelta(hours=5, minutes=30))


def fetch_todays_blogs():
    """Fetch blogs published today."""
    today = datetime.now(IST).strftime("%Y-%m-%d")
    headers = {"Authorization": f"Bearer {STRAPI_API_TOKEN}"}
    try:
        resp = requests.get(
            f"{STRAPI_URL}/api/setara-blogs?filters[date][$eq]={today}&fields[0]=title&fields[1]=slug&fields[2]=description&fields[3]=category&sort=id:asc&pagination[limit]=20",
            headers=headers,
            timeout=15,
        )
        if resp.ok:
            return resp.json().get("data", [])
    except Exception as e:
        print(f"Error fetching blogs: {e}")
    return []


def fetch_subscribers():
    """Fetch all active subscribers from Strapi."""
    headers = {"Authorization": f"Bearer {STRAPI_API_TOKEN}"}
    try:
        resp = requests.get(
            f"{STRAPI_URL}/api/subscribers?filters[active][$eq]=true&fields[0]=email&fields[1]=name&pagination[limit]=10000",
            headers=headers,
            timeout=15,
        )
        if resp.ok:
            return resp.json().get("data", [])
    except Exception as e:
        print(f"Error fetching subscribers: {e}")
    return []


def build_email_html(blogs, subscriber_name=""):
    """Build the daily digest email HTML."""
    today = datetime.now(IST).strftime("%B %d, %Y")
    greeting = f"Hi {subscriber_name}," if subscriber_name else "Hi there,"

    blog_items = ""
    for blog in blogs:
        b = blog.get("attributes", blog)
        title = b.get("title", "")
        slug = b.get("slug", "")
        desc = b.get("description", "")[:150]
        category = b.get("category", "")
        blog_items += f"""
        <tr>
          <td style="padding: 16px 0; border-bottom: 1px solid #333;">
            <a href="{BASE_URL}/blog/{slug}" style="color: #ffffff; text-decoration: none; font-size: 18px; font-weight: 600;">{title}</a>
            <p style="color: #999; margin: 8px 0 4px; font-size: 14px;">{desc}...</p>
            <span style="color: #666; font-size: 12px; background: #2a2a2a; padding: 2px 8px; border-radius: 4px;">{category}</span>
          </td>
        </tr>"""

    return f"""<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin: 0; padding: 0; background-color: #1e1e1e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #1e1e1e;">
    <tr><td align="center" style="padding: 40px 20px;">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color: #2a2a2a; border-radius: 12px; overflow: hidden;">
        <!-- Header -->
        <tr><td style="background: linear-gradient(135deg, #333 0%, #1e1e1e 100%); padding: 32px; text-align: center;">
          <h1 style="color: #fff; margin: 0; font-size: 24px;">Setara Network Blog</h1>
          <p style="color: #999; margin: 8px 0 0; font-size: 14px;">Daily Digest — {today}</p>
        </td></tr>

        <!-- Content -->
        <tr><td style="padding: 24px 32px;">
          <p style="color: #ccc; font-size: 16px; line-height: 1.6;">{greeting}</p>
          <p style="color: #ccc; font-size: 16px; line-height: 1.6;">Here are today's new articles on email privacy, security, and productivity:</p>

          <table width="100%" cellpadding="0" cellspacing="0">
            {blog_items}
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding: 16px 32px 32px; text-align: center;">
          <a href="{BASE_URL}/blogs" style="display: inline-block; background: #fff; color: #1e1e1e; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">View All Articles</a>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding: 24px 32px; background: #1e1e1e; text-align: center; border-top: 1px solid #333;">
          <p style="color: #666; font-size: 12px; margin: 0;">You're receiving this because you subscribed to the Setara Network blog.</p>
          <p style="color: #666; font-size: 12px; margin: 8px 0 0;"><a href="{BASE_URL}/blog/unsubscribe" style="color: #888;">Unsubscribe</a> · <a href="{BASE_URL}" style="color: #888;">setara.network</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>"""


def build_email_text(blogs):
    """Plain text version."""
    today = datetime.now(IST).strftime("%B %d, %Y")
    lines = [f"Setara Network Blog - Daily Digest ({today})\n"]
    for blog in blogs:
        b = blog.get("attributes", blog)
        lines.append(f"- {b.get('title', '')}")
        lines.append(f"  {BASE_URL}/blog/{b.get('slug', '')}\n")
    lines.append(f"\nView all: {BASE_URL}/blogs")
    lines.append(f"Unsubscribe: {BASE_URL}/blog/unsubscribe")
    return "\n".join(lines)


def send_email(to_email, to_name, subject, html, text):
    """Send email via SMTP."""
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = FROM_EMAIL
    msg["To"] = to_email
    msg["List-Unsubscribe"] = f"<{BASE_URL}/blog/unsubscribe>"

    msg.attach(MIMEText(text, "plain"))
    msg.attach(MIMEText(html, "html"))

    try:
        with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.sendmail(SMTP_USER, to_email, msg.as_string())
        return True
    except Exception as e:
        print(f"  Failed to send to {to_email}: {e}")
        return False


def main():
    blogs = fetch_todays_blogs()
    if not blogs:
        print("No blogs published today. Skipping digest.")
        return

    print(f"Found {len(blogs)} blogs published today")

    subscribers = fetch_subscribers()
    if not subscribers:
        print("No active subscribers. Skipping digest.")
        return

    print(f"Sending digest to {len(subscribers)} subscribers")

    today = datetime.now(IST).strftime("%B %d, %Y")
    subject = f"Setara Blog: {len(blogs)} New Articles — {today}"
    text = build_email_text(blogs)

    sent = 0
    failed = 0
    for sub in subscribers:
        s = sub.get("attributes", sub)
        email = s.get("email", "")
        name = s.get("name", "")
        if not email:
            continue

        html = build_email_html(blogs, name)
        if send_email(email, name, subject, html, text):
            sent += 1
        else:
            failed += 1

    print(f"Digest sent: {sent} success, {failed} failed")


if __name__ == "__main__":
    main()
