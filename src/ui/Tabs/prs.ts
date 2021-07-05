import {displayData} from "../tab";
import {services, storedData} from "./settings";

async function getDataMakeHtml() {
    let data = await services.githubService!.searchPrs(storedData.githubBranchPrefix ?? '', storedData.githubRepoPrefix ?? '');

    // sort by repo name
    data.sort(function(a, b) {
        let textA = a.repository_url.toUpperCase();
        let textB = b.repository_url.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    })

    let repoName = ''

    let html = await Promise.all(data.map(async (pr) => {

        let repoUrlSegs = pr.repository_url.split('/');
        let repo = repoUrlSegs[repoUrlSegs.length-1];

        let newHtml = '';

        if (repoName != repo) {
            repoName = repo;
            newHtml += `<a href="${pr.repository_url}" class="repo">${repoName}</a>`
        }

        let status = await services.githubService!.getPr(repo, pr.number)
        let state = status.mergeable_state

        if (status.mergeable_state === 'blocked') {
            let combined = await services.githubService!.getCombinedStatus(repo, status.base.sha);

            if (combined.state === 'success') {
                state = 'review';
            }
            if (combined.state === 'pending') {
                state = 'pending';
            }
        }

        newHtml += `<a href="${pr.html_url}" target="_blank" class="pr ${state}">
            <p class="pr-title">${pr.title}</p>
            <div class="removed-lines"><pre> --${status.deletions}</pre></div>
            <div class="added-lines"><pre>++${status.additions} </pre></div>
        </a>`;

        return newHtml;
    }));

    return html.join('');
}

export const openPRTab = (event: Event) => {
    displayData(event, 'Pull-Requests', async () => await getDataMakeHtml());
}


