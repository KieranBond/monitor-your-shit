import {displayData} from "../tab";

enum StorageKey {
    GithubToken = "githubToken",
    BuildkiteToken = "buildkiteToken"
}

type ValueOfStorageKey = `${StorageKey}`

type StoredData = {
    [P in ValueOfStorageKey]?: string;
}

const storedData: StoredData = {
    [StorageKey.GithubToken]: '',
}

function getLocalData(key: StorageKey) {
    chrome.storage.local.get(`${key}`, (items) => {
        storedData[key] = items[key];
    })
}

function setLocalData(key: StorageKey, value: string) {
    chrome.storage.local.set({[`${key}`]:value}, () => {
        storedData[key] = value;
        console.log("storedData", storedData)
    })
}

async function getDataMakeHtml() {
    return '<label>github token:</label>' +
        '<input type="text" id="github-token"><br>';
}

function listener(key: StorageKey) {
    return (event: Event) => setLocalData(key, (event as any).target.value)
}

export const openSettingsTab = (event: Event) => {
    displayData(event, 'Settings', async () => await getDataMakeHtml(), () => {
        const githubTokenInput = document.getElementById('github-token')!;
        githubTokenInput.addEventListener("blur", listener(StorageKey.GithubToken))
    });
}
