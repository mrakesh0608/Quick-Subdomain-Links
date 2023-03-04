export async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });
    return tabs[0];
}

export function matchDomain({ url: urlString, domain }) {

    if (!urlString || !domain) return false;

    const url = new URL(urlString);

    //apply regex here to make more robust
    return url.hostname.includes(domain);
}

export function requestPermission({ url, cb }) {

    const permissionOptions = {
        permissions: ['tabs'],
        origins: [url]
    }

    chrome.permissions.contains(permissionOptions, (result) => {

        if (result) {
            console.log('Already have permission');
            cb(result);
        }
        else {
            // The extension doesn't have the permissions.
            chrome.permissions.request(permissionOptions, (granted) => {

                if (granted) {
                    console.log('permission granted');
                    cb(granted);
                } else {
                    console.log('permission rejected');
                    cb(granted);
                }
            });
        }
    });
}