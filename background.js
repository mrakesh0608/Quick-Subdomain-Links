import { getActiveTabURL, matchDomain } from "./utils.js";
import userConfig from './user-config.js';

(async () => {

    const { optionsPage, domain } = await userConfig();
    console.log(optionsPage, domain);

    if (optionsPage) console.log('Domain form not filled');

    async function setExtIcon(tabId) {

        const activeTab = await getActiveTabURL();
        console.log(activeTab);

        if (matchDomain({ url: activeTab.url, domain }) && tabId === activeTab.id) {

            chrome.action.setIcon({ path: "assets/ext-icon.png", tabId: tabId });
        }
        else chrome.action.setIcon({ path: "assets/ext-icon-gray.png", tabId: tabId });
    }

    chrome.tabs.onUpdated.addListener((tabId, tab) => {

        setExtIcon(tabId);
        // console.log(tabId);

        chrome.runtime.sendMessage({
            type: "NEW",
            values: {
                url: tab.url,
                domain
            }
        });
    });

    chrome.tabs.onActivated.addListener(({ tabId }) => {
        setExtIcon(tabId);
    });
})();
