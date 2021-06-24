import { Tab } from "./Tab";
import { pullRequestsTabGenerate } from "./Tabs/Pull-Requests/PullRequestsTab";

const loadingHtml = "<h3>Loading...</h3>";

const onClick = (event: Event, tabName: string) => {
    const div: HTMLElement = document.getElementById(tabName) as HTMLElement;
    if(!div) return;

    displayWhenLoaded(event, tabName);
};

const displayWhenLoaded = (event: Event, tabContentId: string ) => {
    const tabContent = document.getElementById(tabContentId);
    if(!tabContent) return;

    if (!tabContent.innerHTML) {
        tabContent.innerHTML = loadingHtml;
        tabContent.style.display = 'block';
    }
    loadPage(tabContentId as Tab, tabContent as HTMLElement);
}

const loadPage = (tab: Tab, location: HTMLElement) => {
    switch(tab) {
        case Tab.PullRequests:
            pullRequestsTabGenerate();
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

const openBuildTab = (event: Event) => {
    onClick(event, 'Builds');
}

const openPRTab = (event: Event) => {
    onClick(event, 'Pull-Requests');
}

const openFavouritesTab = (event: Event) => {
    onClick(event, 'Favourites');
}

const openTrackingTab = (event: Event) => {
    onClick(event, 'Tracking');
}

const openSettingsTab = (event: Event) => {
    onClick(event, 'Settings');
}

document.getElementById("Build-Tab")?.addEventListener("click", openBuildTab);
document.getElementById("Pull-Requests-Tab")?.addEventListener("click", openPRTab);
document.getElementById("Favourites-Tab")?.addEventListener("click", openFavouritesTab);
document.getElementById("Tracking-Tab")?.addEventListener("click", openTrackingTab);
document.getElementById("Settings-Tab")?.addEventListener("click", openSettingsTab);
