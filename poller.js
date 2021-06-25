const baseUrl = 'https://api.buildkite.com/v2/';
const authenticateUrl = 'user';
const allBuildsUrl = 'builds';

const authenticate = async (token) => {
    const url = `${baseUrl}${authenticateUrl}`;
    return await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer ' + token,
        }),
    })
        .then(response => response.json())
        .then(response => {
            console.log(`Authentication success`);
            return response.id;
        })
        .catch(response => {
            console.log(`Authentication failed: ${response.error}`)
            return '';
        });
}

const getBuildsForUser = async (maxCount = 1, userId, token) => {
    let url = `${baseUrl}${allBuildsUrl}?creator=${userId}&per_page=${maxCount}`;
    return await fetch(url, {
        method: 'GET',
        headers: new Headers({
            'Authorization': 'Bearer '+ token,
        }),
    })
        .then(response => response.json())
        .then(response => {
            console.log(`All builds for user: `, response);
            return response;
        })
        .catch(failure => console.log(`Failed to get all builds for user: `, failure.error));
}

const poll = (token, userId) => {
    getBuildsForUser(1, userId, token)
        .then( builds => {
            const build = builds[0];
            const state = build.blocked ? 'blocked' : build.state;

            let icon = '';
            const imgFolder = '../../../images/';

            switch(state) {
                case 'failed':
                case 'canceled':
                default:
                    icon = `${imgFolder}red-icon-128.png`;
                    break;
                case 'running':
                case 'blocked':
                    icon = `${imgFolder}orange-icon-128.png`;
                    break;
                case 'passed':
                    icon = `${imgFolder}green-icon-128.png`;
                    break;
            }

            if(icon !== '')
                chrome.action.setIcon({ path: icon});
    });
}

chrome.alarms.create({ periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(() => {

    chrome.storage.local.get('buildkiteToken', async (items) => {
        const storedData = [];
        Object.keys(items).forEach(key => {
            storedData[key] = items[key];
        });

        const token = storedData['buildkiteToken'];
        const userId = await authenticate(token);
        poll(token, userId);
    });
});