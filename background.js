chrome.tabs.onUpdated.addListener((tabId, tab) => {

    if (tab.url && tab.url.includes("google")) {

        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            url:tab.url
        });
    }
});