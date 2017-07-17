var React = require("react");
var Link = require("react-router").Link;

// Include any grandchildren components here
var User_list = require("./grandchildren/User_list");
var Users_map = require("./grandchildren/Users_map");

// Include the helpers for making API calls to seatgeek API
// var helpers = require("../utils/helpers");

var Saved = React.createClass({
    
    render: function() {
        return (
            <div className="container">
                {/* include grandchild components here*/}
                <div className="row">
                    <User_list />
                </div>
                <div className="row">
                        <Users_map  />
                </div>
            </div>
        );
    }
});

module.exports = Saved;