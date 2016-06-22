import { Model } from "./DisplayModel";
import { MODELS } from './TestModelCollection';

let modelsPromise = Promise.resolve(MODELS);

import {Injectable, OnInit}    from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/toPromise';

@Injectable()
export class ModelService {
    // private modelsUrl = '/data/models.json';  // URL to web api
    // models: Array<Model>;
    // constructor(private http: Http) {

    constructor() {
    }

    getModels(): Promise<Model[]> {
        console.log("*************** PROMISING ***************");
        return modelsPromise;
    }
}
