// Dependencies
import axios from 'axios';

// export all api calls
export default {

    getArticles: () => {
        return axios.get('/nyt/spacex');
    },

    getRockets: () => {
        return axios.get('/spacex/data');
    }
}