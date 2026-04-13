"""
screenshotter — capture desktop, tablet, and mobile viewport screenshots of any URL.

Usage:
    python screenshot.py <url>                         # 3 screenshots
    python screenshot.py <url> --composite             # 3 screenshots + composite image
    python screenshot.py <url> --output ./my-folder    # custom output directory
    python screenshot.py <url> --wait 3                # wait 3s after page load
    python screenshot.py <url> --full-page             # full page (scrollable) screenshots
    python screenshot.py --urls-file clients.txt       # batch mode from a text file

urls-file format (one URL per line, # for comments, optional label after tab):
    https://clientone.com
    https://clienttwo.com	Client Two Redesign
    # this line is skipped

Examples:
    python screenshot.py https://example.com
    python screenshot.py https://stripe.com --composite --full-page
    python screenshot.py --urls-file clients.txt --composite --output ./portfolio
"""

import argparse
import sys
import re
from pathlib import Path
from datetime import datetime
from typing import Optional

from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw, ImageFont


# ---------------------------------------------------------------------------
# Viewport definitions
# ---------------------------------------------------------------------------

VIEWPORTS = [
    {"name": "desktop",  "width": 1440, "height": 900},
    {"name": "tablet",   "width": 768,  "height": 1024},
    {"name": "mobile",   "width": 375,  "height": 812},
]

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def slugify(url: str) -> str:
    """Turn a URL into a safe folder name."""
    clean = re.sub(r"https?://", "", url)
    clean = re.sub(r"[^\w\-]", "_", clean).strip("_")
    return clean[:60]  # keep it reasonable


def make_output_dir(base: Path, url: str) -> Path:
    slug = slugify(url)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    folder = base / f"{slug}_{timestamp}"
    folder.mkdir(parents=True, exist_ok=True)
    return folder


def take_screenshots(url: str, output_dir: Path, full_page: bool, wait: int) -> dict[str, Path]:
    """Use Playwright to capture all viewports. Returns {name: path}."""
    results = {}

    with sync_playwright() as p:
        browser = p.chromium.launch()
        try:
            for vp in VIEWPORTS:
                print(f"  📸 {vp['name']} ({vp['width']}px)...", end=" ", flush=True)

                page = browser.new_page(
                    viewport={"width": vp["width"], "height": vp["height"]},
                    device_scale_factor=2,  # retina quality
                )

                try:
                    page.goto(url, wait_until="networkidle", timeout=30_000)
                except Exception:
                    # Fallback if networkidle times out (some sites keep polling)
                    page.goto(url, wait_until="domcontentloaded", timeout=30_000)

                if wait:
                    page.wait_for_timeout(wait * 1000)

                filename = output_dir / f"{vp['name']}_{vp['width']}px.png"
                page.screenshot(path=str(filename), full_page=full_page)
                results[vp["name"]] = filename
                print("✓")
        finally:
            browser.close()

    return results


# ---------------------------------------------------------------------------
# Composite builder
# ---------------------------------------------------------------------------

COMPOSITE_PADDING = 40       # outer padding around the whole image
CARD_PADDING = 24            # padding inside each card
LABEL_HEIGHT = 36            # height reserved for the viewport label
GAP = 32                     # gap between cards
CARD_BG = (245, 244, 242)    # near-white card background
CANVAS_BG = (30, 30, 30)     # dark canvas
LABEL_COLOR = (100, 100, 100)
TITLE_COLOR = (220, 220, 220)


def _load_font(size: int, bold: bool = False):
    """Try to load a system font; fall back to default."""
    import platform

    system = platform.system()
    if system == "Windows":
        candidates = [
            "C:/Windows/Fonts/SegoeUI.ttf",
            "C:/Windows/Fonts/seguisym.ttf",
            "C:/Windows/Fonts/segoeui.ttf",
        ]
    elif system == "Darwin":
        candidates = [
            "/System/Library/Fonts/Helvetica.ttc",
            "/Library/Fonts/Arial.ttf",
        ]
    else:
        # Linux / other
        candidates = [
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold
                else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
            "/usr/share/fonts/truetype/freefont/FreeSans.ttf",
        ]

    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            pass
    return ImageFont.load_default()


def build_composite(screenshot_paths: dict[str, Path], output_dir: Path, url: str) -> Path:
    """Stitch desktop, tablet, mobile into one branded composite."""

    images = {name: Image.open(p) for name, p in screenshot_paths.items()}

    # Scale each screenshot so the tallest is at most 700px (for readability)
    target_height = 700
    scaled = {}
    for vp in VIEWPORTS:
        name = vp["name"]
        img = images[name]
        scale = min(target_height / img.height, 1.0)
        new_w = int(img.width * scale)
        new_h = int(img.height * scale)
        scaled[name] = img.resize((new_w, new_h), Image.LANCZOS)

    card_widths  = [scaled[vp["name"]].width  + CARD_PADDING * 2 for vp in VIEWPORTS]
    card_heights = [scaled[vp["name"]].height + CARD_PADDING * 2 + LABEL_HEIGHT for vp in VIEWPORTS]

    total_width  = sum(card_widths) + GAP * (len(VIEWPORTS) - 1) + COMPOSITE_PADDING * 2
    total_height = max(card_heights) + COMPOSITE_PADDING * 2 + 60  # 60 for title bar

    canvas = Image.new("RGB", (total_width, total_height), CANVAS_BG)
    draw = ImageDraw.Draw(canvas)

    font_title = _load_font(18, bold=True)
    font_label = _load_font(13)

    # Draw title
    title_text = f"{url}"
    draw.text((COMPOSITE_PADDING, COMPOSITE_PADDING), title_text, font=font_title, fill=TITLE_COLOR)

    x_cursor = COMPOSITE_PADDING

    for vp in VIEWPORTS:
        name = vp["name"]
        img = scaled[name]
        card_w = img.width + CARD_PADDING * 2
        card_h = max(card_heights)
        y_top = COMPOSITE_PADDING + 60

        # Card background (rounded rect via bounding box)
        draw.rounded_rectangle(
            [x_cursor, y_top, x_cursor + card_w, y_top + card_h],
            radius=12,
            fill=CARD_BG,
        )

        # Label
        label = f"{name.upper()}  ·  {vp['width']}px"
        draw.text(
            (x_cursor + CARD_PADDING, y_top + 8),
            label,
            font=font_label,
            fill=LABEL_COLOR,
        )

        # Paste screenshot
        img_x = x_cursor + CARD_PADDING
        img_y = y_top + LABEL_HEIGHT + CARD_PADDING // 2
        canvas.paste(img, (img_x, img_y))

        x_cursor += card_w + GAP

    out_path = output_dir / "composite.png"
    canvas.save(str(out_path), optimize=True)
    return out_path


