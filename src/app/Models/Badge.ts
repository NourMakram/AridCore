export interface BadgeDetails{
 id: number,
  arBadgeName: string,
  enBadgeName: string,
  arBadgeDesc: string,
  enBadgeDesc: string,
  badgeLogo: string,
  emailContentId: number,
  emailContent: string,
  isVisible: boolean,
  certificateTemplateId: string,
   araCertificateTemplateId:string,
   araLetterTemplateId: string,
   enLetterTemplateId: string,
   certificateTemplateFolderId:number,
   language:number
 }

 export interface Badge{
     id: number,
      arBadgeName: string,
      enBadgeName: string,
      badgeLogo:string,
      usersCount:number
 }

  