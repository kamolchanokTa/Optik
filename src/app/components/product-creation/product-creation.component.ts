import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgModel } from "@angular/forms";

import { ProductService, ProductObject} from "../../services/product.service";
import { UserService} from "../../services/user.service";
import { INotifyMessage } from "../../custom-elements/notifier/notifier.component";
import * as _ from "lodash";
@Component({
    selector: "#product-create",
    templateUrl: "./product-creation.component.html",
    // styleUrls: ["./registeration.style.css"]
})

export class ProductCreationComponent implements OnInit {
    // private fields
    loading: boolean;
    notifyMessages: INotifyMessage[];
    productId: string = this.route.snapshot.params['id'];

    //product parameters 
    name: string;
    productType: string;
    image: string;
    price: number;
    description: string;
    imagepath: string;
    amount: number;
    isAutorize: boolean;
    ngOnInit() {
        this.loading = true;
        this.notifyMessages = [];
        this.route.snapshot.params['id'];
        this.isAutorize = false;
        this.checkUser();
    }

    constructor(private router: Router,
        private productSvc: ProductService,
        private route: ActivatedRoute,
        public userService:UserService
        ){
    }
    checkUser(){
        const failToGetObjects = (error: any) => {
            this.loading = false;
            this.isAutorize = false;
            this.notifyMessages.push({ type: "error", message: error.message || error || "Internal server error"  });
        };
        if(this.userService.user.userid != null){
            this.userService.searchUserbyID()
            .then((result) => {
                this.loading = false;
                if(result.data.userType != "0"){
                    this.notifyMessages.push({ type: "error", message: "Unautherized user"  });
                    this.isAutorize = false;
                }
                else{
                    this.loading = false;
                    this.isAutorize = true;
                }
                
            }, failToGetObjects);
        }
        else{
            this.loading = false;
            this.notifyMessages.push({ type: "error", message: "There is no user login user"  });
            this.isAutorize = false;
        }
    }

    createProduct() {
        this.loading = true;
        // this.handleFileSelect(this.imagepath);
        let productObject: ProductObject = {
            name: this.name,
            productType: this.productType,
            image: this.image,
            price: this.price,
            description: this.description,
            userid: this.userService.user.userid,
            amount: this.amount
        }
        const failToSaveObjects = (error: any) => {
            this.loading = false;
            this.notifyMessages.push({ type: "error", message: error.message || error || "Internal server error"  });
        };
        this.productSvc.saveProductObject(productObject)
            .then((result) => {
                if(result.status =="success") {
                    this.notifyMessages.push({ type: "confirm", message: "Successful create!! product "  });
                } else {
                    this.notifyMessages.push({ type: "error", message: result.message || result || "Internal server error"  });
                }
                
            }, failToSaveObjects);
                
    }

    handleFileSelect(evt){
        var files = evt.target.files;
      var file = files[0];
      
      if (file) {
          var reader = new FileReader();
  
          reader.onload =this._handleReaderLoaded.bind(this);
  
          reader.readAsBinaryString(file);
      }
    }
    
    _handleReaderLoaded(readerEvt) {
       var binaryString = readerEvt.target.result;
       this.image= btoa(binaryString);
    }
}