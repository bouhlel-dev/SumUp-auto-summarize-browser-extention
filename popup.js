// popup.js

const btn = document.getElementById('summarizeBtn');
const status = document.getElementById('status');
const out = document.getElementById('output');
const length = document.getElementById('length');

// 🔁 Restore state when popup opens
document.addEventListener('DOMContentLoaded', async () => {
  chrome.storage.local.get(['summary', 'status', 'length'], (data) => {
    if (data.summary) out.textContent = data.summary;
    if (data.status) status.textContent = data.status;
    if (data.length) length.value = data.length;
  });
});

// 🧠 When user clicks "Summarize"
btn.addEventListener('click', async () => {
  out.textContent = '';
  status.textContent = 'Extracting page text...';
  await saveState(); // Save initial state

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.tabs.sendMessage(tab.id, { type: 'EXTRACT_TEXT' }, async (resp) => {
    if (!resp || !resp.text) {
      status.textContent = 'Failed to extract page text.';
      await saveState();
      return;
    }

    status.textContent = 'Generating summary...';
    await saveState();

    // Send to background for Gemini API call
    chrome.runtime.sendMessage(
      { type: 'SUMMARIZE', text: resp.text, length: length.value },
      async (res) => {
        if (!res) {
          status.textContent = 'No response from background.';
          await saveState();
          return;
        }
        if (res.error) {
          status.textContent = 'Error: ' + res.error;
          await saveState();
        } else {
          status.textContent = 'Done!';
          out.textContent = res.summary;
          await saveState();
        }
      }
    );
  });
});

// 💾 Helper function to save popup state
async function saveState() {
  await chrome.storage.local.set({
    summary: out.textContent,
    status: status.textContent,
    length: length.value
  });
}
