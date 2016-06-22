import {Component, OnInit} from '@angular/core';
import {Model} from "./data/DisplayModel";
import {ModelService} from "./data/ModelService";

@Component({
    selector: 'models-list',
    template: `<ul class="well">
<li template="ngFor #model of displayModels">
<div class="container table">
    <div class="row">
        <h1> {{ model.description.title }} </h1>
    </div>
    <div class="row">
        <pre>{{ model.description.byline }}</pre>
    </div>
</div>
</li>
    </ul>
`,
//     template: `<ul class="well">
// <template ngfor let-model="$implicit" ngForOf="displayModels">
//         <li>
//             <div class="container table">
//                 <div class="row">
//                     <h1> {{ model.description.title }} </h1>
//                 </div>
//                 <div class="row">
//                     <pre>{{ model.description.byline }}</pre>
//                 </div>
//             </div>
//         </li>
// </template>
//     </ul>
// `,
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
