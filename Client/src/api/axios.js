//we'll be importing axios from this file now
import axios from 'axios';

export default axios.create({
    baseURL: 'http://127.0.0.1:9000'
});