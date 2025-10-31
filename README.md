
# Auto Summarizer Chrome Extension

A sleek Chrome extension that **summarizes any webpage** using Google Gemini API. Great for articles, Wikipedia pages, PDFs, and research content.

---

## Features

- **Instant Summaries**: Summarize pages with one click.
- **Customizable Length**: Short (1-3 lines), Medium (paragraph), Long (detailed).
- **Sleek UI**: Modern popup design with animated loader.
- **Chunked Summaries**: Handles long pages efficiently.
- **Persistent State**: Keeps the last summary visible even after closing the popup.

---

## Screenshots

<img width="442" height="377" alt="Image" src="https://github.com/user-attachments/assets/3dcdbb9d-9a37-41c7-a8e4-3702876fe71d" /></br></br>
<img width="442" height="776" alt="Image" src="https://github.com/user-attachments/assets/cdf9c6f8-8a5e-4d87-a551-f584c7dc0522" /></br></br>
<img width="1823" height="858" alt="Image" src="https://github.com/user-attachments/assets/f4032a1d-3705-4d1d-a426-f6d1fe8c7646" />
---

## Installation

1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the extension folder.
5. Add your **Gemini API key**

---

## Usage

1. Open any webpage you want to summarize.
2. Click the **Auto Summarizer** extension icon.
3. Select the summary length.
4. Click **Summarize Page**.
5. Wait for the loader to finish — the summary will appear in the popup.

---

## File Structure

```
auto-summarizer/
├─ popup.html         # Popup interface
├─ popup.js           # Handles UI logic and API calls
├─ content.js         # Extracts text from the current page
├─ background.js      # Handles Gemini API requests
├─ manifest.json      # Chrome extension manifest
├─ icon.png           # Extension icon
└─ README.md          # This file

```

---

## Dependencies

- [Google Gemini API](https://developers.generativeai.google/) for text summarization

---

## Tips for Best Performance

- Use **Gemini Flash model** for faster summaries.
- For very long pages, the extension automatically **chunks text**.
- Keep the popup open for best visual feedback.

---


