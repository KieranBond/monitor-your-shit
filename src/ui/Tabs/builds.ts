import { displayData } from "../tab";
import { BuildKiteService } from "../../api/services/buildkite";
import config from "../../../config.json"

const buildKiteService = new BuildKiteService(config.token.buildkite);

export const openBuildTab = (event: Event) => {
    buildKiteService.authenticate();
    displayData(event, 'Builds', () => Promise.resolve('<h1>bye</h1>'));
}

