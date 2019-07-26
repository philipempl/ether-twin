App = {
	web3Provider: null,
	contracts: {},
	addresses: {},
	RBAC: {
	  DEVICEAGENT: 0,
	  MANUFACTURER: 1,
	  OWNER: 2,
	  DISTRIBUTOR: 3,
	  MAINTAINER: 4
	},
	account: "",
	SwarmClient: null,
	Client: null,
	starred: [],
	MAX_CONTRACT_SIZE: 8,
	swarm: "",
	isDeviceAgent: false,
	accountInterval: null,
	contractRegistryAbi: JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"contracts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"amlsTmp","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_auth","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":false,"inputs":[{"name":"_deviceID","type":"string"},{"name":"_deviceName","type":"string"}],"name":"registerContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amlContent","type":"string"}],"name":"createAMLBody","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getContracts","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAMLContracts","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"}]'),
	amlBodyAbi: JSON.parse(
	  '[{"constant":true,"inputs":[],"name":"amlContent","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_amlContent","type":"string"}],"name":"setAmlContent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAmlContent","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]'),
	specificationAbi: JSON.parse(
		'[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"callProgramQueue","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"deviceAML","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"deviceID","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"deviceName","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"documentArray","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_authAddress","type":"address"}],"name":"amlStorage","outputs":[{"name":"timestamp","type":"uint256"},{"name":"sender","type":"address"},{"name":"content","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"name":"_deviceID","type":"string"},{"name":"_deviceName","type":"string"},{"name":"_deviceAML","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"function","constant":false,"name":"updateSpecs","outputs":[]},{"constant":true,"inputs":[{"name":"_deviceID","type":"string"},{"name":"_deviceName","type":"string"},{"name":"_deviceAML","type":"string"}],"name":"getDocumentArray","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_newAMLVersion","type":"string"}],"name":"createNewAMLVersion","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"timestamp","type":"uint256"}],"name":"getAML","outputs":[{"name":"","type":"address"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAllAMLInfos","outputs":[{"components":[{"name":"timestamp","type":"uint256"},{"name":"sender","type":"address"},{"name":"content","type":"string"}],"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"}]'),
		init: function() {
  return App.initializeModern();
	},
  
	initializeModern: async function() {
	  try {
		/*
		  var SwarmClient = require ("@erebos/swarm-node");
			  alert("dasd");
  const client = new SwarmClient({
	  bzz: { url: 'http://localhost:5500' },
	  ipc: '/path/to/swarm.ipc', // will be used to interact with PSS
	});
		  uploadDoc();
		  */
		if (window.ethereum) {
		  // for modern DApps browser
		  App.web3Provider = window.web3.currentProvider;
		  window.web3 = new Web3(ethereum);
		  try {
			await ethereum.enable();
		  } catch (error) {
			console.error(error);
		  }
		} else if (web3) {
		  // for old DApps browser
		  if (typeof web3 !== "undefined") {
			// If a web3 instance is already provided by Meta Mask.
			App.web3Provider = web3.currentProvider;
			window.web3 = new Web3(web3.currentProvider);
		  } else {
			// Specify default instance if no web3 instance provided
			App.web3Provider = new Web3.providers.HttpProvider(
			  "http://localhost:8501"
			);
			window.web3 = new Web3(App.web3Provider);
		  }
		} else {
		  alert(
			"Non-Ethereum browser detected. You should consider trying MetaMask!"
		  );
		}
		return App.initContract();
	  } catch (err) {
		alert(err.message);
	  }
	},
  
	initContract: function() {
	  $.getJSON("Authorization.json", function(authorization) {
		// Instantiate a new truffle contract from the artifact
		App.contracts.Authorization = TruffleContract(authorization);
		// Connect provider to interact with contract
		App.contracts.Authorization.setProvider(App.web3Provider);
	  });
	  $.getJSON("ContractRegistry.json", function(contractRegistry) {
		// Instantiate a new truffle contract from the artifact
		App.contracts.ContractRegistry = TruffleContract(contractRegistry);
		// Connect provider to interact with contract
		App.contracts.ContractRegistry.setProvider(App.web3Provider);
	  })
		.then(function() {
		  App.contracts.ContractRegistry.deployed()
			.then(function(instance1) {
			  var address1 = instance1.address;
			  App.addresses.ContractRegistryAddress = address1;
			})
			.then(function() {
			  App.contracts.Authorization.deployed()
				.then(function(instance2) {
				  var address2 = instance2.address;
				  App.addresses.AuthorizationAddress = address2;
				  return address2;
				})
				.then(function(result) {
				  return App.render();
				})
				.catch(function(err) {
				  alert(err);
				});
			});
		})
		.then(function() {});
	},
  
	loadAccount: function() {
	  window.web3.eth.getAccounts(function(error, result) {
		if (!error) {
		  App.account = result[0];
		  $("#accountAddress").html(result[0]);
		} else {
		  alert(error);
		}
	  });
	  //if account has changed, reload window
	  App.accountInterval = setInterval(function() {
		if (window.web3.eth.accounts[0] !== App.account) {
		  App.account = window.web3.eth.accounts[0];
		  App.init();
		}
	  }, 100);
	},
	// Listen for events emitted from the contract
	listenForEvents: function() {
	  App.contracts.Authorization.deployed().then(function(instance) {
		// Restart Chrome if you are unable to receive this event
		// This is a known issue with Metamask
		// https://github.com/MetaMask/metamask-extension/issues/2393
		instance
		  .votedEvent(
			{},
			{
			  fromBlock: 0,
			  toBlock: "latest"
			}
		  )
		  .watch(function(error, event) {
			console.log("event triggered", event);
			// Reload when a new vote is recorded
		  });
	  });
	},
  
	appInstalled: function() {
	  window.web3.eth.getAccounts(function(err, accounts) {
		if (err != null) {
		  alert(err);
		} else if (accounts.length === 0) {
		  alert("MetaMask is locked");
		} else {
		}
	  });
	},
	render: function() {
	  var loader = $("#loader");
	  var content = $("#content");
	  var devInterface = $("#devInterface");
	  var contractResults = $("#contractResults");
	  var accountImage = $("#accountImage");
	  contractResults.empty();
	  loader.show();
	  content.hide();
	  devInterface.hide();
	  // first stage
	  App.appInstalled();
	  App.loadAccount();
	  //check if current account has device agent privileges
	  App.contracts.Authorization.deployed()
		.then(function(instanceA) {
		  return instanceA.isDeviceAgent.call();
		})
		.then(function(bool) {
			App.isDeviceAgent = bool;
		  //after checking, all contracts are retrieved
		  App.contracts.ContractRegistry.deployed()
			.then(function(instance1) {
			  return instance1.getContracts.call();
			})
			.then(data => {
			  contracts = data;
			  return contracts;
			})
			.then(function(contracts) {
				//iteration through all elements
			  if (contracts.length > 0) {
				contracts.forEach(element => {
				  //check role of user
				  var roleNo;
				  App.contracts.Authorization.deployed()
					.then(function(instance) {
					  return instance.getRole.call(App.account, element);
					})
					.then(function(result) {
					  roleNo = result;
					  return App.enum2String(Number(result));
					})
					.then(function(role) {
					  if (role !== null) {
						App.starred.push(element);
						var deviceID;
						var deviceName;
						var SpecificationContract = web3.eth
						  .contract(App.specificationAbi)
						  .at(element);
						SpecificationContract.deviceID.call(function(err, devID) {
							deviceID = devID;
						
						  SpecificationContract.deviceName.call(function(
							err,
							devName
						  ) {

							deviceName = devName;
				

							var address = SpecificationContract.address;
							var addressSubString =
							  address.substring(0, 18) + "...";
							var revisionTemplate = //
							  "<tr>" + //
							  '<td ><input id="share" type="image" src="./images/digital.png" style="white-space: nowrap; height:25px; width:25px"></input></td>' + //
							  '<td style="white-space: nowrap;">' +
							  deviceID +
							  "</td>" + //
							  '<td style="white-space: nowrap;">' +
							  deviceName +
							  "</td>" + //
							  '<td style="white-space: nowrap;">' +
							  addressSubString +
							  "</td>" + //
							  '<td style="white-space: nowrap;">' +
							  role +
							  "</td>" + //
							  "<td><form onSubmit=\"App.viewAML('" +
							  address +
							  '\'); return false;"> <input id="share" type="image" src="./images/aml.png" style="height:25px; width:25px"></input></form></td>' + //
							  "<td><form onSubmit=\"App.addAccount('" +
							  address +
							  '\'); return false;"> <input id="share" type="image" src="./images/share.png" style="height:25px; width:25px"></input></form></td>' + //
							  "<td><form onSubmit=\"App.viewContract('" +
							  address +
							  '\'); return false;"> <input type="image" value="' +
							  address +
							  '"src="./images/binoculars.png" style="height:25px; width:25px"></input></form></td>' + //
							  "<td><form onSubmit=\"App.deleteAddress('" +
							  address +
							  roleNo +
							  '\'); return false;"> <input s id="unstar" type="image" src="./images/star.png" style="height:20px; width:20px"></input></form></td></tr>';
								contractResults.append(revisionTemplate);
							});
						});
					  }
					});
				});
			  } else {
				var revisionTemplate =
				  '<tr><td column-span="9">You are not authorized for any device at this time.</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>';
				contractResults.append(revisionTemplate);
			  }
			})
			.catch(function(error) {
			  alert(error);
			});
		  loader.hide();
		  content.show();
		  if (App.isDeviceAgent) {
			$("#accountName").html("Device Agent");
			$("#accountImage").attr("src", "./images/machine.png");
			accountImage.show();
  
			devInterface.show();
		  } else {
			$("#accountName").html("USERNAME");
			$("#accountImage").attr("src", "./images/profil.png");
			accountImage.show();
		  }
		});

	  return contractResults;
	},
	enum2String(enumVal) {
	  switch (enumVal) {
		case App.RBAC.DEVICEAGENT:
		  return "Device Agent";
		case App.RBAC.MANUFACTURER:
		  return "Manufacturer";
		case App.RBAC.OWNER:
		  return "Owner";
		case App.RBAC.DISTRIBUTOR:
		  return "Distributor";
		case App.RBAC.MAINTAINER:
		  return "Maintainer";
		default:
		  return null;
	  }
	},
	addDevice: async function() {
	  //App.loadAccount();
	  //values from html form
	  var deviceID = $("#deviceID").val();
	  var deviceName = $("#deviceName").val();
	  var deviceAML = $("#deviceAML").val();
  
	  if (deviceID === "" || deviceName === "" || deviceAML === "") {
		alert("Empty values are not accepted!");
	  } else {
		//var devAMLArray = await App.getAMLArray(deviceAML);
		//is waiting until all addresses are stored
		//var waitingFor = await App.registerAMLBodies(deviceAML);
		App.contracts.ContractRegistry.deployed()
		  .then(function(instance) {
			return instance.registerContract.sendTransaction(
			  deviceID,
				deviceName,
				deviceAML,
			  {
				from: App.account
			  }
			);
		  })
		  .then(function(result) {
			$("#content").show();
			$("#loader").hide();
  
			App.init();
		  })
		  .catch(function(err) {
			alert(err);
		  });
	  }
	},
	addAccount: function(deviceAddress) {
	  swal({
		title: "Share this device",
		confirmButtonClass: "confirm-class",
		cancelButtonClass: "cancel-class",
		showCancelButton: true,
		reverseButtons: true,
		html:
		  "<p>You can allow another account to participate in the life cycle of this device. Specify the account and its role to grant it access.</p>" +
		  "</br>" +
		  "<h5>Address</h5>" +
		  '<input id="swal-input2" class="swal2-input">' +
		  "</br>" +
		  "<h5>Role</h5>" +
		  '<select id="swal-input1" class="swal2-input"> <option value="1">Manufacturer</option><option value="2">Owner</option><option value="3">Distributor</option><option value="4">Maintainer</option></select>'
	  }).then(
		function(result) {
		  if (result.value) {
			// function when confirm button clicked
			var selec = $("#swal-input1").val();
			var address = $("#swal-input2").val();
  
			App.contracts.Authorization.deployed()
			  .then(function(instance) {
				return instance.addRole.sendTransaction(
				  address,
				  Number(selec),
				  deviceAddress,
				  {
					from: App.account
				  }
				);
			  })
			  .then(function(result) {
				Swal.fire({
				  type: "success",
				  title: "Account has been successfully added.",
				  showConfirmButton: false,
				  timer: 2000
				});
				$("#content").hide();
				$("#loader").show();
  
				$(window).load(function() {
				  App.init();
				});
			  })
			  .catch(function(err) {
				alert(err);
				Swal.fire({
				  type: "error",
				  title: "Oops...",
				  text: "Something went wrong!",
				  footer:
					"Please check if the account address is correct and keep your privileges in mind!",
				  showConfirmButton: false,
				  timer: 6000
				});
			  });
		  }
		},
		function(dismiss) {
		  if (dismiss == "cancel") {
			swal("Cancelled", "Device not shared!", "error");
		  }
		}
	  );
	},
	uploadDocument: function(content)
	{
		const client = new Erebos.SwarmClient({
      http: 'https://swarm-gateways.net',
    });
    client.bzz
      .upload('Hello world!', { contentType: 'text/plain' })
      .then(hash => client.bzz.download(hash))
      .then(res => res.text())
      .then(text => {
        console.log(text) // "Hello world!"
      });
	},
	viewAML: async function(address) {

		localStorage.setItem("address", address);
	  var SpecificationContract = web3.eth
		.contract(App.specificationAbi)
		.at(address);
		var output = '';
		var versions; 
	  var amlHistory = await new Promise((resolve, reject) => {
		SpecificationContract.getAllAMLInfos.call({from:App.account}, function(err, latest) {
			versions = latest.toString().split(',');
			SpecificationContract.getAML.call(versions[versions.length-1],{from: App.Account}, function(err, result1) {
				var resultset = result1.toString().split(',');
				var sender = resultset[0];
				var content = resultset[1];
				var result = $("#amlResult");
	
				$("#amlResult").html(content);
				result.show();
				$('#amlResult').show();
				$('#submitAML').show();
				$('#detailViewLabel').html("AML for Device: <br> " + address);
				$('#detailViewLabel').show();
				$('#amlVersion').show();
				$('#textAMLVersion').html("latest Version: ("+ versions[versions.length-1] + ")  <br> author: " + sender);
				$('#textAMLVersion').show();
				var select = $('#testSEL');

				var menuHtml = '<span class="dropdown"><a href="#" class="btn btn-primary" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Version <span class="caret"></span></a><ul class="dropdown-menu">';
				for (i = 0; i < versions.length; i++) {
					menuHtml += '<li><a onclick="App.loadAML(\'' + versions[i] + '\',\''+i+'\' )" href="#">' + versions[i] + '</a></li>';
				}
				menuHtml += '</ul></span>';
				document.getElementById("optionscontainer").innerHTML = menuHtml;
			
				});		});
				resolve(result1);
				


	});},
	loadAML: async function(timestamp, versionNumber) {
	  var SpecificationContract = web3.eth
		.contract(App.specificationAbi)
		.at(localStorage.getItem('address'));
	  var amlHistory = await new Promise((resolve, reject) => {
			SpecificationContract.getAML.call(timestamp,{from: App.Account}, function(err, result1) {
				var resultset = result1.toString().split(',');
				var sender = resultset[0];
				var content = resultset[1];
				var result = $("#amlResult");
				versionNumber = parseInt(versionNumber)+1;
				$("#amlResult").html(content);
				result.show();
				$('#amlResult').show();
				$('#submitAML').show();
				$('#detailViewLabel').html("AML for Device: <br> " + localStorage.getItem('address'));
				$('#detailViewLabel').show();
				$('#amlVersion').show();
				$('#textAMLVersion').html(versionNumber+". Version: "+ timestamp + "  <br> author: " + sender);
				$('#textAMLVersion').show();
			
				resolve(resultset);
			});
		});

	},
  
	viewContract: function(address) {
	  var SpecificationContract = web3.eth
		.contract(App.specificationAbi)
		.at(address);
	  SpecificationContract.deviceAML.call(function(err, devAML) {
		});
	},
	deleteAddress: function(addressrole) {
	  var address = addressrole.substring(0, addressrole.length - 1).toString();
	  var role = Number(
		addressrole
		  .substring(addressrole.length - 1, addressrole.length)
		  .toString()
	  );
  
	  Swal.fire({
		type: "warning",
		title: "Do you really want to remove this device?",
		showConfirmButton: true,
		showCancelButton: true,
		confirmButtonText: "yes",
		cancelButtonText: "no"
	  }).then(function(result) {
		if (result.value) {
		  App.contracts.Authorization.deployed()
			.then(function(auth) {
			  return auth.removeRole.sendTransaction(App.account, role, address, {
				from: App.account
			  });
			})
			.then(function() {
			  // Wait for votes to update
			  $("#content").hide();
			  $("#loader").show();
  
			  Swal.fire({
				type: "success",
				title: "You have successfully removed this device!",
				showConfirmButton: false,
				timer: 2000
			  });
			})
			.catch(function(err) {
			  alert(err.message);
			});
		}
	  });
	},

	saveAML: function()
	{
				var newAML = $("#amlResult").val();
				var SpecificationContract = web3.eth
				.contract(App.specificationAbi)
				.at(localStorage.getItem('address'));
				SpecificationContract.createNewAMLVersion.sendTransaction(newAML, {from: App.Account}, function(err, devAML) {}).then(function(result) {
				
				
				});	
				
			},
	};
  $(window).ready(function() {
	App.init();
  });
  