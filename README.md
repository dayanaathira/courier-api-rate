# courier-api-rate
## First Assessment for TM Interview
### API call another API for shipping rate

***How this API works?***
- Using axios npm to make request into the endpoints.
- Using api cache to received response faster if the response same as previous
- Using swagger-ui in yaml file (This file is inside folder swagger)
- Dockerize on port 3000 [container node-app]
- Using helmet npm for API security
- All logs will be inside logs -> access.log. Using winston and morgan
  - Logs will return level of error and error mesage.
 
 ***To run the program***
 1. npm install
 2. npm start / nodemon start
 
 
 ***For testing***
 1. npm test.
 - Testing file is inside folder test -> testing.js
 - Testing is using supertest and chai.
 - Testing the post request for the /sendCitylink
 
 ***Using swagger***
 <sub>To use the swagger simply fill the data as example below: </sub>
 
 *For selected_type you can choose between 1 and 2*
 
     1 - Parcel package 
     2 - Document type 
    
*For destination_postcode you can use 5000 for outside Malaysia*

 ```
 {
  "origin_country": "MY",
  "origin_state": "Selangor",
  "origin_postcode": "45400",
  "destination_country": "JP",
  "destination_state": "Japan",
  "destination_postcode": 5000,
  "length": 30,
  "width": 33,
  "height": 10,
  "selected_type": "1",
  "parcel_weight": "2",
  "document_weight": ""
}
 ```
 
*I am still trying to figure out the JnT endpoint as they need the csrf token, I will keep updatig the code and might add another courier. This is such a good experience in developing Node JS Rest API. Thank you for the opportunity.*
