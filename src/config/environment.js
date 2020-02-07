const environment = 'development';

export default {
    development: {
        API_URL: 'http://192.168.0.130:3001',
    },
    production: {
        API_URL: 'https://maspu-app.herokuapp.com',
    },
}[environment];
