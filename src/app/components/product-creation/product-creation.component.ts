import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgModel } from "@angular/forms";

import { ProductService, ProductObject} from "../../services/product.service";
import { INotifyMessage } from "../../custom-elements/notifier/notifier.component";
import * as _ from "lodash";
@Component({
    selector: "#registeration",
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
    description: string
    imagepath: string
    ngOnInit() {
        this.loading = true;
        this.notifyMessages = [];
        debugger;
        this.route.snapshot.params['id'];
        console.log("id: " + this.productId);
    }

    constructor(private router: Router,
        private productSvc: ProductService,
        private route: ActivatedRoute
        ){
    }

    createProduct() {
        this.loading = true;
        // this.handleFileSelect(this.imagepath);
        let productObject: ProductObject = {
            name: this.name,
            productType: this.productType,
            image: this.image,
            price: this.price,
            description: this.description
        }
        debugger;
        const failToSaveObjects = (error: any) => {
            this.loading = false;
            this.notifyMessages.push({ type: "error", message: error.message || error || "Internal server error"  });
        };
        this.productSvc.saveProductObject(productObject)
            .then((result) => {
                this.loading = true;
                this.notifyMessages.push({ type: "confirm", message: "Successful create!! product "  });
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