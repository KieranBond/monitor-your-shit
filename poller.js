// const services = require('./ui/Tabs/settings');
// import {services} from "./ui/Tabs/settings";

const {services} = require("./src/ui/Tabs/settings");
const poll = () => {
    services?.buildkiteService?.poll();
    setTimeout(poll, 5000);
}

// importScripts('./ui/Tabs/settings.ts');

chrome.alarms.create({ periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener(() => {
    services?.buildkiteService?.poll();
});
