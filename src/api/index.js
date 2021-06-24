"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const github_1 = require("./services/github");
let api = new github_1.GithubService('', 'oneiress');
api.repoPrs('caf-marketmaking-widgets').then(x => {
    let pr = x[0];
    api.prStatusDetails(pr.base.repo.name, pr.number).then(y => {
        console.log(y);
    });
});
