// Dependencies
import axios from 'axios';

// export all api calls
export default {
    getArticles: () => {
        return axios.get('/nyt/spacex');
    }
}