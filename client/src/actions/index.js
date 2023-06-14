export const changeCategory = (category) => {
    return{
        type:"CATEGORY",
        category:category
    }
}

export const changeUser = (user) => {
    return{
        type:"CURRUSER",
        user:user
    }
}

export const changeCurrJob = (job) => {
    return{
        type:"CURRJOB",
        job:job
    }
}

export const changeCurrResume = (resume) => {
    return{
        type:"CURRESUME",
        resume:resume
    }
}

export const changeCurrFreelancer = (free) => {
    return{
        type:"CURRFREE",
        currFree:free
    }
}
