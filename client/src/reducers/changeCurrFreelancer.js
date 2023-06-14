var retrievedObject = localStorage.getItem('freeCurrFreelancer');

const initialState = JSON.parse(retrievedObject);

const changeCurrFreelancer = (state = initialState , action) => {
    switch(action.type){
        case "CURRFREE": return action.currFree;
        default: return state;
    }
}

export default changeCurrFreelancer; 