import { Octokit } from "octokit";






export async function prs() {
    let response = await octo.rest.pulls.list({
        owner: "TedShaughnessy",
        repo: "react-redux-test-renderer",
      });

      console.log(response.data[0]);
      //return data;
}

let octo = new Octokit({
    auth: '',
});


prs();
// octo.rest.pulls.list({
//     owner: "TedShaughnessy",
//     repo: "react-redux-test-renderer",
//   }).then((res) => {

//     console.log("pulls-list", res);
// }).catch(e => console.log(e))