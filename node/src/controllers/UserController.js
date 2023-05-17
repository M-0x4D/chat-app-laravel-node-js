const https = require('https')


function adel(params) {
    
    return params;
}


function callApiService(params) {
    
    //! call api 

    https.get('https://api.publicapis.org/entries', (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
        //   console.log(data)
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        console.log(data[0]);
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
}

module.exports = {
    adel , callApiService
}