import {Component} from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: 'app/app.html'
})
export class AppComponent {

    homeLink:string;
    name1:string;
    name2:string;
    someText:string[];

    error:any;

    constructor() {
        this.homeLink = "HOME";
        this.name1 = 'Angle ONE';
        this.name2 = 'Angle TWO';
        this.someText = ['some text', 'some more text'];
    }

}
