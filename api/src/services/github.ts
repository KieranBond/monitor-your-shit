import { Octokit } from "octokit";

export class GithubService {

    octokit: Octokit
    owner: string

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

        let response = await this.octokit.rest.search.issuesAndPullRequests({
            q: `is:open is:pr org:${this.owner}${head}`
          })

          let prs: any[] = [];

          response.data.items.forEach(issue => {
            if (issue.pull_request == null) return;
            if (repoPrefixFilter && !issue.pull_request.html_url.startsWith(`https://github.com/${this.owner}/${repoPrefixFilter}`)) return;

            prs.push(issue);
          });

          return prs[0];
    }

    async getPr(repo: string, pullRequest: number) { // graphql request is probably better
        let { data } = await this.octokit.rest.pulls.get({
            owner: this.owner,
            repo,
            pull_number: pullRequest
        })

        return data
    }

    async prStatusDetails(repo: string, prNumber: number) { // https://gist.github.com/jwo/e49d06f7f76428fa17fb901e7f418cca
        let { data } = await this.octokit.graphql(
`{
  repository(owner: "${this.owner}", name:"${repo}"){
    url
    pullRequest(number: ${prNumber}){
        number
        url
        author {
          avatarUrl
          login
          resourcePath
          url
        }
        commits(last: 1){
          nodes{
            commit{
              commitUrl
              oid
              status {
                state
                
                contexts {
                  state
                  targetUrl
                  description
                  context
                }
              }
            }
          }
        }
    }
  }
}
`,
            {
                owner: "octokit",
                repo: "graphql.js",
            }
        );

        return data;
    }
}
