chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "openWithSelection",
        title: "Open in Extension",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === "openWithSelection") {
        chrome.storage.local.set({ 'selectedText': info.selectionText }, () => {
            chrome.windows.create({
                url: 'popup.html',
                type: 'popup',
                width: 400,
                height: 600
            });
        });
    }
});