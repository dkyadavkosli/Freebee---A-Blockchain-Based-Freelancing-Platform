var retrievedObject = localStorage.getItem('freeCurrResume');

const initialState = JSON.parse(retrievedObject);

const changeCurrResume = (state = initialState , action) => {
    switch(action.type){
        case "CURRESUME": return action.resume;
        default: return state;
    }
}

export default changeCurrResume; 