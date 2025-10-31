// background.js

function chunkText(t, maxChars = 12000) {
  const chunks = [];
  let i = 0;
  while (i < t.length) {
    chunks.push(t.slice(i, i + maxChars));
    i += maxChars;
  }
  return chunks;
}

async function callGemini(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`API ${resp.status}: ${txt}`);
  }

  const data = await resp.json();
  console.log("Gemini response:", data);
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No summary found.";
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'SUMMARIZE') {
    (async () => {
      try {
        const apiKey = "";//put ur api key here//await getApiKey();
        if (!apiKey) {
          sendResponse({ error: 'Missing Gemini API key. Save it first.' });
          return;
        }

        const text = msg.text;
        const chunks = chunkText(text);
        const summaries = [];

        for (let i = 0; i < chunks.length; i++) {
          const prompt = `Summarize the following text in a clear, concise ${msg.length} summary:\n\n${chunks[i]}`;
          const s = await callGemini(prompt, apiKey);
          summaries.push(s);
        }

        let finalSummary = summaries.join("\n\n");
        if (summaries.length > 1) {
          const mergePrompt = `Combine these partial summaries into one cohesive ${msg.length} summary:\n\n${finalSummary}`;
          finalSummary = await callGemini(mergePrompt, apiKey);
        }

        sendResponse({ summary: finalSummary });
      } catch (err) {
        sendResponse({ error: err.message || String(err) });
      }
    })();

    return true; // Keep port open for async
  }
});

/*function getApiKey() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['gemini_api_key'], (items) => {
      resolve(items.gemini_api_key || null);
    });
  });
}*/
