const request = require('supertest');
// app is supposed to point to the app.js file
const app = require('../app');
const should = require('should');
const expect = require('chai').expect;

// describe('Testing POSTS/Citylink endpoint', function () {
//     it('respond with valid HTTP status code and description and message', function (done) {
//       // Make POST Request
//       const response = request(app).post('/sendCitylink').send({
//         origin_country: "MY",
//         origin_state: "Selangor",
//         origin_postcode: "45400",
//         destination_country: "JP",
//         destination_state: "Japan",
//         destination_postcode: "5000",
//         length: 30,
//         width: 32,
//         height: 10,
//         selected_type: 1,
//         parcel_weight: 2,
//         document_weight: ""
//       });

//       // Compare response with expectations
//       expect(response.status).to.be(200);
//       expect(response.body.status).to.be('success');
//       expect(response.body.message).to.be('Citylink Saved Successfully.');
//     });
//     done();
// });

describe('POST /sendCitylink', function() {
    it('respond with valid HTTP status code and description and message"', function(done) {
      request(app)
        .post('/sendCitylink')
        .send(({
                origin_country: "MY",
                origin_state: "Selangor",
                origin_postcode: "45400",
                destination_country: "JP",
                destination_state: "Japan",
                destination_postcode: "5000",
                length: 30,
                width: 32,
                height: 10,
                selected_type: 1,
                parcel_weight: 2,
                document_weight: ""
        }))
        .set('Accept', 'application/json')
        .expect(function(res) {
            res.body.origin_country = res.body.origin_country,
            res.body.origin_state= res.body.origin_state,
            res.body.origin_postcode= res.body.origin_postcode,
            res.body.destination_country= res.body.destination_country,
            res.body.destination_state= res.body.destination_state,
            res.body.destination_postcode= res.body.destination_postcode,
            res.body.length= res.body.length,
            res.body.width= res.body.width,
            res.body.height= res.body.height,
            res.body.selected_type= res.body.selected_type,
            res.body.parcel_weight= res.body.parcel_weight,
            res.body.document_weight= res.body.document_weight
        })
        .expect(200, done);
    });
  });