import request from 'request-promise';
import btoa from 'btoa';

/**
 *  Use this function obtaining token for
 *  the 'page-builder-api' OAuth2 client.
 * 
 *  By default the function returns and exports promise object
 *  Constants neccessary for making proper requests
 *  are to be found in the config.js file
 * 
 *  Rename config.example.js in config.js and
 *  poppulate the strings with proper values
 * 
 *  @return promise 
 */
const sendAPIRequest = () => {
  const token = btoa(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`)
  try {
    const auth = request({
      uri: `https://cors-anywhere.herokuapp.com/${process.env.ISSUER}/v1/token`,
      json: true,
      method: 'POST',
      headers: {
        authorization: `Basic ${token}`
      },
      form: {
        grant_type: 'client_credentials',
        scope: process.env.SCOPE
      }
    })

    return auth;

  } catch (error) {
    console.log(`Error: ${error.message}`)
  }
}

export default sendAPIRequest;
