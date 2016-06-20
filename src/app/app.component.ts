import {Component, OnInit} from '@angular/core';
import {AboutComponent} from "./about/components/about.components";

import {Routes, RouterLink, RouterOutlet, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'app',
    templateUrl: 'app/app.html',
    directives : [AboutComponent, RouterLink, RouterOutlet, ROUTER_DIRECTIVES]
})

@Routes([
    {path: '/about', component: AboutComponent}
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
