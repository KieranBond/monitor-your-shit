"use strict";
function displayWhenLoaded(event, tabContentId, fetchUrl, parsingFunc) {
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
function openTab(evt, tabName) {
    var elements = document.getElementsByClassName("tabcontent");
    var tabcontent = Array.prototype.map.call(elements, function (ele) { return tabcontent.push(ele); });
    for (var i = 0; i < tabcontent.length; i++) {
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
var onClick = function (event, tabName) {
    var div = document.getElementById(tabName);
    div.style.backgroundColor = 'red';
    var text = document.createTextNode('PRs');
    div.append(text);
    div.style.display = 'block';
    // displayWhenLoaded(event, 'Pull-Requests', null, null);
};
var openPRTab = function (event) {
    console.log('event hit');
    onClick(event, 'Pull-Requests');
};
document.getElementById("Build-Tab").addEventListener("click", openPRTab);
document.getElementById("Pull-Requests-Tab").addEventListener("click", openPRTab);
document.getElementById("Favourites-Tab").addEventListener("click", openPRTab);
document.getElementById("Tracking-Tab").addEventListener("click", openPRTab);
document.getElementById("Settings-Tab").addEventListener("click", openPRTab);
