import { Octokit } from "octokit";

export class GithubService {

    octokit: Octokit

    constructor(baseUrl: string, token: string) {
        this.octokit = new Octokit({
            auth: token,
            //baseUrl: 'https://github.com/api/v3'
        });
    }

    async getPullRequests(repoPrefix: string, branchPrefix: string) {
        //let prs = await this.octokit.rest.repos.
    }
    
    getPullRequestsFromRepo(repo: string) {

    }

}