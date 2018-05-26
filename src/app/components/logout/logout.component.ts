import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgModel } from "@angular/forms";
import { PersistenceService, StorageType } from 'angular-persistence';
import { UserService, UserObject} from "../../services/user.service";
import { INotifyMessage } from "../../custom-elements/notifier/notifier.component";

@Component({
     selector: "#logout",
     templateUrl: "./logout.component.html",
    //styleUrls: ["./login.style.css"]
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
		const failToLogoutObjects = (error: any) => {
		    this.loading = false;
		    console.log("logout failure...");
		    this.notifyMessages.push({ type: "error", message: error.message || error || "Internal server error"  });
        };
        if(this.userSvc.loadUser != null){
            console.log("loadUser is not null...");
            this.userSvc.removeUser();    
        }
        this.router.navigate(['']);

	}
}