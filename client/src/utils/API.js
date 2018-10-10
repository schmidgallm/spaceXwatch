// Dependencies
import axios from 'axios';

// export all api calls
export default {


    getLaunches: () => {
        return axios.get('/spacex/data')
            .then( response => {
                console.log(response);
            })
            .catch( err => {
                console.log(err);
            })
    }

}