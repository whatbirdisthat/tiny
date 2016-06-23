import {Component, OnInit} from '@angular/core';
import {Model} from "./data/DisplayModel";
import {ModelService} from "./data/ModelService";

@Component({
    selector: 'models-list',
    templateUrl: 'app/models.html',
    providers: [ModelService]
})
export class ModelsList implements OnInit {

    displayModels:Model[];
    error:any;

    constructor(private modelService:ModelService) {
    }

    getModels() {

        console.log('********* GETTING THE MODEL ***********');

        this.modelService
            .getModels()
            .then(models => this.displayModels = models)
            .catch(error => this.error = error);
    }

    ngOnInit():any {
        this.getModels();
    }
}
