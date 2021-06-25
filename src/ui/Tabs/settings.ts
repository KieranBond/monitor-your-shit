import {displayData} from "../tab";
import {GithubService} from "../../api/services/github";

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

function settingUpdateFunc() {
    services.githubService = new GithubService(storedData.githubToken!, storedData.githubOwner!);
}

function setLocalData(key: StorageKey, value: string) {
    chrome.storage.local.set({[`${key}`]:value}, () => {
        storedData[key] = value;
        settingUpdateFunc()
    })
}

async function getDataMakeHtml() {
    return `
<h2>Github</h2><br>
<label>token:</label><input type="text" id="github-token" value=${storedData.githubToken}><br>
<label>owner:</label><input type="text" id="github-owner" value=${storedData.githubOwner}><br>
<label>repo prefix:</label><input type="text" id="github-repo-prefix" value=${storedData.githubRepoPrefix}><br>
<label>branch prefix:</label><input type="text" id="github-branch-prefix" value=${storedData.githubBranchPrefix}><br>
<h2>Buildkite</h2><br>
<label>token:</label><input type="text" id="buildkite-token" value=${storedData.buildkiteToken}><br>
<label>user:</label><input type="text" id="buildkite-user" value=${storedData.buildkiteUser}><br>
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
    githubService: GithubService | undefined
} = {
    githubService: undefined
}

export function getAllLocalData() {
    const keys = Object.keys(storedData);

    chrome.storage.local.get(keys, (items) => {
        Object.keys(items).forEach((key: any) => {
            storedData[key as ValueOfStorageKey] = items[key];
        })
        settingUpdateFunc();
    })
}

export const openSettingsTab = (event: Event) => {
    displayData(event, 'Settings', async () => await getDataMakeHtml(), listeners);
}
