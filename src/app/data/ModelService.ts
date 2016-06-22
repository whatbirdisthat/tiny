import { Model } from "./DisplayModel";
import { Models } from './TestModelCollection';

import { Injectable }    from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/toPromise';

@Injectable()
export class ModelService {
    // private modelsUrl = '/data/models.json';  // URL to web api

    models: Array<Model>;

    // constructor(private http: Http) {
    constructor() {
        this.models = Models;
    }

    fakeGetModels() : Array<Model> {
        return this.models;
    }

    // getModels(): Promise<Model[]> {
    getModels(): Array<Model> {
        console.log("*************** PROMISING ***************");

        return this.fakeGetModels();

        // return this.http.get(this.modelsUrl)
        //     .toPromise()
        //     .then(response => response.json().data)
        //     .catch(this.handleError);
    }
    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
