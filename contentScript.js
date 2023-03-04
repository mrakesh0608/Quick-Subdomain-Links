chrome.runtime.onMessage.addListener(async (request, sender, response) => {

    const { type, values } = request;

    if (type === "NEW") {
        console.log(`Its a ${values.domain} page`);
        return true;
    }
    else if (type === 'WINDOW_OPEN') {

        const { subdomain, domain } = values;

        const href = location.href;
        const end = href.slice(href.indexOf(domain) - 1);
        const url = location.protocol + '//' + subdomain + end;

        console.log(`opening \n${url}`);
        window.open(url);
    }
});