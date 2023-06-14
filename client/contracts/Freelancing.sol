// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Freelancing {
    struct Bidder {
        uint256[4] bidArray; //cost , time, rating, pId
        string desc;
        string image;
        string bidder;
    }

    mapping(uint256 => Bidder) public bids;

    uint256 public numberOfBids = 0;

    struct Job {
        string[12] stringArray; // owner_name, description,  linkedIn, Twitter, Insta, Email, company address, company desc, image, _id, location
        uint256[3] intArray; // deadline, expected_time, expected_cost,
        address owner;
        string category;
        string[] req_skills;
        Bidder[] bidders;
        uint256 final_selection;
        uint256 final_amount;
        uint256 pId;
        uint256 visible;
        uint256[] resp;
        string[] ask;
        uint256 totalAsks;
        uint256 finished;
    }

    mapping(uint256 => Job) public jobs;

    uint256 public numberOfJobs = 0;

    function createJob(
        string[12] memory strArr,
        uint256[3] memory intArr,
        address _owner,
        string[] memory skills,
        string memory _category
    ) public payable returns (uint256) {
        Job storage job = jobs[numberOfJobs];

        require(
            job.intArray[0] < block.timestamp,
            "The deadline should be a date in the future."
        );

        job.intArray[0] = intArr[0];
        job.intArray[1] = intArr[1];
        job.intArray[2] = intArr[2];

        job.stringArray[0] = strArr[0];
        job.stringArray[1] = strArr[1];
        job.stringArray[2] = strArr[2];
        job.stringArray[3] = strArr[3];
        job.stringArray[4] = strArr[4];
        job.stringArray[5] = strArr[5];
        job.stringArray[6] = strArr[6];
        job.stringArray[7] = strArr[7];
        job.stringArray[8] = strArr[8];
        job.stringArray[9] = strArr[9];
        job.stringArray[10] = strArr[10];
        job.stringArray[11] = strArr[11];

        job.category = _category;
        job.totalAsks = 0;
        job.final_amount = 0;

        job.visible = 1;
        job.finished = 0;

        for(uint256 i=0;i<skills.length;i++){
            job.req_skills.push(skills[i]);
        }

        job.final_selection = 0;

        job.owner = _owner;

        job.pId = numberOfJobs;

        numberOfJobs++;

        return numberOfJobs - 1;
    }

    function getJobs() public view returns (Job[] memory) {
        Job[] memory allJobss = new Job[](numberOfJobs);

        for (uint i = 0; i < numberOfJobs; i++) {
            Job storage item = jobs[i];

            allJobss[i] = item;
        }

        return allJobss;
    }

    function addBid(
        uint256 _id,
        string memory _bidder,
        uint256 _cost,
        uint256 _time,
        uint256 _rating,
        uint256 _pId,
        string memory _desc,
        string memory _image
    ) public payable {
        Bidder storage bid = bids[numberOfBids];

        bid.bidArray[0] = _cost;
        bid.bidArray[1] = _time;
        bid.bidArray[2] = _rating;

        bid.bidArray[3] = _pId;
        bid.desc = _desc;
        bid.image = _image;

        bid.bidder = _bidder;

        Job storage job = jobs[_id];

        job.bidders.push(bid);

        numberOfBids++;
    }

    function makeAsk(uint256 _id, string memory _ask) public{
        Job storage job = jobs[_id];
        job.ask.push(_ask);
    }

    function getAJob(uint256 _id) public view returns (Job memory) {
        return jobs[_id];
    }

    function getBalance() public view returns (uint256){
        return address(this).balance;
    }

    //    -----------------------------------------------------------------------------------------------------

    struct Experience {
        string[2] expArray; //title , desc
        uint256 duration;
    }

    mapping(uint256 => Experience) public experiences;

    uint256 public numberOfExperiences = 0;

    struct Project {
        string[2] proArray; //title , desc
        string platform;
    }

    mapping(uint256 => Project) public projects;

    uint256 public numberOfProjects = 0;

    struct Profile {
        string[10] stringArray; // Name , desc, category, linkedIn, github, twitter , email , instagram, image, _id
        uint256 rating;
        uint256 pId;
        address developer;
        string[] skills;
        string[] exp_title;
        string[] exp_desc;
        uint256[] exp_duration;
        string[] pro_title;
        string[] pro_desc;
        string[] pro_platform;
        uint256 engaged;
    }

    mapping(uint256 => Profile) public profiles;

    uint256 public numberOfProfiles = 0;

    function createProfile(
        string[10] memory strArr,
        address _developer,
        string[] memory _skills,
        string[] memory _exp_title,
        string[] memory _exp_desc,
        uint256[] memory _exp_duration,
        string[] memory _pro_title,
        string[] memory _pro_desc,
        string[] memory _pro_platform
    ) public payable returns (uint256) {
        Profile storage profile = profiles[numberOfProfiles];

        profile.stringArray[0] = strArr[0];
        profile.stringArray[1] = strArr[1];
        profile.stringArray[2] = strArr[2];
        profile.stringArray[3] = strArr[3];
        profile.stringArray[4] = strArr[4];
        profile.stringArray[5] = strArr[5];
        profile.stringArray[6] = strArr[6];
        profile.stringArray[7] = strArr[7];
        profile.stringArray[8] = strArr[8];
        profile.stringArray[9] = strArr[9];

        profile.pId = numberOfProfiles;

        profile.engaged = 0;

        for(uint256 i=0;i<_skills.length;i++){
            profile.skills.push(_skills[i]);
        }

        for(uint256 j=0;j<_exp_title.length;j=j+1){
            profile.exp_title.push(_exp_title[j]);
            profile.exp_duration.push(_exp_duration[j]);
            profile.exp_desc.push(_exp_desc[j]);
        }

        for(uint256 j=0;j<_pro_title.length;j=j+1){
            profile.pro_title.push(_pro_title[j]);
            profile.pro_desc.push(_pro_desc[j]);
            profile.pro_platform.push(_pro_platform[j]);
        }

        profile.developer = _developer;

        numberOfProfiles++;

        return numberOfProfiles - 1;
    }

    function updateProfile(
        uint256 _id,
        string[10] memory strArr,
        address _developer,
        string[] memory _skills,
        string[] memory _exp_title,
        string[] memory _exp_desc,
        uint256[] memory _exp_duration,
        string[] memory _pro_title,
        string[] memory _pro_desc,
        string[] memory _pro_platform
    ) public payable returns (uint256) {
        Profile storage profile = profiles[_id];

        profile.stringArray[0] = strArr[0];
        profile.stringArray[1] = strArr[1];
        profile.stringArray[2] = strArr[2];
        profile.stringArray[3] = strArr[3];
        profile.stringArray[4] = strArr[4];
        profile.stringArray[5] = strArr[5];
        profile.stringArray[6] = strArr[6];
        profile.stringArray[7] = strArr[7];
        profile.stringArray[8] = strArr[8];
        profile.stringArray[9] = strArr[9];

        for(uint256 i=0;i<_skills.length;i++){
            profile.skills.push(_skills[i]);
        }

        for(uint256 j=0;j<_exp_title.length;j=j+1){
            profile.exp_title.push(_exp_title[j]);
            profile.exp_duration.push(_exp_duration[j]);
            profile.exp_desc.push(_exp_desc[j]);
        }

        for(uint256 j=0;j<_pro_title.length;j=j+1){
            profile.pro_title.push(_pro_title[j]);
            profile.pro_desc.push(_pro_desc[j]);
            profile.pro_platform.push(_pro_platform[j]);
        }

        profile.developer = _developer;

        return numberOfProfiles - 1;
    }

    function getProfile(uint256 _id) public view returns (Profile memory) {
        return profiles[_id];
    }

    function getAllProfiles() public view returns (Profile[] memory) {
        Profile[] memory allProfiles = new Profile[](numberOfProfiles);

        for (uint i = 0; i < numberOfProfiles; i++) {
            Profile storage item = profiles[i];

            allProfiles[i] = item;
        }

        return allProfiles;
    }

    function rate(uint _id, uint _rating) public payable{
        Profile storage profile = profiles[_id];

        profile.rating = _rating;
    }
    
    
    function final_select(
        uint256 _id,
        uint256 id,
        uint256 _amt
    ) public payable returns (uint256) {
        Job storage job = jobs[_id];
        Profile storage profile = profiles[id];
        job.final_selection = id;
        job.visible = 0;
        job.final_amount = _amt;

        profile.engaged = 1;
        return _id;
    }

    
    function makeResponse(uint256 _id, uint256 _resp, address _add, uint256 _amt) public{
        Job storage job = jobs[_id];
        Profile storage profile = profiles[job.final_selection];
        
        if(_resp == 1){
            payable(_add).transfer(_amt);
            job.totalAsks++;
            job.final_amount = job.final_amount - _amt;
        }

        if(job.totalAsks == 4){
            profile.engaged = 0;
            job.finished = 1;
        }

        job.resp.push(_resp);
    }
}