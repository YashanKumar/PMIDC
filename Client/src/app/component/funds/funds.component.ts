import { Component } from '@angular/core';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { FundsModel } from './funds.model';
import { FundsService } from './funds.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})
export class FundsComponent {

  FundDetails: any[] = [];
  lastUsedId: number = 0; 
  Funds: any;
  currentFundId: number | null = null;
  formValue !: FormGroup;
  fundsModelObj : FundsModel = new FundsModel();
  refreshPage: any;
  router: any;
  row: any;

  constructor (private FormBuilder: FormBuilder,
    private api :FundsService,
    private toastr: ToastrService) { }
   
  ngOnInit(): void {
    this.getFundDetails();
    this.formValue = this.FormBuilder.group({
      id:[0],
      Funds : ['', [Validators.required, Validators.maxLength(150)]],
    })    

  }
  
  postFundDetails(){
    debugger
    const funds = this.formValue.value.Funds; 


    // const duplicate = this.FundDetails?.some(f => f.funds?.toLowerCase() === funds.toLowerCase());

    // if (duplicate) {
    //   alert("Country already exists");
    //   return;
    // }
    

    this.fundsModelObj.id = ++this.lastUsedId;
    this.fundsModelObj.Funds = this.formValue.value.Funds;
    const fnds = this.fundsModelObj.Funds ;

    if( fnds === null || fnds === 0)
      {
           this.toastr.warning("Please Enter Amount");
      }

    else{this.api.postFunds(this.fundsModelObj)
    .subscribe(res=>{
      console.log(res);
      if(this.fundsModelObj.Funds==0 || this.fundsModelObj.Funds === null){}
      else{
      this.toastr.success("Funds Added Successfully")
      this.getFundDetails()
      this.formValue.reset()
    }
    },
    err=>{
      this.toastr.error("something went wrong")
    })}
  }

onSubmit(obj :any){
  debugger
  const id = this.formValue.value.id;
  if(id==0|| id==null) 
    {
      this.postFundDetails();
    }
    else{
      //this.editCountry(this.currentCountryId);
      this.updateFunds(obj);
      this.toastr.success("Fund Updated Successfully");
      this.getFundDetails();
      this.resetForm();
      obj.id=0;
      
    }
    // this.formValue.reset();
}
  // cancel() {
  //   const countryNameInput = document.getElementById('countryName') as HTMLInputElement;
  //   countryNameInput.value = '';
  //   this.router.navigate(['/dashboard']); // Redirect to '/dashboard' route
  // }
  resetForm() {
    this.formValue.reset();
    this.currentFundId = 0;
    this.formValue.value.id=0;
    this.formValue.value.Funds="";
  }

  getFundDetails() {
    this.api.getFunds()
      .subscribe((res: any) => { 
        const maxId = Math.max(...res.map((item: any) => item.id));
        // Update lastUsedId to ensure generated IDs are unique
        this.lastUsedId = maxId > 0 ? maxId : 0;
        this.FundDetails = res;
        console.log(this.FundDetails)
      });
  }

  deleteFunds(id: number) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            this.api.deleteFunds(id)
                .subscribe(
                    (res: any) => {
                        this.toastr.success("Funds Deleted Successfully");
                        this.FundDetails = this.FundDetails.filter((funds: any) => funds.id !== id);
                    },
                    (error: any) => {
                        this.toastr.error("Cannot delete these funds. An error occurred.");
                    }
                );
        }
    });
}


  updateFunds(obj:any) {
    debugger;
    const funds = this.formValue.value.Funds.trim(); // Trim spaces
  
    // Check for duplicate country names, excluding the current country being edited
    const duplicate = this.FundDetails?.some(f => f.Funds?.toLowerCase() === funds.toLowerCase() && f.id !== this.currentFundId);
  
    if (duplicate) {
      this.toastr.error("Fund already exists");
      return;
    }
  
    if (this.currentFundId !== null) {
      this.fundsModelObj.Funds = funds; // Use trimmed value
      this.fundsModelObj.id = this.currentFundId;
  
      this.api.updateFunds(obj)
        .subscribe(res => {
          //console.log(res);
          this.formValue.value.id=0;
        
        },
        err => {
          this.toastr.error("Something went wrong");
        });
    } else {
      this.toastr.error("Invalid Fund ID");
    }
  }

  editFunds(id: any){
    // debugger;
    // Call the API to get the details of the state with the provided ID
    this.api.getDetailFunds(id).subscribe(
      (funds: any) => {
        console.log("Fund", funds);
  
        // Populate the form with the retrieved state data
        this.formValue.patchValue({
          Funds: funds[0].funds,
          id: funds[0].id
        });
        
        this.currentFundId = id;
       
        // Update the stateModelObj with the correct state name
        this.fundsModelObj.Funds = funds;
        // this.currentCountryId = id;
      },
      (error: any) => {
        console.error("Error fetching Fund details:", error);
      }
    );
  }

  fetchFundById(id: number) {
    debugger;
    this.api.getDetailFunds(id).subscribe(
      (funds: any) => {
        console.log("Funds Fetched.", funds);

        this.formValue.patchValue({
          Funds: funds[0].Funds
        });
        // Handle the fetched country details here
      },
      (error: any) => {
        console.error("Error fetching Funds by ID:", error);
      }
    );
  }
}
