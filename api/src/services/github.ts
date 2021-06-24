import { Octokit } from "octokit";

export class GithubService {

    octokit: Octokit
    owner: string // e.g oneiress or TedShaughnessy

    constructor(token: string, owner: string) {
        this.octokit = new Octokit({
            auth: token,
        });

        this.owner = owner;
    }

    async repoPrs(repo: string) {
        let response = await this.octokit.rest.pulls.list({
            owner: this.owner,
            repo,
          });
    
          return response.data;
    }
    
    async searchPrs(branchPrefixFilter: string, repoPrefixFilter: string) {
        let head = branchPrefixFilter ? ` head:${branchPrefixFilter}` : '';
        let org = true ? ` org:${this.owner}` : '';
    
        let response = await this.octokit.rest.search.issuesAndPullRequests({
            q: `is:open is:pr${head}${org}`
          })
    
          let prs: any[] = [];
    
          response.data.items.forEach(issue => {
            if (issue.pull_request == null) return;
            if (repoPrefixFilter && !issue.pull_request.html_url.startsWith(`https://github.com/${this.owner}/${repoPrefixFilter}`)) return;
    
            prs.push(issue);
            issue
          });
    
          return prs[0];
    }
    
    async getPr(repo: string, pullRequest: number) {
        let { data } = await this.octokit.rest.pulls.get({
            owner: this.owner,
            repo,
            pull_number: pullRequest
        })
    
        return data
    }
}