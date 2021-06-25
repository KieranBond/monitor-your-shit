import { displayData } from "../tab";
import { BuildKiteService } from "../../api/services/buildkite";
import config from "../../../config.json"

const buildKiteService = new BuildKiteService(config.token.buildkite);

const createHtml = (buildData: any[]): string => {
    let html: string = '';

    buildData.map(build => {
        html = html.concat(`<div>
            <p>${build.state}</p>
            <p>${build.number}</p>
            <p>${build.pipeline.description}</p>
            </div>`);
    });

    return html;
}

export const openBuildTab = (event: Event) => {
    displayData(event, 'Builds', () =>
                buildKiteService.authenticate()
                .then(id => buildKiteService.getAllBuildsForUser(id))
                .then(builds => createHtml(builds)));
}

