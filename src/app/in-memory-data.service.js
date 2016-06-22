"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var models = [
            {
                name: "Product1",
                image2d: "P_ONE.svg",
                image3d: "P_ONE.svg",
                description: {
                    title: "Product One",
                    byline: "Not just any product.",
                    brief: "A simple paragraph. Not too many sentences, not too many syllables.",
                    details: "Lorum Ipsum"
                }
            },
            {
                name: "Product2",
                image2d: "P_ONE.svg",
                image3d: "P_ONE.svg",
                description: {
                    title: "Product Two",
                    byline: "Not like any other product.",
                    brief: "A simple paragraph. Worded differently from PRODUCT ONE.",
                    details: "Lorum Ipsum"
                }
            }
        ];
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
