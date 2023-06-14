var retrievedObject = localStorage.getItem('freeCurrJob');

const initialState = JSON.parse(retrievedObject);

const changeCurrJob = (state = initialState , action) => {
    switch(action.type){
        case "CURRJOB": return action.job;
        default: return state;
    }
}

export default changeCurrJob; 