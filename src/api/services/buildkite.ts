import {baseUrl, CommonEndpoints} from "./utils/endpoints";
import { Pollable } from './interfaces';

export class BuildKiteService implements Pollable {
    private readonly token: string;
    private userId: string = '';

    constructor(token: string) {
        this.token = token;
    }

    public poll() {
        if(!this.token || this.userId === '') return;

        this.getBuildsForUser(1, this.userId).then( builds => {
            const build = builds[0];
            const state = build.blocked ? 'blocked' : build.state;

            let icon: string = '';
            const imgFolder: string = '../../../images/';

            switch(state) {
                case 'failed':
                case 'canceled':
                default:
                    icon = `${imgFolder}red-icon-128.png`;
                    break;
                case 'blocked':
                    icon = `${imgFolder}orange-icon-128.png`;
                    break;
                case 'passed':
                    icon = `${imgFolder}green-icon-128.png`;
                    break;
            }

            if(icon !== '')
                chrome.browserAction.setIcon({ path: icon});
        });
    }

    // Returns UserId
    public async authenticate(): Promise<string> {
        const url = `${baseUrl}${CommonEndpoints.Authenticate}`;
        return await fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer '+ this.token,
            }),
        })
            .then(response => response.json())
            .then( response => {
                console.log(`Authentication success`);
                this.userId = response.id;
                return this.userId;
            })
            .catch(response => {
                console.log(`Authentication failed: ${response.error}`)
                return '';
            });
    }

    public async getAllBuilds(): Promise<any[]> {
        const url = `${baseUrl}${CommonEndpoints.AllBuilds}`;
        return await fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer '+ this.token,
            }),
        })
        .then(response => response.json())
        .then(response => {
            console.log(`All builds: `, response);
            return response;
        })
        .catch(response => console.log(`Get all builds failed: ${response.error}`));
    }

    public async getBuildsForUser(maxCount: number = 15, userId?: string): Promise<any[]> {
        userId = userId ?? this.userId;
        let url = `${baseUrl}${CommonEndpoints.AllBuilds}?creator=${userId}&per_page=${maxCount}`;
        return await fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer '+ this.token,
            }),
        })
        .then(response => response.json())
        .then(response => {
            console.log(`All builds for user: `, response);
            return response;
        })
        .catch(failure => console.log(`Failed to get all builds for user: `, failure.error));
    }
}
