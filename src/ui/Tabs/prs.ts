import {displayData} from "../tab";

export const openPRTab = (event: Event) => {
    displayData(event, 'Pull-Requests', () => Promise.resolve('<h1>hello</h1>'));
}
