# Monitor Your Shit

Provides:

- An always visible icon showing the status of your last build
- A list of your last few builds and their statuses
- A list of PR's and their statuses

## Setup

---
Navigate to chrome://extensions/ in google chrome
Select Load Unpacking
Select the repository folder

The extension is now installed and will appear in your extensions list
pin the extension so that the icon is visible.
When you open the extension click the cog icon to access settings

## Settings

---

### Github

**Token**
Navigate to https://github.com/settings/tokens
Create a token with the repo scope
Enable SSO organisations if nessasary

**Owner** the organisation/user that will be searched for prs (limited to one currently)

**Repo Prefix** if you only want to track prs from repos with a certain prefix, otherwise leave blank

**Branch Prefix** if you only want to track prs from branches with a certain prefix, otherwise leave blank

### Buildkite

**Token**
Navigate to https://buildkite.com/user/api-access-tokens
Create a token with the following scopes:

- Read Builds
- Read Build Logs
- Read Pipelines
- Read User

 and enable relevant organisation access

**User** unused

---
