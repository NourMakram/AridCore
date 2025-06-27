import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterLink } from '@angular/router';
import { TokenServiceService } from '../../Services/token-service.service';
import { NotificationService } from '../../Services/notification.service';
import { Notification } from '../../Models/Notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [RouterLink,CommonModule,MatDialogModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  userId:any;
  count:number = 10;
constructor(private TokenService:TokenServiceService,private fb:FormBuilder
  ,private Router:Router,private notificationService:NotificationService,
public dialogRef: MatDialogRef<NotificationComponent>,
 @Inject(MAT_DIALOG_DATA) public Data: {unReadCount:number}
 
   ) {

this.userId = this.TokenService.GetUserId();
   if(this.userId != undefined){
    this.GetNotifications(this.userId,this.count);
   }
   }

   //============================================================================================
   notifications:Notification[]=[];
   GetNotifications(userId:string,count:number){
this.notificationService.GetAllToUser(userId,count).subscribe({
  next:(value)=>{
    this.notifications = value.data;
  }
})
   }
   //============================================================================================
   More(){
    this.count += this.count;
    this.GetNotifications(this.userId,this.count);
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
//===================================================================================================
Close(){
  this.dialogRef.close();
}

}
