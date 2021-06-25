import {baseUrl, CommonEndpoints} from "./utils/endpoints";

export class BuildKiteService {
    private readonly token: string;
    private userId: string = '';

    constructor(token: string) {
        this.token = token;
    }

    public async authenticate(): Promise<boolean> {
        const url = `${baseUrl}${CommonEndpoints.Authenticate}`;
        await fetch(url, {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer '+ this.token,
            }),
        })
            .then(response => response.json())
            .then( response => {
                console.log(`Authentication success`);
                this.userId = response.id;
                return true;
            })
            .catch(response => {
                console.log(`Authentication failed: ${response.error}`);
                return response.ok;
            });

        return false;
    }

    public getAllBuilds(): any {
        const url = `${baseUrl}${CommonEndpoints.AllBuilds}`;
        fetch(url, {
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

        return null;
    }

    public async getAllBuildsForUser(userId?: string): Promise<any> {
        userId = userId ?? this.userId;
        const url = `${baseUrl}${CommonEndpoints.AllBuilds}?creator=${userId}`;
        await fetch(url, {
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

        return null;
    }
}
