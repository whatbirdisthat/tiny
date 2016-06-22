"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ModelService_1 = require("./data/ModelService");
var common_1 = require('@angular/common');
var AppComponent = (function () {
    function AppComponent(modelService) {
        this.modelService = modelService;
        this.homeLink = "HOME";
        this.name1 = 'Angle ONE';
        this.name2 = 'Angle TWO';
        this.someText = ['some text', 'some more text'];
    }
    AppComponent.prototype.getModels = function () {
        console.log('********* GETTING THE MODEL ***********');
        this.displayModels = this.modelService.getModels();
        // this.displayModels = this.modelService.getModels();
        // return this.modelService
        //     .getModels()
        //     .then(models => this.displayModels = models)
        //     .catch(error => this.error = error);
    };
    AppComponent.prototype.ngOnInit = function () {
        this.getModels();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            templateUrl: 'app/app.html',
            providers: [ModelService_1.ModelService],
            directives: [common_1.NgFor]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
