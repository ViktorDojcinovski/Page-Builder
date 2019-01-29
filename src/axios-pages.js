import axios from 'axios';

/**
 * Provide basic configuration for the
 * axios client for making ajax calls
 * 
 * Constants neccessary for making proper requests
 * are to be found in the config.js file
 * 
 * Rename config.example.js in config.js and
 * poppulate the strings with proper values
 * 
 * @return void
 */
const instance = axios.create({
  baseURL: process.env.BASE_URL,
});

export default instance;
