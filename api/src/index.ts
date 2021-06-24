import { GithubService } from './services/github'

let api = new GithubService('', 'oneiress');

api.repoPrs('caf-marketmaking-widgets').then(x => {

    let pr = x[0]

    api.prStatusDetails(pr.base.repo.name, pr.number).then(y => {
        console.log(y);
    })
})
