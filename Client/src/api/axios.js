//we'll be importing axios from this file now
import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3500'
});