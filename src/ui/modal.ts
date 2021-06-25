import {openBuildTab} from "./Tabs/builds";
import {openPRTab} from "./Tabs/prs";
import {openSettingsTab} from "./Tabs/settings";

export function addButtonListeners() {
    document.getElementById("Builds-Tab")!.addEventListener("click", openBuildTab);
    document.getElementById("Pull-Requests-Tab")!.addEventListener("click", openPRTab);
    document.getElementById("Settings-Tab")!.addEventListener("click", openSettingsTab);
}
