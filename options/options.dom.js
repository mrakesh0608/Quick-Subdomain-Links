const trashSVG = '<svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 96 960 960" width="22"><path d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/></svg>'

export const domainOptions = {};
export const subdomainOptions = [];

export function set_render_DomainOptions(options) {

    Object.keys(options).forEach(key => {
        domainOptions[key] = options[key];
        document.getElementById(key).value = options[key];
    })
}
export function set_render_SubdomainOptions(newSubdomainOptions) {

    subdomainOptions.splice(0);
    document.getElementById('subdomains-container').innerHTML = '';

    newSubdomainOptions.forEach((item, index) => {
        item.id = index;
        subdomainOptions.push(item);
        addSubdomainMarkup(item);
    })
}

function getSubdomainIpVal({ id, name }) {
    const index = subdomainOptions.findIndex(i => i.id === id);
    const val = subdomainOptions[index][name];
    return val ? val : '';
}

function myInputLabel({ id, name, placeholder, labelText }) {

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('form__input');
    input.placeholder = placeholder;
    input.required = true;
    input.value = getSubdomainIpVal({ id, name });
    input.onchange = ((e) => {
        const index = subdomainOptions.findIndex(i => i.id === id);
        subdomainOptions[index][name] = e.target.value;
    })

    const label = document.createElement('label');
    label.classList.add('form__label');
    label.innerHTML = labelText + ' *';
    label.addEventListener('click', input.focus);

    const div = document.createElement('div');
    div.classList.add('input-label');
    div.appendChild(input);
    div.appendChild(label);

    return div;
}


function getSubdomainFields(id) {

    const subdomainFields = document.createElement('div');
    subdomainFields.classList.add('subdomain-fields');

    subdomainFields.appendChild(myInputLabel({
        id,
        name: 'title',
        placeholder: 'Must be subdomain only e.g. https://mail.google.com ( "mail" must be specified )',
        labelText: 'Subdomain Name'
    }))
    subdomainFields.appendChild(myInputLabel({
        id,
        name: 'displayName',
        placeholder: 'Here, you can also write your own HTML for displaying the button',
        labelText: 'Subdomain Display Name'
    }))
    subdomainFields.appendChild(myInputLabel({
        id,
        name: 'color',
        placeholder: 'Any valid CSS color property e.g. "#3fb041"',
        labelText: 'Color'
    }))

    return subdomainFields;
}
function getSubDomainHead(id) {
    const headTitle = document.createElement('h3');
    headTitle.innerText = `Subdomain ${id + 1}`

    const rmvSubdomainBtn = document.createElement('button');
    rmvSubdomainBtn.type = 'button';
    rmvSubdomainBtn.classList.add('btn-close');
    rmvSubdomainBtn.classList.add('btn-svg');
    rmvSubdomainBtn.innerHTML = trashSVG;
    rmvSubdomainBtn.onclick = (e) => {
        const k = subdomainOptions.filter(i => i.id !== id)
        set_render_SubdomainOptions([...k]);
    }

    const subdomainHead = document.createElement('div');
    subdomainHead.classList.add('subdomain-head');
    subdomainHead.appendChild(headTitle);
    subdomainHead.appendChild(rmvSubdomainBtn);

    return subdomainHead;
}

export function addSubdomainMarkup({ id }) {
    const div = document.createElement('div');
    div.id = `subdomain-${id}`;
    div.classList.add('subdomains-container')
    div.appendChild(getSubDomainHead(id));
    div.appendChild(document.createElement('hr'));
    div.appendChild(getSubdomainFields(id));

    document.getElementById('subdomains-container').appendChild(div);
}

export function getDomainOptions() {

    ['protocol', 'domain', 'domainDisplayName', 'fontSize'].forEach((item) => {
        domainOptions[item] = document.getElementById(item).value;
    })
}


export function createDummySubdomain() {
    set_render_SubdomainOptions([...subdomainOptions, { id: subdomainOptions.length }]);
}