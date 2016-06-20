import {bootstrap}    from '@angular/platform-browser-dynamic';

import {provide} from "@angular/core";
import {LocationStrategy, HashLocationStrategy, PathLocationStrategy} from "@angular/common";
import {ROUTER_PROVIDERS} from "@angular/router";

import {TheAppComponent} from './app.component';

// bootstrap(TheAppComponent);
bootstrap(TheAppComponent, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy})
]);
