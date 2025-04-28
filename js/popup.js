document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const enhanceBtn = document.getElementById('enhance-btn');

    chrome.storage.local.get(['selectedText'], function(result) {
        if (result.selectedText) {
            inputText.value = result.selectedText;
            chrome.storage.local.remove('selectedText');
        } else {
            getCurrentTabText();
        }
    });

    enhanceBtn.addEventListener('click', function() {
        const text = inputText.value;
        if (!text) return;
        outputText.value = enhanceText(text);
    });
});

async function getCurrentTabText() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        if (!tab) {
            console.log('No active tab found');
            return;
        }

        // page validation
        if (!tab.url || tab.url.startsWith('chrome://')) {
            console.log('Cannot inject content script on this page');
            return;
        }

        try {
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['js/content.js']
            });
        } catch (e) {
            console.log('Content script already injected or cannot be injected:', e);
        }

        try {
            const response = await chrome.tabs.sendMessage(tab.id, { action: 'extractText' });
            if (response && response.text) {
                document.getElementById('input-text').value = response.text;
            }
        } catch (error) {
            console.log('Error communicating with content script:', error);
            document.getElementById('input-text').value = '';
        }
    } catch (error) {
        console.error('Error in getCurrentTabText:', error);
    }
}

function enhanceText(text) {
    return text
        .split('. ')
        .map(sentence => {
            sentence = sentence.trim();
            if (sentence.length > 0) {
                return sentence.charAt(0).toUpperCase() + sentence.slice(1);
            }
            return sentence;
        })
        .join('. ');
}