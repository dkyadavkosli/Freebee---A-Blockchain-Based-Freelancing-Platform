const hre = require('hardhat');

async function main() {

    const CrowdFunding = await hre.ethers.getContractFactory("Freelancing")
    const crowdFunding = await CrowdFunding.deploy();

    await crowdFunding.deployed();

    console.log("Factory deployed to:", crowdFunding.address);
}   

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });