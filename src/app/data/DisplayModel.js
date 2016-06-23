"use strict";
var Description = (function () {
    function Description(title, byline, brief, details) {
        this.title = title;
        this.byline = byline;
        this.brief = brief;
        this.details = details;
    }
    return Description;
}());
exports.Description = Description;
var Model = (function () {
    function Model(name, image2d, image3d, description) {
        this.name = name;
        this.image2d = image2d;
        this.image3d = image3d;
        this.description = description;
    }
    return Model;
}());
exports.Model = Model;
