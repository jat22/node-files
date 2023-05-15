const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(fromPath, toPath){
	fs.readFile(fromPath, "utf8", (err, data) =>{
		if (err){
			console.log("ERROR", err);
			process.exit(1)
		}
		outPut(data, toPath)
	})
}

async function webCat(fromPath, toPath){
	try{
		let resp = await axios.get(fromPath);
		outPut(resp.data, toPath);
	} catch(err){
		console.log(`Error fetching ${url}; ${err}`)
		process.exit(1)
	}
}

function outPut(data, outPath){
	if(outPath){
		fs.writeFile(outPath, data, 'utf8', function(err){
			if (err){
				console.log("error", err);
				process.exit(1);
			}
		})
	} else{
		console.log(data)
	}
}

let fromPath
let toPath

if(process.argv[2] === '--out'){
	fromPath = process.argv[4]
	toPath = process.argv[3]
} else {
	fromPath = process.argv[2]
}

if (fromPath.slice(0,4) === "http"){
	webCat(fromPath, toPath)
} else {
	cat(fromPath, toPath)
}
