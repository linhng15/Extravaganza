// Include the Axios library for HTTP requests
var axios = require("axios");

var path = require("path");

//SeatGeek Api url and key
var seatgeek_APIKey = {
  Url: 'https://api.seatgeek.com/2/',
  clientID: 'NzgxMzAwNHwxNDk3MjMzNzgyLjQ5',
  clientSecret: '78ae8e5daf3e418eb42b616061c3f99c64f855d01b9950c581b24933a8a2f019'
};

// https://api.seatgeek.com/2/events?postal_code=60602&range=12mi&datetime_local.gte=2017-07-01&datetime_local.lt=2017-10-01&taxonomies.id=2010000&client_id=YOUR_KEY

// Helper Functions
var helpers = {

  // This will run our query.
  getSeatgeekGenre: function(selectedOption, startDate, endDate) {
      
    let seatgeekUrl;

    switch(selectedOption) {
    case "music":
        seatgeekUrl = "https://api.seatgeek.com/2/events?&geoip=true&lat=41.8781&lon=87.6298&taxonomies.name=concert&client_id=NzgxMzAwNHwxNDk3MjMzNzgyLjQ5"
        break;
    case "sport":
         seatgeekUrl = "https://api.seatgeek.com/2/events?&geoip=true&lat=41.8781&lon=87.6298&taxonomies.name=sports&client_id=NzgxMzAwNHwxNDk3MjMzNzgyLjQ5"
        break;
    case "theater":
         seatgeekUrl = "https://api.seatgeek.com/2/events?&geoip=true&lat=41.8781&lon=87.6298&taxonomies.name=theater&client_id=NzgxMzAwNHwxNDk3MjMzNzgyLjQ5"
        break;
    default:
        seatgeekUrl = "https://api.seatgeek.com/2/events?&geoip=true&lat=41.8781&lon=87.6298&taxonomies.name=concert&client_id=NzgxMzAwNHwxNDk3MjMzNzgyLjQ5"
    }

    //https://api.seatgeek.com/2/venues?client_id=YOUR_CLIENT_ID&q=? this wil allow us to all endpoint
    //hardcoding chicago 
    return axios.get(seatgeekUrl + "&datetime_local.gte=" + startDate + "&datetime_local.lt=" + endDate)
      .then(function(results) {
        return results.data.events;
    })
  },
  getUserEvents: function(userMongoId) {
    return axios.get("/api/user/" + userMongoId).then(
      function(results) {
        return results;
      }
    );
  },
  getEventsById: function(eventId) {
    return axios.get("/api/events/" + eventId).then(
      function(results) {
        return results;
      }
    );
  },
  // will save events to the database
  postSaved: function(newEvent, user) {
    // console.log("postSaved axios results", newEvent);
    return axios.post("/api/events", newEvent);

  },

  getUser: function (id_token) {
     var url = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + id_token; 

    return axios.get(url);
  }, 

  saveUser: function(user) {
      
    return axios.post("/api/user", user);
  }, 

  saveEventToUser: function(userMongo, eventId) {
    var postObj = {
      userId: userMongo,
      event: eventId
    };

    return axios.post("/api/user/database", postObj); 
  }, 

  checkUser: function (email) {

    return axios.get("/api/email/" + email); 
  }

};




// We export the helpers function
module.exports = helpers;

