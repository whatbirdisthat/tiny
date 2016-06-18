var $ = require('jquery');
module.exports = function (colour) {
    var theBody = $('body');
    console.log("BODY-COLOUR: " + theBody.style.backgroundColor);
    theBody.style.backgroundColor = colour;
};
