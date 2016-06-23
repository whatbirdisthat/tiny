"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TestModelCollection_1 = require('./TestModelCollection');
var core_1 = require('@angular/core');
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
var ModelService = (function () {
    // constructor(private http: Http) {
    function ModelService() {
        this.models = TestModelCollection_1.MODELS;
    }
    ModelService.prototype.fakeGetModels = function () {
        return this.models;
    };
    // getModels(): Promise<Model[]> {
    ModelService.prototype.getModels = function () {
        console.log("*************** PROMISING ***************");
        return this.fakeGetModels();
        // return this.http.get(this.modelsUrl)
        //     .toPromise()
        //     .then(response => response.json().data)
        //     .catch(this.handleError);
    };
    ModelService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    ModelService = __decorate([
        core_1.Injectable()
    ], ModelService);
    return ModelService;
}());
exports.ModelService = ModelService;
