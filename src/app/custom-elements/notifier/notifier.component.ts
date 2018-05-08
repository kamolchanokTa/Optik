import {
    Component,
    Input,
    DoCheck,
    IterableDifferFactory,
    IterableDiffers,
    IterableDiffer,
    ElementRef,
    Renderer,
    ViewChild
}
from "@angular/core";

import {
    Router
}
from "@angular/router";
export interface INotifyMessage {
    type: string;
    message: string;
    timeout ? : number;
}

@Component({
        selector: "notifier",
        templateUrl: "./notifier.component.html",
        styleUrls: ["./notifier.style.scss"]
})
export class NotifierComponent implements DoCheck {
    @Input() messages: INotifyMessage[];
    @Input() duration: number;
    @ViewChild("notifyBlock") notifier: ElementRef;
    differ: IterableDiffer<INotifyMessage>;
    ngDoCheck() {
        let changes = this.differ.diff(this.messages);
        if (changes) {
            changes.forEachAddedItem(r => setTimeout(() => this.close(r.item), r.item.timeout ? r.item.timeout * 1000 : 10000));
        }
    }
    constructor(private differs: IterableDiffers, public el: ElementRef, public renderer: Renderer, private router: Router) {
        this.differ = differs.find([]).create(null);
    }
    animationDone(msg: INotifyMessage) {
        if (msg.type !== "error") {
            if (msg.timeout) {
                let time = (msg.timeout - 0.70).toString().concat("s");
                this.renderer.setElementStyle(this.notifier.nativeElement, "animation-delay", time);
            } else {
                this.renderer.setElementStyle(this.notifier.nativeElement, "animation-delay", "9.30s");
            }
            this.renderer.setElementClass(this.notifier.nativeElement, "notificationItemRemoved", true);
            this.renderer.setElementClass(this.notifier.nativeElement, "notificationItemRemoved", true);
        }
    }
    close(msg: INotifyMessage) {
        if (msg.type !== "error") {
            this.closeManually(msg);
        }
        if (msg.timeout) {
            this.router.navigate(["/"]);
        }
    }
    closeManually(msg: INotifyMessage) {
        this.messages.splice(this.messages.indexOf(msg), 1);
    }
}