export interface Message{
     id :number,
 fromUserImage:string,
 fromUserName:string,
  toUserName:string,
toUserImage:string,
 filePath:string,
 subject:string,
 message:string,
dateOfRecord:string,
  isRead: boolean

}

export interface MessageDetails{
  id: number,
  fromUserName: string,
  fromUserImage: string,
  toUserName: string,
  toUserImage: string,
  subject: string,
  message: string,
  filePath: string,
  dateOfRecord: string,
  isRead: boolean
}
export interface MessageReply{
     id :string,
 fromUserImage :string,
 fromUserName :string,
 filePath:string,
 message:string,
 dateOfRecord :string,
 isRead:boolean
}
