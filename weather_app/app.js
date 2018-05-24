const request = require('request');

request({
    url : 'https://maps.googleapis.com/maps/api/geocode/json?address=1445%20NE%20Brandi%20Way%20Pullman&key=AIzaSyBZ0YJSlZj0sA_dyzywGJ2WLfw_I3wOVa4',
    json : true,
},(error, response, body) => {
    // console.log(JSON.stringify(response, undefined, 2));
    console.log(`The current physical address is: ${body.results[0].formatted_address}`);
    console.log(body.results[0].geometry.location.lat);
    console.log(body.results[0].geometry.location.lng);
});