import { GithubService } from './services/github'

let api = new GithubService('', 'oneiress');

api.repoPrs('caf-marketmaking-widgets').then(x => {
    console.log(x.length)
})
