export default async function getConfigsFromStorage() {
    return new Promise((resolve) => {

        chrome.storage.sync.get(["domainOptions", "subdomainOptions"]).then((result) => {
            console.log(result);

            if (result.domainOptions && result.subdomainOptions) {
                resolve({
                    optionsPage: false,
                    domain: result.domainOptions.domain,
                    domainDisplayName: result.domainOptions.domainDisplayName,
                    subdomains: [...result.subdomainOptions],
                })

            }
            else
                resolve({ optionsPage: true });
        });
    });
}