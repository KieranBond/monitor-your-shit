function displayWhenLoaded(event: Event, tabContentId: string, fetchUrl: string, parsingFunc: Function) {
    var tabContent = document.getElementById(tabContentId);
    if (!tabContent.innerHTML) {
        // tabContent.innerHTML = loadingHtml;
        // var request = fetch(fetchUrl);
        // openTab(event, tabContentId);
        // request
        //     .then(response => response.json())
        //     .then(data => parsingFunc(data))
        //     .then(html => tabContent.innerHTML = html)
    }
    openTab(event, tabContentId);
}

function openTab(evt: Event, tabName: string) {
    const elements = document.getElementsByClassName("tabcontent");
    const tabcontent = Array.prototype.map.call(elements, ele => tabcontent.push(ele));

    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        // const style: string = tabcontent[i].getAttribute('style');
        // style.replace('display:', 'none')
        // tabcontent[i].setAttribute('style', { ...style, ''});
    }
    // var tablinks = document.getElementsByClassName("tablinks");
    // for (i = 0; i < tablinks.length; i++) {
    //     tablinks[i].tabName = tablinks[i].className = "tablinks"
    // }
    document.getElementById(tabName).style.display = "block";
    // evt.currentTarget.className += " active";
}

const onClick = (event: Event, tabName: string) => {
    const div: HTMLElement = document.getElementById(tabName);
    div.style.backgroundColor = 'red';
    const text: Text = document.createTextNode('PRs');
    div.append(text);
    div.style.display = 'block';
    // displayWhenLoaded(event, 'Pull-Requests', null, null);
};

const openPRTab = (event: Event) => {
    console.log('event hit');
    onClick(event, 'Pull-Requests');
}

document.getElementById("Build-Tab").addEventListener("click", openPRTab);
document.getElementById("Pull-Requests-Tab").addEventListener("click", openPRTab);
document.getElementById("Favourites-Tab").addEventListener("click", openPRTab);
document.getElementById("Tracking-Tab").addEventListener("click", openPRTab);
document.getElementById("Settings-Tab").addEventListener("click", openPRTab);