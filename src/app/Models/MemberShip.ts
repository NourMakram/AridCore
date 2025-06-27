export interface MemberShip{
    id:string,
    membershipType:any,
    CreationDate:string,
    dueDate:string,
    applicationUserId:string,   
    status :boolean
}

export interface MemberShipData{
    id :string,
    membershipType :string,
    applicationUserId :string,
    applicationUserName:string,
    creationDate :string,
    dueDate :string,
    status :string
}