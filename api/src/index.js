"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var github_1 = require("./services/github");
var api = new github_1.GithubService('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', 'oneiress');
api.repoPrs('caf-marketmaking-widgets').then(function (x) {
    console.log(x.length);
});
