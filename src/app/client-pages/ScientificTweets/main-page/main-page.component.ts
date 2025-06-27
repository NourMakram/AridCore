import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScientificTweetCommentComponent } from '../scientific-tweet-comment/scientific-tweet-comment.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddProfileLinksComponent } from '../../ProfileLink/add-profile-links/add-profile-links.component';
import { Tweet } from '../../../Models/Tweet';
import { ScientificTweetServiceService } from '../../../Services/scientific-tweet-service.service';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenServiceService } from '../../../Services/token-service.service';
import { AuthService } from '../../../Services/auth.service';
import { userModel2 } from '../../../Models/UserModel';
import { CalendarEvent } from '../../../Models/CalendarEvent';
import { CalendarEventService } from '../../../Services/calendar-event.service';
import { LayoutAdsService } from '../../../Services/layout-ads.service';
import { LayoutAds } from '../../../Models/layoutAds';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, CommonModule, MatDialogModule,ReactiveFormsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent implements OnInit {
  Tweets: Tweet[] = [];
  page: number = 1;
  pageSize: number = 10;
  hasPrev: boolean = false;
  hasnext: boolean = false;
  PageCounts: number = 0;
  total: number = 0;
  ScientificTweetForm: FormGroup;
  AddLikeForm:FormGroup ;
  userId: any;
  constructor(private fb: FormBuilder, private dialog: MatDialog,private AuthService:AuthService,
    private calendarEventService:CalendarEventService,private layoutService:LayoutAdsService,
    private ScientificTweetService: ScientificTweetServiceService, private TokenService: TokenServiceService) {

    this.userId = this.TokenService.GetUserId();

    this.ScientificTweetForm = this.fb.group({
      Content: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(280)]]
    });

    this.AddLikeForm = this.fb.group({
      userId:['',Validators.required],
    tweetId:['',Validators.required],
    })
  }

  //==================================================================================
  ngOnInit(): void {
    if(this.userId != undefined){
      this.GetAll(this.userId);
        this.GetUser(this.userId);
        this.GetLayoutAds();
        this.GetLastEvents();
    }
  }
  //==================================================================================
  Submit() {
    if (this.ScientificTweetForm.valid) {
      let Data = this.ConvertToFormData();
      this.ScientificTweetService.Create(Data).subscribe({
        next: () => {
          console.log("Success");
            this.GetAll(this.userId);
            this.imagePreview = null ;
            this.ScientificTweetForm.reset();
        }
      })
    }
  }
  //=================================================================================
  ConvertToFormData() {
    let formData = new FormData();
    formData.append('content', this.ScientificTweetForm.get('Content')?.value);
    formData.append('applicationUserId', this.userId);

    if (this.FileUrl != null) {
      formData.append('imagePath1', this.FileUrl);

    }
    return formData;

  }

  //==================================================================================
  GetAll(userId:string) {

    this.ScientificTweetService.GetAll(userId,this.page, this.pageSize, "")
      .subscribe({
        next: (value) => {
          this.Tweets = value.data;
          this.page = value.currentPage;
          this.pageSize = value.pageSize;
          this.PageCounts = value.totalPages;
          this.total = value.totalCount;
          this.hasPrev = value.hasPreviousPage;
          this.hasnext = value.hasNextPage;
        }
      })
  }
  //==================================================================================
  onPageChange(event: PageEvent) {

    if ((event.pageIndex + 1) <= this.PageCounts) {
      this.page = event.pageIndex + 1;

      this.pageSize = event.pageSize;

      this.GetAll(this.userId);

    }
  }
  //==================================================================================
   User:userModel2 = {} as userModel2;
  GetUser(userId:string){
    this.AuthService.GetUserInfo(userId).subscribe({
      next:(value)=>{
        this.User = value;
      }
      ,
      error:(error)=>{
        console.log(error)
      }
    })
  }

  //==================================================================================
  imagePreview: string | null = null;
  FileUrl: any;
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    this.FileUrl = file;
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
  //===================================================================================================

  removeImage(): void {
    this.imagePreview = null;
    this.FileUrl = null;
    const fileInput = document.querySelector<HTMLInputElement>('#fileInput');
    if (fileInput) {
      fileInput.value = '';
    }
  }
  //===================================================================================================
  openCommentDialog(id:number) {
    const dialogRef = this.dialog.open(ScientificTweetCommentComponent, {
      width: '560px',
      data: {id:id}
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result)

      if (result == true) {


      }


    }

    );

  }

  //===================================================================================================
  ToggleLike(id:number,isLike:boolean){
      if(isLike){
        this.RemoveLike(this.userId,id);
      }
      else{
        this.AddLike(this.userId,id)
      }
  }
//===================================================================================================
  AddLike(userId:string,id:number){

  this.AddLikeForm = this.fb.group({
    userId:userId,
    tweetId:id
  });

  if(this.AddLikeForm.valid){
     this.ScientificTweetService.AddLike(this.AddLikeForm.value).subscribe({
    next:(value)=>{
      console.log("success1")
      this.GetAll(this.userId);
    }
  })
  }
 
  }
  //==================================================================================================
  RemoveLike(userId:string,tweetId:number){
  this.ScientificTweetService.RemoveLike(tweetId,userId).subscribe({
    next:(value)=>{
            console.log("success2")

      this.GetAll(this.userId);
    }
  })
 }
//==================================================================================================
 getTimeAgo(publishDate: string): string {
  const now = new Date(); // الوقت الحالي
  const postDate = new Date(publishDate); // تحويل التاريخ المخزن كـ DateTime إلى كائن Date
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000); // الفرق بالثواني
  
  // حساب الفروقات بوحدات مختلفة
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / (3600 * 24));
  const weeks = Math.floor(diffInSeconds / (3600 * 24 * 7));
  
  // تحويل الوقت المنقضي إلى صيغة مفهومة
  if (minutes < 1) {
    return 'الان';
  } else if (minutes < 60) {
    return `منذ ${minutes} دقيقة${minutes > 1 ? '' : ''}`;
  } else if (hours < 24) {
    return `منذ ${hours} ساعة${hours > 1 ? '' : ''}`;
  } else if (days < 7) {
    return `منذ ${days} يوم${days > 1 ? '' : ''}`;
  } else if (weeks < 4) {
    return `منذ ${weeks} أسبوع${weeks > 1 ? '' : ''}`;
  } else {
    return postDate.toLocaleDateString(); // عرض التاريخ الكامل إذا كان قد مر عليه أكثر من شهر
  }
}

//============================================================================
  GetPrev(){
    if(this.hasPrev&& this.page > 1){
      this.page -= 1 ;
      this.GetAll(this.userId);
    }
  }

  //===============================================================================
  GetNext(){
    if(this.hasnext){
      this.page += 1 ;
      this.GetAll(this.userId);
    }
  }
  //==============================================================================
  GetByPage(page:number){
    if(this.PageCounts >= page){
     this.page = page ;
    this.GetAll(this.userId);



    }
  }
  //========================================================================
  get GetPagesArray(){
    let pages =new Array();
    for (let i: number = 1;i <= this.PageCounts;i++) {
      pages.push(i);
    }
    return pages;
  }

  //===================================================================================
  Events:CalendarEvent[]=[];
  GetLastEvents(){
    this.calendarEventService.Gettop5().subscribe({
      next:(value)=> {
        this.Events = value;
      },
    });
  }
  //===================================================================================
  LayoutAds:LayoutAds[]=[];
  GetLayoutAds(){
    this.layoutService.GetByPostion(2).subscribe({
      next:(value)=> {
        this.LayoutAds = value;
      },
    });
  }
}