# ---------------------------------------------------------------------------
# Batch URL file parser
# ---------------------------------------------------------------------------

def parse_urls_file(filepath: Path) -> list[dict]:
    """
    Parse a plain text file of URLs into a list of {url, label} dicts.

    File format (one entry per line):
        https://example.com
        https://client.com    Client Name        ← optional label after a tab
        # comment lines are skipped
        (blank lines are skipped)
    """
    entries = []
    with open(filepath, "r", encoding="utf-8") as f:
        for raw in f:
            line = raw.strip()
            if not line or line.startswith("#"):
                continue
            parts = line.split("\t", 1)
            url = parts[0].strip()
            label = parts[1].strip() if len(parts) > 1 else None
            if not url.startswith("http"):
                url = "https://" + url
            entries.append({"url": url, "label": label})
    return entries


def process_url(url: str, label: Optional[str], args, base_output: Path, index: int, total: int):
    """Run the full screenshot + optional composite pipeline for one URL."""
    display = label or url
    print(f"\n[{index}/{total}] 🌐 {display}")
    print(f"         {url}")

    output_dir = make_output_dir(base_output, label or url)

    paths = take_screenshots(url, output_dir, full_page=args.full_page, wait=args.wait)

    if args.composite:
        print("  Building composite...", end=" ", flush=True)
        composite_path = build_composite(paths, output_dir, label or url)
        print(f"✓  →  {composite_path.name}")

    print(f"  📁 {output_dir.resolve()}")
    return output_dir


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="Capture desktop, tablet, and mobile screenshots of a URL.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    # url is now optional — either url or --urls-file is required
    parser.add_argument("url", nargs="?", help="The URL to screenshot (include https://)")
    parser.add_argument(
        "--urls-file", "-u",
        type=Path,
        metavar="FILE",
        help="Text file with one URL per line for batch mode",
    )
    parser.add_argument(
        "--composite", "-c",
        action="store_true",
        help="Also generate a single composite image with all viewports side by side",
    )
    parser.add_argument(
        "--output", "-o",
        default="./screenshots",
        help="Base output directory (default: ./screenshots)",
    )
    parser.add_argument(
        "--wait", "-w",
        type=int,
        default=0,
        help="Extra seconds to wait after page load (useful for animated sites)",
    )
    parser.add_argument(
        "--full-page", "-f",
        action="store_true",
        help="Capture the full scrollable page, not just the visible viewport",
    )

    args = parser.parse_args()

    # Validate: must have url OR --urls-file
    if not args.url and not args.urls_file:
        parser.error("Provide a URL or --urls-file.")
    if args.url and args.urls_file:
        parser.error("Provide a URL or --urls-file, not both.")

    base_output = Path(args.output)

    # ── Batch mode ──────────────────────────────────────────────────────────
    if args.urls_file:
        if not args.urls_file.exists():
            print(f"❌ File not found: {args.urls_file}")
            sys.exit(1)

        entries = parse_urls_file(args.urls_file)
        if not entries:
            print("❌ No URLs found in file.")
            sys.exit(1)

        total = len(entries)
        print(f"\n🗂  Batch mode — {total} URL{'s' if total != 1 else ''}")
        print(f"📁 Output: {base_output.resolve()}\n")

        failed = []
        for i, entry in enumerate(entries, 1):
            try:
                process_url(entry["url"], entry["label"], args, base_output, i, total)
            except Exception as e:
                print(f"  ❌ Failed: {e}")
                failed.append(entry["url"])

        print(f"\n{'─' * 50}")
        print(f"✅ Done — {total - len(failed)}/{total} succeeded")
        if failed:
            print("❌ Failed URLs:")
            for u in failed:
                print(f"   {u}")
        print()

    # ── Single URL mode ──────────────────────────────────────────────────────
    else:
        url = args.url
        if not url.startswith("http"):
            url = "https://" + url

        print(f"\n🌐 URL: {url}")
        print(f"📁 Output: {args.output}\n")

        output_dir = make_output_dir(base_output, url)

        print("Capturing screenshots...")
        paths = take_screenshots(url, output_dir, full_page=args.full_page, wait=args.wait)

        if args.composite:
            print("\nBuilding composite image...", end=" ", flush=True)
            composite_path = build_composite(paths, output_dir, url)
            print(f"✓  →  {composite_path.name}")

        print(f"\n✅ Done! Files saved to: {output_dir.resolve()}\n")
        for name, path in paths.items():
            print(f"   {name:8s} → {path.name}")
        if args.composite:
            print(f"   {'composite':8s} → composite.png")
        print()


if __name__ == "__main__":
    main()
