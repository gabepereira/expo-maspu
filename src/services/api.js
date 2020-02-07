import axios from 'axios';
import environment from '../config/environment';

export default axios.create({
    baseURL: environment.API_URL,
});
