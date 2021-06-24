import {displayData} from "../tab";
import {GithubService} from "../../api/services/github";
import config from "../../../config.json"

const githubService = new GithubService(config.token.github, 'oneiress');

async function getDataMakeHtml() {
    let data = await githubService.searchPrs('UKMM', '');

    let html = await Promise.all(data.map(async (pr) => {
        let repoUrlSegs = pr.repository_url.split('/');
        let repo = repoUrlSegs[repoUrlSegs.length-1];
        let status = await githubService.getPr(repo, pr.number)

        return`<a href="${pr.html_url}" target="_blank" class="pr ${status.mergeable_state}">
            <p class="pr-title">${pr.title}</p>
            <div class="removed-lines"><pre> --${status.deletions}</pre></div>
            <div class="added-lines"><pre>++${status.additions} </pre></div>
        </a>`;
    }));

    return html.join('');
}

export const openPRTab = (event: Event) => {
    displayData(event, 'Pull-Requests', async () => await getDataMakeHtml());
}


