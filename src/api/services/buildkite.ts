import {baseUrl, CommonEndpoints} from "./utils/endpoints";

export class BuildKiteService {
    private readonly token: string;
    private userId: string = '';

    constructor(token: string) {
        this.token = token;
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
