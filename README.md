# Ethereum DLT for the exchange of data between digital twins and users within the lifecycle

In general, digital twins hold all kinds of documents, e.g. operating instructions, sensor data, etc. In addition, such sensitive data must be protected from production through to various end users and still be editable in part. This project supports this process with the help of a DHT and a private DLT. Furthermore, access to various files is provided by an RBAC system, which allows a smooth retrieval of earlier versions of documents. This preserves transparency and consistency.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

#### [Parity] (https://www.parity.io/)

Ethereum Go provides a geth client and therefore the construction of a private DLT is quite simple. 

#### [Swarm] (https://github.com/ethersphere/swarm)

Swarm offers a key value principle. Thus this system can be compared with a decentralized database. Later the majority of the files will be stored here. 

#### [Truffle] (https://truffleframework.com/docs/truffle/getting-started/installation)

We use Truffle to make compiling and migrating our DApp much easier. With Truffle we also use [webpack] (https://webpack.js.org/) and [lite server] (https://github.com/johnpapa/lite-server).

#### [Node.js] (https://nodejs.org/de/download/)

Our heart of the web application is Node.js. Thus our web server can be built and applications can run performant.

#### [MetaMask] (https://metamask.io/)

In order to embed the local instance of the private DLT into the browser, it is connected to MetaMask.

#### [Git] (https://nodejs.org/de/download/)

(optional) 
Faster download and versioning of source code and files. No big advantage in terms of application.


### Installing

The repository contains numerous files and directories. Here is a short explanation:

* build (The DApp is deployed to this directory)
* contracts (This folder contains the templates for Smart Contracts, e.g. Specification.sol)
* migrations (the numbering of the files by prefixes indicates the order of migration by truffle)
* network (Here the two nodes are configured, including their key stores. In addition the Genesis block is located here.)
* node_modules (Holds all modules of Node.js and which are relevant for build.)
* src (The source code is contained in this directory. So you can see the contents of the DApp here.)
* test (Truffle uses this directory)

#### Clone the project

	$  git clone https://github.com/philipempl/ether-twin

#### MetaMask configuration

Launch the web browser and open MetaMask. Here you have to create a new account. Please keep the seed, because it is the access key to the chain. Next, MetaMask must establish a connection to the chain. As address the first node instance is used: http://localhost:8501. So far the configuration of MetaMask is finished. In the following you can import or export new accounts with the private key. 
If you would like to include the private key of a certain node in MetaMask, open the terminal in the main directory and run getPrivateKey.js.
Keep in mind that this method resolves only the first file in the keystore directory of a certain file. This file decrypts the UTC file for testing reasons and prints out the address and the private key of the node.

	$ Node getPrivateKey.js [parity_node_no] [name_UTC] [password]
	
## Running the tests

As mentioned before, Truffle is used to deploy and test the DApp. To start the test, please execute the following code snippet in the root directory.

	$ truffle test --network ethertwin

## Deployment

### Run the directory 'network'

Due to the switch to parity, a node within the network directory is started using the following command. If go-ethereum is to be used, which is not recommended due to incompatibility, the startNetwork.bat file must be modified.
For the installation, integration, and connection of the two nodes, please use the Parity documentation.The following commands can be executed from the network/parity folder to start the two nodes:

	$ parity --config node1.toml
	$ parity --config node2.toml

### Migrate the project using Truffle (If you need to apply changes to the chain, you have to use the following snippet)

	$ truffle migrate --network ethertwin

### Start browser sync

	$ npm run dev
	
This should automatically open a new browser window with your client-side application. You can change the running lite-server port by editing 'bs-config.json'

## Proceeding with a productive system

The following files must be edited on a live system, e.g. AWS:
* app.js
* truffle-config.js

Furthermore, the configuration of the nodes cannot be reused without further ado. If such a feature is planned, please inform yourself in detail and configure the nodes in the next step.

## Limitations

Due to the fragility of the two nodes, the following error message may occur if the reboot is incorrect:
"Header broke ancestry"
It is always advisable to kill the nodes properly with CTRL+C.
It is therefore recommended to rebuild both nodes using this [tutorial](https://hackernoon.com/setup-your-own-private-proof-of-authority-ethereum-network-with-geth-9a0a3750cda8).

Please note that the following files have to be reconfigured:
- startNetwork.bat (change addresses)
- config.toml in both node directories
- 2_deploy_contracts.js in the migrations directory (The address of the device agent must be specified here.)

## Authors

* **Philip Empl** - *Initial work* - [philipempl](https://github.com/philipempl)

See also the list of [contributors](https://github.com/philipempl/ether-twin/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Thanks to Benedikt Putz for answering numerous questions and solving problems regarding the desired architecture.
* Hat tip to anyone whose code was used
* Inspiration