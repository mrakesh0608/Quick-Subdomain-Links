import { getActiveTabURL, matchDomain } from "../utils.js";
import userConfig from '../user-config.js'

document.addEventListener("DOMContentLoaded", async () => {

    const { optionsPage, domain, subdomains, domainDisplayName } = await userConfig();
    console.log(optionsPage, domain);
    if (optionsPage) console.log('Domain form not filled');



    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        const { type, values } = request;
        if (type === "NEW") initDOM();
    });

    const onClick = async (subdomain) => {

        const activeTab = await getActiveTabURL();

        chrome.tabs.sendMessage(activeTab.id, {
            type: "WINDOW_OPEN",
            values: {
                domain,
                subdomain: subdomain.title
            }
        })
        window.close(); //explicitly required for vivaldi browser to close the extension after opening the tab.
    };

    const renderLink = async (quickLinks, subdomain) => {

        if (subdomain.title) {
            const li = document.createElement('span');

            li.id = `dev-link-sugg-li-${subdomain.title}`
            li.className = 'dev-link-sugg';
            li.innerHTML = subdomain.displayName;
            li.style.color = subdomain.color;

            li.setAttribute("subdomain", subdomain.title);
            li.addEventListener('click', () => { onClick(subdomain) });

            quickLinks.appendChild(li);
        }
    };

    const viewLinks = async () => {

        const quickLinksElement = document.getElementById("quickLinks");
        quickLinksElement.innerHTML = "";

        if (!subdomains.length) quickLinksElement.innerHTML = '<i class="row">No Links to show</i>';
        else {
            subdomains.forEach(subdomain => {
                renderLink(quickLinksElement, subdomain);
            })
        }
    };

    async function initDOM() {
        const activeTab = await getActiveTabURL();

        if (optionsPage) {
            document.querySelector('#go-to-options').click();
            document.getElementsByClassName("container")[0].innerHTML = `<div class="centerMsg">Please set the Domain...</div>`;
        }
        else if (!activeTab.url) {
            document.getElementsByClassName("container")[0].innerHTML = `<div class="centerMsg">Loading URL...</div>`;
        }
        else if (matchDomain({ url: activeTab.url, domain })) {
            viewLinks();
            document.getElementById('go-to-options').style.display = 'none';
            document.getElementById('domainIcon').src = `https://www.google.com/s2/favicons?sz=48&domain_url=${domain}`//`https://www.google.com/s2/favicons?domain=${domain}`
        }
        else {
            document.getElementsByClassName("container")[0].innerHTML = `<div class="centerMsg">Not a <span class='x-large-font c-blue cptlz'>${domainDisplayName}</span> website</div>`;
        }

    }

    initDOM();

    document.querySelector('#go-to-options').addEventListener('click', () => {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL('options.html'));
        }
    });
});