import {createContext, useReducer} from 'react'

const Initial_state={
city:undefined,
dates:[],
option:{
    adult:undefined,
    children:undefined,
    room:undefined,
},
}
export const SearchContext=createContext(Initial_state)

const Searchreducer=(state,action)=>{
    switch(action.type){
        case "New_Search": return action.payload;
        case "Reset_Search":
            return Initial_state;
            default:
                return state;
    }
}

export const SearchContextProvider=({children})=>{
    const [state,dispatch]=useReducer(Searchreducer,Initial_state);

return(
<SearchContext.Provider value={{city:state.city,dates:state.dates,options:state.options,dispatch}}>
    {children}
</SearchContext.Provider>

)

}