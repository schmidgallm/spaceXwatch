// Dependencies
import axios from 'axios';

// export all api calls
export default {

  getLaunches: () => {
        return axios.get('/spacex/data')
            
    },
	
	signUp: (data) => {
		return axios.post('/signup', data)
	},
	
	createGeoDataSet: () => {
		return axios.get('/creategeodataset');
	},
	
	addSpaceXData: () => {
		return axios.get('/addspacexdata');
	}
}