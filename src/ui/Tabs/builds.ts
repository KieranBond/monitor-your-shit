import {displayData} from "../tab";

export const openBuildTab = (event: Event) => {
    displayData(event, 'Builds', () => Promise.resolve('<h1>bye</h1>'));
}

