
const loadingHtml = "<h3>Loading...</h3>";

export const displayData = (event: Event, tabContentId: string, fetchAndMakeHtml: () => Promise<string>, eventListeners?: () => void) => {
    const tabContent = document.getElementById(tabContentId)!;

    closeTabs();
    setActiveTab(tabContentId);
    setLoading(tabContent);
    fetchAndMakeHtml()
        .then(html => tabContent.innerHTML = html)
        .then(eventListeners)
}

function setLoading(tabContent: HTMLElement) {
    tabContent.innerHTML = loadingHtml;
    tabContent.style.display = 'block';
}

function closeTabs() {
    let tabContent = document.getElementsByClassName("tabcontent")!;
    for (let i = 0; i < tabContent.length; i++) {
        (tabContent[i] as HTMLElement).style.display = "none";
    }
}

function setActiveTab(tabContentId: string) {
    let tabLinks = document.getElementsByClassName("tablinks");

    for (let i = 0; i < tabLinks.length; i++) {
        (tabLinks[i] as HTMLElement).classList.remove('active');
    }

    let tab = document.getElementById(tabContentId + '-Tab')!;
    tab.classList.add('active');
}
