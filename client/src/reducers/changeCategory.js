var retrievedObject = localStorage.getItem('freeCategory');

const initialState = JSON.parse(retrievedObject);

const changeCategory = (state = initialState , action) => {
    switch(action.type){
        case "CATEGORY": return action.category;
        default: return state;
    }
}

export default changeCategory; 