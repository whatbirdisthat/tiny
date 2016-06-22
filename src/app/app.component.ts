import {Component, OnInit} from '@angular/core';
import {Model} from "./data/DisplayModel";
import {ModelService} from "./data/ModelService";

@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
    providers: [ModelService]
})

export class AppComponent implements OnInit {
    homeLink:string;
    name1:string;
    name2:string;
    someText:string[];
    displayModels:Model[];

    error:any;

    constructor(private modelService: ModelService) {
        this.homeLink = "HOME";
        this.name1 = 'Angle ONE';
        this.name2 = 'Angle TWO';
        this.someText = ['some text', 'some more text'];
    }

    getModels() {
        this.modelService
            .getModels()
            .then(models => this.displayModels = models)
            .catch(error => this.error = error);
    }

    ngOnInit():any {
        this.getModels();
    }
}
