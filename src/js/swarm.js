import { SwarmClient } from '@erebos/swarm-node' // node

const client = new SwarmClient({
	bzz: { url: 'http://localhost:5500' },
	ipc: '/path/to/swarm.ipc', // will be used to interact with PSS
  });

function uploadDoc(){
	try{
		client.bzz
		.upload('Hello world!', { contentType: 'text/plain' })
		.then(hash => {
			client.bzz.list(hash);
			alert(hash);
		}).then(contents => {
		console.log(contents) // Manifest contents describing the uploaded files
		 
	}); 
}
	catch(err)
	{
		alert(err);
	}
}
