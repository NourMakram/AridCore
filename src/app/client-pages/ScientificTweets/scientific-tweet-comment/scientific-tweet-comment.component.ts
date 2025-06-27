import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenServiceService } from '../../../Services/token-service.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ScientificTweetServiceService } from '../../../Services/scientific-tweet-service.service';
import { Tweet } from '../../../Models/Tweet';
import { Reply } from '../../../Models/Reply';

@Component({
  selector: 'app-scientific-tweet-comment',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './scientific-tweet-comment.component.html',
  styleUrl: './scientific-tweet-comment.component.css'
})
export class ScientificTweetCommentComponent implements OnInit {
  CommentForm:FormGroup;
  userId:any;
constructor(private fb: FormBuilder,
    private TokenService:TokenServiceService,public dialogRef: MatDialogRef<ScientificTweetCommentComponent>,
 @Inject(MAT_DIALOG_DATA) public Data: {id:number},private ScientificTweetService:ScientificTweetServiceService){

this.userId = this.TokenService.GetUserId();
this.CommentForm = this.fb.group({
userId:[this.userId,Validators.required],
text:['',Validators.required],
tweetId:[this.Data.id,Validators.required],
url:['test']


});
 }
  ngOnInit(): void {
    if(this.Data.id > 0){
      this.getAll(this.Data.id);
    }
  }
//===================================================================================
NoClick(){
  this.dialogRef.close();
}


 //===================================================================================
 Replies:Reply[]=[];
 getAll(id:number){
this.ScientificTweetService.GetReplies(id).subscribe({
  next:(value)=>{
    this.Replies = value;
  }
})
 }

 //===================================================================================
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
 //===================================================================================
 Submit() {
    if (this.CommentForm.valid) {
      let Data = this.ConvertToFormData();
      this.ScientificTweetService.AddReply(Data).subscribe({
        next: () => {
          console.log("Success");
            this.getAll(this.Data.id);
             this.CommentForm.reset();
        }
      })
    }
  }
  //==============================================================================
  FileUrl: File | undefined = undefined;
  OnchangeFile(e: any) {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.FileUrl = input.files[0];
      console.log(this.FileUrl)
    }

  }
 //=====================================================================================
 ConvertToFormData(){
let formData = new FormData();
if(this.FileUrl != null){
formData.append('imagefile',this.FileUrl);

}
formData.append('tweetId',this.CommentForm.get('tweetId')?.value);
formData.append('text',this.CommentForm.get('text')?.value);
formData.append('url',this.CommentForm.get('text')?.value);

formData.append('userId',this.userId);

return formData;
 }
}
