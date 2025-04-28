chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'extractText') {
        try {
            const selectedElement = document.activeElement;
            let extractedText = '';
            
            const selection = window.getSelection();
            if (selection && selection.toString().trim()) {
                extractedText = selection.toString().trim();
            }
            else if (selectedElement && selectedElement.tagName === 'TEXTAREA') {
                extractedText = selectedElement.value;
            }
            else if (selectedElement && selectedElement.hasAttribute('contenteditable')) {
                extractedText = selectedElement.innerText;
            } 
            else if (selectedElement && selectedElement.tagName === 'IFRAME') {
                try {
                    const iframeDoc = selectedElement.contentDocument || selectedElement.contentWindow.document;
                    const editableElement = iframeDoc.querySelector('[contenteditable="true"]') || iframeDoc.body;
                    if (editableElement && editableElement.hasAttribute('contenteditable')) {
                        extractedText = editableElement.innerText;
                    }
                } catch (e) {
                    console.error('Cannot access iframe content:', e);
                }
            }

            sendResponse({ text: extractedText });
        } catch (error) {
            console.error('Error in content script:', error);
            sendResponse({ error: error.message });
            return true;
        }
    } else if (request.action === 'replaceText') {
        const selectedElement = document.activeElement;
        
        if (selectedElement.tagName === 'TEXTAREA') {
            selectedElement.value = request.text;
            sendResponse({ success: true });
        }
        else if (selectedElement.hasAttribute('contenteditable')) {
            selectedElement.innerHTML = request.text;
            sendResponse({ success: true });
        } else if (selectedElement.tagName === 'IFRAME') {
            try {
                const iframeDoc = selectedElement.contentDocument || selectedElement.contentWindow.document;
                if (iframeDoc.body.hasAttribute('contenteditable')) {
                    iframeDoc.body.innerHTML = request.text;
                    sendResponse({ success: true });
                }
            } catch (e) {
                console.error('Cannot access iframe content:', e);
                sendResponse({ success: false, error: e.message });
            }
        } else {
            sendResponse({ success: false, error: 'No editable element selected' });
        }
    } else if (request.action === 'transformSelectedText') {
        console.log('Recreated text:', request.text);
    }
    return true;
});