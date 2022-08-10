module.exports = function (app){
    const https = require('https');
    const axios = require('axios');


    //List of APIs
    app.post ('/sendCitylink', doPostRequestCityLink);

    app.post ('/sendJnt', doPostJntRequest);

    function doPostRequestCityLink(req,res){

        var origin_country = req.body.origin_country;
        var origin_state = req.body.origin_state;
        var origin_postcode = req.body.origin_postcode;
        var destination_country = req.body.destination_country;
        var destination_state = req.body.destination_state;
        var destination_postcode = req.body.destination_postcode;
        var length = req.body.length;
        var width = req.body.width;
        var height = req.body.height;
        var selected_type = req.body.selected_type;
        var parcel_weight = req.body.parcel_weight;
        var document_weight = req.body.document_weight;



        var data = JSON.stringify({
            "origin_country": origin_country,
            "origin_state": origin_state,
            "origin_postcode": origin_postcode,
            "destination_country": destination_country,
            "destination_state": destination_state,
            "destination_postcode": destination_postcode,
            "length": length,
            "width": width,
            "height": height,
            "selected_type": selected_type,
            "parcel_weight": parcel_weight,
            "document_weight": document_weight
          });
          
          var config = {
            method: 'post',
            url: 'https://www.citylinkexpress.com/wp-json/wp/v2/getShippingRate',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data.req.data.rate));
            res.status(200).send({
                'Rate': response.data.req.data.rate,
                'Courier': 'Citylink'
            });
            // res.send(dataJson.req.rate);
          })
          .catch(function (error) {
            console.log(error);
            res.status(401).send({
                msg: 'Error'
            })
          })
    }


    function doPostJntRequest(req,res){

        var shipping_rates_type = req.body.shipping_rates_type;
        var sender_postcode = req.body.sender_postcode;
        var receiver_postcode = req.body.receiver_postcode;
        var destination_country = req.body.destination_country;
        var shipping_type = req.body.shipping_type;
        var weight = req.body.weight;
        var length = req.body.length;
        var width = req.body.width;
        var height = req.body.height;
        var item_value = req.body.item_value;
        const token = req.get('Authorization');


        var data = JSON.stringify({
            "shipping_rates_type": shipping_rates_type,
            "sender_postcode": sender_postcode,
            "receiver_postcode": receiver_postcode,
            "destination_country": destination_country,
            "shipping_type": shipping_type,
            "weight": weight,
            "length": length,
            "width": width,
            "height": height,
            "item_value": item_value
          });
          
          var config = {
            method: 'post',
            url: 'https://www.jtexpress.my/shipping-rates',
            headers: { 
                'Authorization': 'Bearer' + token,
                'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            res.status(200).send({
                msg: 'Success',
            })
          })
          .catch(function (error) {
            console.log(error);
            res.status(401).send({
                msg: 'Error'
            })
          })
    }


}