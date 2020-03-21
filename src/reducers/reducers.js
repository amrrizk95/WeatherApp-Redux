


const weatherReducerDefaultState = {
    height:'',
    data:[],
    selectedFeature:{},
    weather:{},
    modalIsOpen:false
}

export default (state=weatherReducerDefaultState,action)=>{
    switch (action.type) {
        case 'HANDEL_SEARCH':
            return {
                ...state,
              // query:action.query,
              data:action.data
              
            }
        case 'HANDEL_CHANGE':
            return{
                ...state,
                selectedFeature:state.data[action.index]
            }   
        case 'UPDATE_HEIGHT':
            return{
                ...state,
                height:action.h
            } 
        case 'GETWEATHER':
            return{
                ...state,
                weather:action.weather
            }      
        case 'MODAL_IS_OPEN':
            return{
                ...state,
                modalIsOpen:action.modalIsOpen
            } 
        case 'MODAL_IS_CLOSE':
            return{
                ...state,
                modalIsOpen:action.modalIsOpen
            }       
        default:
            return state
    }
}