module.exports = function(app){

    const axios = require('axios');

    //get the response from each website
    app.get('/checkResponse', doRequests);

    //get the response from each website
    async function doRequests(req,res) {

        let urls = [
            'https://www.citylinkexpress.com/calculator/',
            'https://www.jtexpress.my/shipping-rates'
        ];

        const fetchUrl = (url) => axios.get(url);
        const promises = urls.map(fetchUrl);
        try{
            let responses = await Promise.all(promises);
            responses.forEach(resp => {

                let msg = `${resp.config.url} -> ${resp.headers.server}: ${resp.status}`;
                console.log(msg);

            });

            res.status(200).send({
                status: "Response from Citylink and J&T are success",
                // message: msg
            });

        }catch (error) {
            console.log(error.response);
        
            return error.response;
        }

    }
}