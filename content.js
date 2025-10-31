// content.js

function extractArticleText() {
  const selectors = [
    '#mw-content-text', // Wikipedia
    'article',
    'main',
    '.post-content',
    '.article-body',
    'body'
  ];

  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (el && el.innerText.trim().length > 200) {
      return el.innerText.trim();
    }
  }
  return document.body.innerText || '';
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg && msg.type === 'EXTRACT_TEXT') {
    try {
      const text = extractArticleText();
      console.log("Extracted text length:", text.length);
      sendResponse({ text });
    } catch (err) {
      console.error("Extraction error:", err);
      sendResponse({ text: null, error: err.message });
    }
  }
  // Important for async messaging
  return true;
});
