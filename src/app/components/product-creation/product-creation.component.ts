import { Component, OnInit, NgModule } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder } from "@angular/forms";

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
    myform: FormGroup;

    //product parameters 
    productname: FormControl;
    productType: FormControl;
    image: string;
    price: FormControl;
    description: FormControl;
    imagepath: string;
    amount: FormControl;
    isAutorize: boolean;
    ngOnInit() {
        this.loading = true;
        this.notifyMessages = [];
        this.route.snapshot.params['id'];
        this.isAutorize = false;
        this.createFormControls();
        this.createForm();
        this.checkUser();
    }

    constructor(private router: Router,
        private productSvc: ProductService,
        private route: ActivatedRoute,
        public userService:UserService
        ){
    }

    createFormControls() { 
        this.productname = new FormControl('', Validators.required);
        this.productType = new FormControl('', Validators.required);
        this.description = new FormControl('', Validators.required)
        this.price = new FormControl(0, Validators.required);
        this.amount =new FormControl(0, Validators.required);
      }

      createForm() { 
        this.myform = new FormGroup({
          name: new FormGroup({
            productname: this.productname,
            productType: this.productType,
            description: this.description
          },  { updateOn: 'blur' } ),
          number: new FormGroup({
            price: this.price,
            amount: this.amount
          },  { updateOn: 'blur' } ),
        });
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
            name: this.productname.value,
            productType: this.productType.value,
            image: this.image,
            price: this.price.value,
            description: this.description.value,
            userid: this.userService.user.userid,
            amount: this.amount.value
        }
        const failToSaveObjects = (error: any) => {
            this.loading = false;
            this.notifyMessages.push({ type: "error", message: error.message || error || "Internal server error"  });
        };
        this.productSvc.saveProductObject(productObject)
            .then((result) => {
                this.loading = false;
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