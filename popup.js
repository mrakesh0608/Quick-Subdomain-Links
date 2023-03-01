import { getActiveTabURL } from "./utils.js";

const domain = 'google';
const domainDisplayName = 'Google';
const subdomains = [
    {
        title: 'calender',
        color: '#3fb041',
        displayName: `<span class='small-font'>${domainDisplayName}</span><br />Calender`
        //put as many br tags to make upcoming text in new line
    },
    {
        title: 'mail',
        color: '#4a4ad4',
        displayName: `<span class='small-font'>${domainDisplayName}</span><br />Mail`
    },
    {
        title: 'drive',
        color: '#d12424',
        displayName: `<span class='small-font'>${domainDisplayName}</span><br />Drive`
    }
];

// const domain = 'servicenow';
// const subdomain = ['nouryon', 'nouryondev', 'nouryontest']

const onClick = async (subdomain) => {

    const activeTab = await getActiveTabURL();

    chrome.tabs.sendMessage(activeTab.id, {
        type: "WINDOW_OPEN",
        value: subdomain.title
    });
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

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();
    if (activeTab.url.includes("google")) viewLinks();
    else {
        document.getElementsByClassName("container")[0].innerHTML = `<div class="centerMsg">This is not a <span class='x-large-font c-blue cptlz'>${domain}</span> website</div>`;
    }
});