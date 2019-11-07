function printPulls(){
	var responseObj = JSON.parse(this.responseText);
	// print all pull requests as array of JSON for the given repo
	console.log(responseObj);
}

function printRepos(){
	var responseObj = JSON.parse(this.responseText);
	//console.log(responseObj)
	var request3 = new XMLHttpRequest();
	// reset request somehow and loop through all repos and access their pulls with /pulls?state=all
	request3.onload = printPulls;
	request3.open('get', 'https://api.github.com/repos/os-ucsd/graffiti-wall/pulls?state=all', true);
	request3.send();
}

function printRepoCount(){
	var responseObj = JSON.parse(this.responseText);
	//console.log(responseObj);
	console.log(responseObj.login + " has " + responseObj.public_repos + " public repositories");
	var request2 = new XMLHttpRequest();
	request2.onload = printRepos;
	request2.open('get', responseObj.repos_url, true);
	request2.send();
}

// create new request object
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var request = new XMLHttpRequest();
request.onload = printRepoCount;
// initialize request
request.open('get', 'https://api.github.com/orgs/os-ucsd', true);
request.send();

