const domain = 'google';

chrome.runtime.onMessage.addListener(async (obj, sender, response) => {
    const { type, value } = obj;

    if (type === "NEW") {
        console.log('google page');
        return true;
    }
    else if (type === 'WINDOW_OPEN') {

        const href = location.href;
        const end = href.slice(href.indexOf(domain) - 1);
        const url = location.protocol + '//' + value + end;

        console.log(`opening \n${url}`);
        window.open(url);
    }
});