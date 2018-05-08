import { Component, Input } from '@angular/core';

@Component({
    selector: 'loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.style.scss']
})
export class LoaderComponent {
    @Input() medium: boolean;
    @Input() small: boolean;

    constructor() {

    }
}