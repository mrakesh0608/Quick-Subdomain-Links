// export const protocol = 'https://';
export const domain = 'service-now.com'; //it must include with top level domain e.g. google.com (.com must be specified)

export const domainDisplayName = 'ServiceNow';

//put as many br tags to make upcoming text in new line
export const subdomains = [
    {
        title: 'nouryondev',
        color: '#3fb041',
        displayName: `<span class='small-font'>${domainDisplayName}</span><br />Dev`
    },
    {
        title: 'nouryontest',
        color: '#4a4ad4',
        displayName: `<span class='small-font'>${domainDisplayName}</span><br />Test`
    },
    {
        title: 'nouryon',
        color: '#d12424',
        displayName: `<span class='small-font'>${domainDisplayName}</span><br />Prod`
    }
];