// Dependencies
import axios from 'axios';

// export all api calls
export default {

  getLaunches: () => {
        return axios.get('/spacex/data')
            
    },
	
	getUserLaunches: (data) => {
        return axios.post('/getuserlaunches', data)
            
    },
	
	signUp: (data) => {
		return axios.post('/signup', data)
	},
	
	signIn: (data) => {
		return axios.post('/signin', data)
	},
	
	logout: () => {
		return axios.get('/logout');
	},
	
	session: () => {
		return axios.get('/session');
	},
	
	createGeoDataSet: () => {
		return axios.get('/creategeodataset');
	},
	
	user_createGeoDataSet: (data) => {
		return axios.post('/user_creategeodataset', data);
	},
	
	user_createEvent: (data) => {
		return axios.post('/user_createEvent', data);
	},
	
	user_datasets: (data) => {
		return axios.post('/user_datasets', data);
	},
	
	addSpaceXData: () => {
		return axios.get('/addspacexdata');
	},

	getImage: () => {
		return axios.get('spacex/images');
	}
}