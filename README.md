# Introduction

Freebe is a blockchain-based web platform where companies can create jobs on the portal and get applications from various freelancers. The job creator selects the best suitable freelancer and the corresponding amount of money is deducted from their wallet. When the freelancer achieves a milestone of a particular job, the corresponding proportion of money is transferred to their wallet. Before applying for a job, a freelancer has to make a profile on the platform so that the job creators can get to know about the skills and experiences of the freelancer.


# Technologies Used

1. Smart Contract: A smart contract is simply an agreement between the parties included in a transaction that is required to ensure a party that the counter-party will fulfill the terms and conditions listed in the contract. It contains the logic behind the execution of all the transactions executed on the blockchain. The smart contract is written using 'Solidity' language.

2. Hardhat: Hardhat is a tool that provides us with a development environment for web3-based applications. It can help with everything from compiling, testing, deploying, and debugging a smart contract. Hardhat provides some test accounts with fake ethers that we can use to test the working of various functions of our smart contract.

3. Inter Planetary File System: Storing large files on blockchain can be very costly. So, Inter Planetary File System or IPFS is used to store images related to a job or profile image of a freelancer. Whenever a file is uploaded to IPFS, it is chunked into smaller pieces and distributed across the peer-to-peer network.

4. Metamask: It is a browser extension that provides a user-friendly interface to interact with the blockchain. It is simply a cryptocurrency wallet that enables users to execute various transactions on a decentralized application. By connecting to Metamask, users can send and receive digital currency. It also provides some essential features such as gas price estimation, which helps users to optimize transaction fees. Metamask is used to pay the cost associated with the execution of various functions written in the smart contract.

5. MERN: MERN is a combination of four open-source technologies: MongoDB, Express.js, React, and Node.js. React is used to develop the frontend part of the application and MongoDB is used in order to store the data that is comparatively less private as storing less private data on blockchain will result in unncessary storage fees.


# How To Use The platform

On the first visit, the users have to register on the platform by providing necessary details and email id. A verification email with a 4-digit OTP will be sent to the email id of the user and as soon as the correct OTP in entered, the users will be directed to login page where they can log themselves into the platform by entering email id and password. 

Now, the users will be directed to the home page where they will have to connect their metamask wallet with the platform. Now, the  users can either create a profile by clicking on profile button in the navbar and start applying for jobs or create a new job by clicking on 'Post Job' in the navbar and start applications for the job. 

If a user creates a new job, he will have to provide all the necessary details about the job and specify the amount of money(ethers) they are offering and expected time for completion of the project.

The users can go through all the jobs listed on the platform and apply in relevant jobs. The jobs can be filtered on the basis of categories or job location. While applying, the user will have to bid for the job by specifying the required amount of money and expected time in which they can complete the project. Whenever a user applies for a job, the job will reflect in the 'My Jobs' section. If the user gets selected for the job, he will have to complete sonme milestones and corresponding proportion of money will be transferred to his wallet.

The job creators can go through various bids for the job and select a freelancer for the job. As sson the job creator selects a freelancer, the amount of money specified by the freelancer will be deducted from their wallet and will be stored in the smart contract which will be transferred to the freelancer in proportions whenever a new milestone is reached.
