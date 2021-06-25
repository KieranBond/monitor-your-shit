import {displayData} from "../tab";
import {GithubService} from "../../api/services/github";
import {BuildKiteService} from "../../api/services/buildkite";

enum StorageKey {
    GithubToken = "githubToken",
    GithubOwner = "githubOwner",
    GithubRepoPrefix = "githubRepoPrefix",
    GithubBranchPrefix = "githubBranchPrefix",
    BuildkiteToken = "buildkiteToken",
    BuildkiteUser = "buildkiteUser"
}

type ValueOfStorageKey = `${StorageKey}`

type StoredData = {
    [P in ValueOfStorageKey]?: string;
}

function authenticateServices() {
    services.buildkiteService?.authenticate();
}

function settingUpdateFunc() {
    services.githubService = new GithubService(storedData.githubToken!, storedData.githubOwner!);
    services.buildkiteService = new BuildKiteService(storedData.buildkiteToken!);
}

function setLocalData(key: StorageKey, value: string) {
    chrome.storage.local.set({[`${key}`]:value}, () => {
        storedData[key] = value;
        settingUpdateFunc()
    })
}

async function getDataMakeHtml() {
    return `
<h2>Github</h2>
<label>Token:</label><input type="text" id="github-token" value=${storedData.githubToken}><br>
<label>Owner:</label><input type="text" id="github-owner" value=${storedData.githubOwner}><br>
<label>Repo prefix:</label><input type="text" id="github-repo-prefix" value=${storedData.githubRepoPrefix}><br>
<label>Branch prefix:</label><input type="text" id="github-branch-prefix" value=${storedData.githubBranchPrefix}><br>
<h2>Buildkite</h2>
<label>Token:</label><input type="text" id="buildkite-token" value=${storedData.buildkiteToken}><br>
<label>User:</label><input type="text" id="buildkite-user" value=${storedData.buildkiteUser}><br><br>
`;
}

function listener(key: StorageKey) {
    return (event: Event) => setLocalData(key, (event as any).target.value)
}

function listeners() {

    const githubTokenInput = document.getElementById('github-token')!;
    const githubOwner = document.getElementById('github-owner')!;
    const githubRepoPrefix = document.getElementById('github-repo-prefix')!;
    const githubBranchPrefix = document.getElementById('github-branch-prefix')!;

    const buildkiteTokenInput = document.getElementById('buildkite-token')!;
    const buildkiteUser = document.getElementById('buildkite-user')!;

    githubTokenInput.addEventListener("blur", listener(StorageKey.GithubToken))
    githubOwner.addEventListener("blur", listener(StorageKey.GithubOwner))
    githubRepoPrefix.addEventListener("blur", listener(StorageKey.GithubRepoPrefix))
    githubBranchPrefix.addEventListener("blur", listener(StorageKey.GithubBranchPrefix))

    buildkiteTokenInput.addEventListener("blur", listener(StorageKey.BuildkiteToken))
    buildkiteUser.addEventListener("blur", listener(StorageKey.BuildkiteUser))
}

export const storedData: StoredData = {
    [StorageKey.GithubToken]: '',
    [StorageKey.GithubOwner]: '',
    [StorageKey.GithubRepoPrefix]: '',
    [StorageKey.GithubBranchPrefix]: '',
    [StorageKey.BuildkiteToken]: '',
    [StorageKey.BuildkiteUser]: '',
}

export const services: {
    githubService: GithubService | undefined,
    buildkiteService: BuildKiteService | undefined
} = {
    githubService: undefined,
    buildkiteService: undefined
}

export function getAllLocalData() {
    const keys = Object.keys(storedData);

    chrome.storage.local.get(keys, (items) => {
        Object.keys(items).forEach((key: any) => {
            storedData[key as ValueOfStorageKey] = items[key];
        })
        settingUpdateFunc();
        authenticateServices();
    })
}

export const openSettingsTab = (event: Event) => {
    displayData(event, 'Settings', async () => await getDataMakeHtml(), listeners);
}
