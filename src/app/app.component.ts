import {Component} from '@angular/core';
import {AboutComponent} from "./about/components/about.components";

import { RouterLink, RouterOutlet, RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
    directives : [ROUTER_DIRECTIVES, RouterOutlet, RouterLink],
    providers: [AboutComponent]
})

@RouteConfig([
    { path: '/about', component: TheAppComponent, name: 'About' }
])


export class TheAppComponent {
    name1: string;
    name2: string;
    someText: string[];
    constructor() {
        this.name1 = 'ONE';
        this.name2 = 'TWO';
        this.someText = ['some text', 'some more text'];
    }
}
