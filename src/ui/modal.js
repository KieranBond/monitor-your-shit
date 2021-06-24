"use strict";
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
const Tab_1 = require("./Tab");
const PullRequestsTab_1 = require("./Tabs/Pull-Requests/PullRequestsTab");
const loadingHtml = "<h3>Loading...</h3>";
const onClick = (event, tabName) => {
    const div = document.getElementById(tabName);
    if (!div)
        return;
    displayWhenLoaded(event, tabName);
};
const displayWhenLoaded = (event, tabContentId) => {
    const tabContent = document.getElementById(tabContentId);
    if (!tabContent)
        return;
    if (!tabContent.innerHTML) {
        tabContent.innerHTML = loadingHtml;
        tabContent.style.display = 'block';
    }
    loadPage(tabContentId, tabContent);
};
const loadPage = (tab, location) => {
    switch (tab) {
        case Tab_1.Tab.PullRequests:
            PullRequestsTab_1.pullRequestsTabGenerate();
            break;
    }
};
// const openTab = (evt: Event, tabName: string) => {
//     if(!evt || !evt.currentTarget) return;
//
//     const tabcontent: HTMLCollectionOf<Element> = document.getElementsByClassName("tabcontent");
//
//     for (let i = 0; i < tabcontent.length; i++) {
//         tabcontent[i].style.display = "none";
//     }
//     const tablinks = document.getElementsByClassName("tablinks");
//     for (let i = 0; i < tablinks.length; i++) {
//         tablinks[i].tabName = tablinks[i].className = "tablinks"
//     }
//     document.getElementById(tabName)!.style.display = "block";
//     evt!.currentTarget!.className += " active";
// }
const openBuildTab = (event) => {
    onClick(event, 'Builds');
};
const openPRTab = (event) => {
    onClick(event, 'Pull-Requests');
};
const openFavouritesTab = (event) => {
    onClick(event, 'Favourites');
};
const openTrackingTab = (event) => {
    onClick(event, 'Tracking');
};
const openSettingsTab = (event) => {
    onClick(event, 'Settings');
};
(_a = document.getElementById("Build-Tab")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", openBuildTab);
(_b = document.getElementById("Pull-Requests-Tab")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", openPRTab);
(_c = document.getElementById("Favourites-Tab")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", openFavouritesTab);
(_d = document.getElementById("Tracking-Tab")) === null || _d === void 0 ? void 0 : _d.addEventListener("click", openTrackingTab);
(_e = document.getElementById("Settings-Tab")) === null || _e === void 0 ? void 0 : _e.addEventListener("click", openSettingsTab);
