import { displayData } from "../tab";
import {services} from "./settings";

const createHtml = (buildData: any[]): string => {
    if(!buildData || !Array.isArray(buildData)) return '<h1>Failed to load</h1>';

    let html: string = '';

    // sort by repo name - Stole from Ted (don't blame me)
    buildData.sort(function(a, b) {
        let textA = (a.pipeline.description === '' ? a.pipeline.slug : a.pipeline.description).toUpperCase();
        let textB = (b.pipeline.description === '' ? b.pipeline.slug : b.pipeline.description).toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    let pipelineName = ''

    buildData.map(build => {
        let pipeline = build.pipeline.description === '' ? build.pipeline.slug : build.pipeline.description;
        if (pipelineName != pipeline) {
            pipelineName = pipeline;
            html += `<a href="${build.web_url}" class="repo">${pipeline}</a>`
        }

        const state = build.blocked ? 'step-blocked' : build.state;

        html += `<a class='pr ${state}' href=${build.web_url} target="_blank">
                    <p class='pr-title'>${build.number}</p>
                    <p class='pr-title'>${build.message}</p>
                </a>`;
    });

    return html;
}

export const openBuildTab = (event: Event) => {
    displayData(event, 'Builds', () =>
                services.buildkiteService!.authenticate()
                .then(id => services.buildkiteService!.getBuildsForUser(5, id))
                .then(builds => createHtml(builds)));
}

