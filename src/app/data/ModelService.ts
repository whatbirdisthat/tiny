import {Model} from "./DisplayModel";
import { Injectable }    from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ModelService {
    private modelsUrl = '/data/models.json';  // URL to web api

    constructor(private http: Http) { }

    getModels(): Promise<Model[]> {
        return this.http.get(this.modelsUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }
    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}