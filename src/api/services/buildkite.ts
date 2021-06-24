export class BuildKiteService {
    private readonly baseUrl: string = 'https://api.buildkite.com';
    private readonly token: string;

    constructor(token: string) {
        this.token = token;
    }

    public hello() {
        fetch(this.baseUrl).then(
            response => console.log('Hello success: ' + response.ok)
        ).catch(
            response => console.log('Hello: ' + response.ok)
        );
    }

    public authenticate() {
        const url = `${this.baseUrl}/v2/user`;
        fetch(url, {
            method: 'post',
            headers: new Headers({
                'Authorization': 'Bearer '+ this.token,
            }),
        }).then( response =>
            console.log('Status success: ' + response.ok)
        ).catch(response =>
            console.log('Status: ' + response)
        );
    }


}
