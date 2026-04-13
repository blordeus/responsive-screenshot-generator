"""
screenshotter GUI — FastAPI server
Run: python app.py
Opens at http://localhost:8765
"""

import os
import sys
import threading
import webbrowser
from pathlib import Path
from datetime import datetime
from typing import Optional

import uvicorn
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# Import core logic from screenshot.py (same folder)
sys.path.insert(0, str(Path(__file__).parent))
from screenshot import (
    take_screenshots,
    build_composite,
    make_output_dir,
    slugify,
    VIEWPORTS,
)

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------

app = FastAPI(title="Screenshotter GUI")

OUTPUT_BASE = Path(__file__).parent / "screenshots"
OUTPUT_BASE.mkdir(exist_ok=True)

# Serve screenshots as static files so the browser can display them
app.mount("/files", StaticFiles(directory=str(OUTPUT_BASE)), name="files")

# ---------------------------------------------------------------------------
# Job store (in-memory, single-user local tool)
# ---------------------------------------------------------------------------

jobs: dict[str, dict] = {}  # job_id → {status, log, results}


def new_job_id() -> str:
    return datetime.now().strftime("%Y%m%d_%H%M%S_%f")


def log_job(job_id: str, message: str):
    jobs[job_id]["log"].append(message)


# ---------------------------------------------------------------------------
# Screenshot worker (runs in thread so it doesn't block the event loop)
# ---------------------------------------------------------------------------

def run_job(job_id: str, url: str, label: Optional[str], full_page: bool, wait: int, composite: bool):
    try:
        jobs[job_id]["status"] = "running"
        display = label or url
        log_job(job_id, f"Starting: {display}")

        output_dir = make_output_dir(OUTPUT_BASE, label or url)
        log_job(job_id, f"Output folder: {output_dir.name}")

        # Capture all viewports in one call
        log_job(job_id, "Capturing desktop, tablet, mobile...")
        paths = take_screenshots(url, output_dir, full_page=full_page, wait=wait)

        # Build file paths relative to OUTPUT_BASE for serving
        results = {}
        for name, p in paths.items():
            rel = p.relative_to(OUTPUT_BASE)
            results[name] = {
                "file": str(rel).replace("\\", "/"),
                "width": next(v["width"] for v in VIEWPORTS if v["name"] == name),
            }

        # Composite
        if composite:
            log_job(job_id, "Building composite image...")
            comp_path = build_composite(paths, output_dir, label or url)
            rel = comp_path.relative_to(OUTPUT_BASE)
            results["composite"] = {"file": str(rel).replace("\\", "/")}

        jobs[job_id]["status"] = "done"
        jobs[job_id]["results"] = results
        jobs[job_id]["output_dir"] = str(output_dir.resolve())
        log_job(job_id, "Done ✓")

    except Exception as e:
        jobs[job_id]["status"] = "error"
        log_job(job_id, f"Error: {e}")


# ---------------------------------------------------------------------------
# API routes
# ---------------------------------------------------------------------------

class CaptureRequest(BaseModel):
    url: str
    label: Optional[str] = None
    full_page: bool = False
    wait: int = 0
    composite: bool = True


@app.post("/api/capture")
def capture(req: CaptureRequest):
    url = req.url if req.url.startswith("http") else "https://" + req.url
    job_id = new_job_id()
    jobs[job_id] = {"status": "queued", "log": [], "results": {}, "output_dir": ""}

    t = threading.Thread(
        target=run_job,
        args=(job_id, url, req.label, req.full_page, req.wait, req.composite),
        daemon=True,
    )
    t.start()
    return {"job_id": job_id}


@app.get("/api/job/{job_id}")
def get_job(job_id: str):
    if job_id not in jobs:
        return {"error": "Job not found"}
    return jobs[job_id]


@app.get("/api/jobs")
def list_jobs():
    return [
        {"job_id": jid, "status": j["status"], "output_dir": j.get("output_dir", "")}
        for jid, j in reversed(list(jobs.items()))
    ]


@app.get("/api/open-folder")
def open_folder(path: str):
    """Open the output folder in Finder/Explorer."""
    import subprocess, platform
    try:
        if platform.system() == "Windows":
            os.startfile(path)
        elif platform.system() == "Darwin":
            subprocess.run(["open", path])
        else:
            subprocess.run(["xdg-open", path])
        return {"ok": True}
    except Exception as e:
        return {"ok": False, "error": str(e)}


# ---------------------------------------------------------------------------
# Serve the frontend
# ---------------------------------------------------------------------------

@app.get("/", response_class=HTMLResponse)
def index():
    html_path = Path(__file__).parent / "index.html"
    return HTMLResponse(html_path.read_text(encoding="utf-8"))


# ---------------------------------------------------------------------------
# Launch
# ---------------------------------------------------------------------------

def open_browser():
    import time
    time.sleep(1.2)
    webbrowser.open("http://localhost:8765")


if __name__ == "__main__":
    print("\n🖥  Screenshotter GUI")
    print("   http://localhost:8765\n")
    threading.Thread(target=open_browser, daemon=True).start()
    uvicorn.run(app, host="127.0.0.1", port=8765, log_level="warning")
