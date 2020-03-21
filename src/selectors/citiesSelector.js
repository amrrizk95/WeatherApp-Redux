
import axios from 'axios'
import { handelSearch, getWeather } from '../actions/actions'
var TrieSearch = require('trie-search');


function fetchCities(query) {
    let ts = new TrieSearch([
        ['properties', 'NAME'] // `Search properties.NAME`
    ]);
    let data;
    return dispatch => {
        axios.get('https://raw.githubusercontent.com/drei01/geojson-world-cities/master/cities.geojson')
            .then((res) => {
                if (res.error) {
                    throw (res.error);
                }
                ts.addAll(res.data.features);
                data = ts.get(query);
                dispatch(handelSearch(data))
                return data
            })
    }
}


export function fetchtWeather(cityName) {
    const params = {
        access_key: 'abb8ec2560cd5fddc8e0b950d4e6f458',
        query: `${cityName}`
    }
    return dispatch => {
        axios.get(`http://api.weatherstack.com/current`, { params })
            .then((res) => {
                if (res.error) {
                    throw (res.error);
                }
                dispatch(getWeather(res.data.current))


            })
    }
}
export default fetchCities;

