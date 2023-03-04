import { requestPermission } from '../utils.js';
import {
    createDummySubdomain, getDomainOptions,
    subdomainOptions, domainOptions,
    set_render_DomainOptions, set_render_SubdomainOptions

} from './options.dom.js';

async function saveOptions() {
    getDomainOptions();

    chrome.storage.sync.set({ domainOptions: domainOptions, subdomainOptions: subdomainOptions }).then(() => {
        // console.log("Value is set to " + options);
    });
}
function initDOM() {

    document.getElementById('add-subdomain').addEventListener('click', createDummySubdomain);
    document.querySelector('form').addEventListener('submit', async (e) => {
        e.preventDefault();

        await saveOptions();

        // url: '*://*.google.com/*',
        requestPermission({
            url: `*://*.${domainOptions.domain}/*`,
            cb: (granted) => {
                if (granted) {
                    console.log('success');
                    alert('Sucessfully domain configuration is done');
                    window.opener();
        
                } else alert("Permission must be granted, otherwise extension won't work.\n\nTry again by clicking the save button.")
            }
        })
    })
}

document.addEventListener("DOMContentLoaded", async () => {

    initDOM();

    chrome.storage.sync.get(["domainOptions", "subdomainOptions"]).then((result) => {
        console.log(result);

        if (result.domainOptions && result.subdomainOptions) {

            set_render_DomainOptions({ ...result.domainOptions })
            set_render_SubdomainOptions([...result.subdomainOptions]);
        }
        else {
            //atleast one subdomain should be there
            createDummySubdomain();
        }
    });
});