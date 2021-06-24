import { BuildKiteService } from "./api/services/buildkite";

const api = new BuildKiteService('928392d67f76b27f2ffee3f7d27106e08b20018e');
api.hello();
api.authenticate();