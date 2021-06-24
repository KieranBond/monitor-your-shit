"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubService = void 0;
const octokit_1 = require("octokit");
class GithubService {
    constructor(token, owner) {
        this.octokit = new octokit_1.Octokit({
            auth: token,
        });
        this.owner = owner;
    }
    repoPrs(repo) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.octokit.rest.pulls.list({
                owner: this.owner,
                repo,
            });
            return response.data;
        });
    }
    searchPrs(branchPrefixFilter, repoPrefixFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            let head = branchPrefixFilter ? ` head:${branchPrefixFilter}` : '';
            let response = yield this.octokit.rest.search.issuesAndPullRequests({
                q: `is:open is:pr org:${this.owner}${head}`
            });
            let prs = [];
            response.data.items.forEach(issue => {
                if (issue.pull_request == null)
                    return;
                if (repoPrefixFilter && !issue.pull_request.html_url.startsWith(`https://github.com/${this.owner}/${repoPrefixFilter}`))
                    return;
                prs.push(issue);
            });
            return prs[0];
        });
    }
    getPr(repo, pullRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = yield this.octokit.rest.pulls.get({
                owner: this.owner,
                repo,
                pull_number: pullRequest
            });
            return data;
        });
    }
    prStatusDetails(repo, prNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data } = yield this.octokit.graphql(`{
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
`, {
                owner: "octokit",
                repo: "graphql.js",
            });
            return data;
        });
    }
}
exports.GithubService = GithubService;
