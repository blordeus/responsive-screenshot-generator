# Responsive Screenshot Generator

A local Python tool that captures **desktop, tablet, and mobile** screenshots of any URL — with a GUI and CLI interface.

Built for marketers and developers who need clean, consistent responsive screenshots for client reports, case studies, and portfolio work.

---

## Features

- 📸 Captures at **Desktop (1440px)**, **Tablet (768px)**, and **Mobile (375px)** viewports
- 🖼 Optional **composite image** — all three viewports side by side in one PNG
- 📄 **Full page** mode to capture the entire scrollable page
- 🖥 **GUI mode** — browser-based interface, launch with one command (or double-click)
- ⌨️ **CLI mode** — scriptable, batch-friendly
- 📋 **Batch mode** — process multiple URLs from a text file
- 🗂 Auto-organized output folders per URL with timestamps
- ⚡ Retina-quality (2x) screenshots via Playwright + Chromium

---

## Setup

**Requirements:** Python 3.10+

```bash
pip install -r requirements.txt
python -m playwright install chromium
```

---

## GUI Mode

The easiest way to use the tool. Launches a local web interface at `http://localhost:8765`.

**Windows — double-click:**
```
launch.bat
```

**Any platform — terminal:**
```bash
python app.py
```

The browser opens automatically. Paste a URL, configure options, and click **Capture**. Screenshots preview inline with a lightbox viewer.

![GUI screenshot](https://via.placeholder.com/900x500/1e1e1e/F4F0E8?text=GUI+Preview)

---

## CLI Mode

### Single URL

```bash
python screenshot.py https://example.com
```

### With options

```bash
# Full page + composite image
python screenshot.py https://example.com --composite --full-page

# Custom output folder + 2s wait for animations
python screenshot.py https://example.com --output ./clients/acme --wait 2
```

### Batch mode

```bash
python screenshot.py --urls-file clients.txt --composite --output ./portfolio
```

**`clients.txt` format** — one URL per line, optional label after a tab:

```
https://clientone.com
https://clienttwo.com	Client Two Rebrand
# comment lines are skipped
```

---

## CLI Options

| Flag | Short | Description |
|------|-------|-------------|
| `--composite` | `-c` | Generate a single image with all 3 viewports |
| `--full-page` | `-f` | Capture the full scrollable page |
| `--output DIR` | `-o` | Output directory (default: `./screenshots`) |
| `--wait N` | `-w` | Extra seconds to wait after page load |
| `--urls-file FILE` | `-u` | Batch mode — text file of URLs |

---

## Output Structure

Each run creates a timestamped folder:

```
screenshots/
└── example_com_20250403_143022/
    ├── desktop_1440px.png
    ├── tablet_768px.png
    ├── mobile_375px.png
    └── composite.png        ← if --composite is enabled
```

---

## Project Structure

```
responsive-screenshot-generator/
├── screenshot.py     ← core logic + CLI entry point
├── app.py            ← FastAPI server (GUI backend)
├── index.html        ← GUI frontend
├── launch.bat        ← Windows double-click launcher
├── clients.txt       ← sample batch URL file
└── requirements.txt
```

---

## Tech Stack

- [Playwright](https://playwright.dev/python/) — headless Chromium for screenshot capture
- [Pillow](https://python-pillow.org/) — composite image generation
- [FastAPI](https://fastapi.tiangolo.com/) — local GUI server
- [Uvicorn](https://www.uvicorn.org/) — ASGI server

---

## Use Cases

- Generate responsive screenshots for **client case studies**
- Document **before/after redesigns** across breakpoints
- Audit **client sites** for mobile responsiveness issues
- Build **portfolio assets** showing responsive design work
