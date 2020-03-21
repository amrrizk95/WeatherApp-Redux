
export const handelSearch = (data) => {

    return {
        type: 'HANDEL_SEARCH',
        data,

    }
}
export const handelChange = (index) => {

    return {
        type: 'HANDEL_CHANGE',
        index

    }
}
export const updateHeight = (h) => {

    return {
        type: 'UPDATE_HEIGHT',
        h

    }
}
export const getWeather = (weather) => {

    return {
        type: 'GETWEATHER',
        weather

    }
}
export const openModalAction = () => {

    return {
        type: 'MODAL_IS_OPEN',
        modalIsOpen: true
    }
}
export const closeModalAction = () => {

    return {
        type: 'MODAL_IS_CLOSE',
        modalIsOpen: false
    }
}

