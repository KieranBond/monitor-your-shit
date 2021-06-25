export const baseUrl: string = 'https://api.buildkite.com/v2/';

export const enum CommonEndpoints {
    AllBuilds = "builds",
    Authenticate = "user"
};

const combineUrl = (...args: string[]): string => {
    let url: string = '';

    args.map(arg => {
       url.concat(`${arg}/`);
    });

    console.log(`Built url: ${url}`);
    return url;
};

export const getOrgBuildsUrl = (orgSlug: string): string => {
    // https://api.buildkite.com/v2/organizations/{org.slug}/builds
    return combineUrl(baseUrl, orgSlug, 'builds');
}

export const getPipelineUrl = (orgSlug: string, pipelineSlug: string): string => {
    //https://api.buildkite.com/v2/organizations/{org.slug}/pipelines/{pipeline.slug}/builds"
    return combineUrl(baseUrl, 'organizations', orgSlug, 'pipelines', pipelineSlug, 'builds');
}

export const getBuildUrl = (orgSlug: string, pipelineSlug: string, buildNumber: number): string => {
    // https://api.buildkite.com/v2/organizations/{org.slug}/pipelines/{pipeline.slug}/builds/{number}
    return combineUrl(getPipelineUrl(orgSlug, pipelineSlug), buildNumber.toString());
};