import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrowdFundingMilestoneService } from '../../../Services/crowd-funding-milestone.service';
import { TokenServiceService } from '../../../Services/token-service.service';
import { Router, RouterLink } from '@angular/router';
import { GenaricModel } from '../../../Models/GenaricModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-crowd-funding-milestone',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './edit-crowd-funding-milestone.component.html',
  styleUrl: './edit-crowd-funding-milestone.component.css'
})
export class EditCrowdFundingMilestoneComponent {
  CrowdFundingMilestoneForm: FormGroup;
  userId: any;
  RoleName: any;
  constructor(private TokenService: TokenServiceService, private fb: FormBuilder
    , private Router: Router, private crowdFundingMilestoneService: CrowdFundingMilestoneService
    , public dialogRef: MatDialogRef<EditCrowdFundingMilestoneComponent>,
    @Inject(MAT_DIALOG_DATA) public Data: { projectId: number, id: number }

  ) {

    this.userId = this.TokenService.GetUserId();
    this.RoleName = this.TokenService.GetRole();

    this.CrowdFundingMilestoneForm = fb.group({
      id:[this.Data.id,Validators.required],
      crowdFundingId: [this.Data.projectId, Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      requestedPurpose: ['', Validators.required],
      status: ['']

    });

    if (this.Data.id > 0) {
      this.Get(this.Data.id);
    }
    this.GetCrowdFundingMileStoneStatus();
  }

  //====================================================================================================
  Submit() {
    if (this.CrowdFundingMilestoneForm.valid) {
      this.crowdFundingMilestoneService.Edit(this.Data.id,this.CrowdFundingMilestoneForm?.value)
        .subscribe({
          next: (value) => {
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.dialogRef.close(false);
          }
        })
    }
    else {
      Object.keys(this.CrowdFundingMilestoneForm.controls).forEach(field => {
        const control = this.CrowdFundingMilestoneForm.controls[field];
        control.markAsTouched({ onlySelf: true });
      });
    }

  }
  //==================================================================================================
  onNoClick(): void {
    this.dialogRef.close();
  }
  //================================================================================================
  CrowdFundingMileStoneStatus: GenaricModel[] = [];
  GetCrowdFundingMileStoneStatus() {
    this.crowdFundingMilestoneService.CrowdFundingMileStoneStatus().subscribe({
      next: (value) => {
        this.CrowdFundingMileStoneStatus = value;
      }
    })
  }
  //================================================================================================
  Get(id: number) {
    this.crowdFundingMilestoneService.Get(id).subscribe({
      next: (value) => {
        this.CrowdFundingMilestoneForm.patchValue({
          id: value.id,
          crowdFundingId: value.crowdFundingId,
          amount: value.amount,
          status: value.status,
          requestedPurpose: value.requestedPurpose
        });
      }
    })
  }
  //================================================================================================
  GoBack() {

    if (this.RoleName != null) {

      if (this.RoleName == "Member") {

        this.Router.navigateByUrl("clientPage/CrowdFunding");

      }
      else if (this.RoleName == "Admin") {

        this.Router.navigateByUrl("userPage/CrowdFunding");

      }
    }
  }
}



