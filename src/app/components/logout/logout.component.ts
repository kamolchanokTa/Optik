import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgModel } from "@angular/forms";
import { PersistenceService, StorageType } from 'angular-persistence';
import { UserService, UserObject} from "../../services/user.service";
import { INotifyMessage } from "../../custom-elements/notifier/notifier.component";

@Component({
    selector: "#logout",
    templateUrl: "./logout.component.html"
})

export class LogoutComponent implements OnInit {
    loading = false;
    returnUrl: string;
	notifyMessages: INotifyMessage[];
	
    constructor(
        private router: Router,
        private userSvc: UserService,
        private persistenceService: PersistenceService) { }
 
    ngOnInit() {
        this.loading = true;
        this.notifyMessages = [];
        this.logoutObject();
    }
	
	logoutObject(){
		this.userSvc.clearItems();
        this.router.navigate(["/product-overview"]);
	}
}