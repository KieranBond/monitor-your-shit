import {openBuildTab} from "./Tabs/builds";
import {openPRTab} from "./Tabs/prs";
import {openSettingsTab} from "./Tabs/settings";
import {openFavouritesTab} from "./Tabs/favourites";

export function addButtonListeners() {
    document.getElementById("Builds-Tab")!.addEventListener("click", openBuildTab);
    document.getElementById("Pull-Requests-Tab")!.addEventListener("click", openPRTab);
    document.getElementById("Favourites-Tab")!.addEventListener("click", openFavouritesTab);
    document.getElementById("Settings-Tab")!.addEventListener("click", openSettingsTab);
}
