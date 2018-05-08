import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//import custom elements
import { LoaderComponent } from './loader/loader.component';
import { NotifierComponent } from './notifier/notifier.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LoaderComponent, NotifierComponent
    ],
    exports: [
        CommonModule, LoaderComponent, NotifierComponent
    ]
})
export class CustomElementModule { }