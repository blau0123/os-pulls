var fetch = require('node-fetch');

// bitmoji/2 and profiles/3 have null times:

/*
 * Gets the name of the user who made a given PR and the repo they made the PR to
 */
function getListOfReposAndPRs(allPRs){
	let listOfPRs = []
	for (var i = 0; i < allPRs.length; i++){
		// each element in allPRs is a list of PRs, sorted ascending
		let currRepo = allPRs[i];
	
		console.log(currRepo.length);
		// problem: losing some pull reqs??
		for (var j = 0; j < currRepo.length; j++){
			console.log(currRepo[j].html_url);
			let user = currRepo[j].user.login;
			// get repo url by remove the /pull/{number} at the end
			let repoPRTo = currRepo[j].html_url;
			let timeOfPR = currRepo[j].merged_at;
			
			// make sure the pr was actually merged in
			if (timeOfPR != null){
				listOfPRs.push({user: user, repo: repoPRTo, time: timeOfPR});
			}
		}
	}
	
	console.log(listOfPRs)
}

/*
 * Returns list of all PRs made to a given repo
 */
async function getPullRequests(repo){
	let prResponse = await fetch(repo.pulls_url.replace('{/number}', '?state=closed'));
	let pr = await prResponse.json();
	return pr;
}

/*
 * Make HTTP request to retrieve list of repos from os-ucsd
 */
async function getRepos(){
	let reposResponse = await fetch('https://api.github.com/orgs/os-ucsd/repos')
	let repos = await reposResponse.json();

	//console.log(repos);
	
	
	let allPRs = await Promise.all( 
		repos.map(repo => {
			// each pr returned is a list of pr's for a single repo
			return getPullRequests(repo);
		})
	);

	return getListOfReposAndPRs(allPRs);
}

getRepos();

