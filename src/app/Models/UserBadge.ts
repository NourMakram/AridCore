export interface UserBadge{
    id:number,
    badgeName:string,
    badgeImage:string,
    userName :string,
    dateofGrant :string,
    dateofRequest :string,
    disabled :boolean,
    isGranted :boolean,
    isVisible:boolean,
    isRejected: boolean,

}
export interface UserBadgeDetails{
    id: number,
    userId: string,
    badgeId: number,
    dateofRequest: string,
    dateofGrant: string,
    isRejected: boolean,
    rejectCount: number,
    rejectReason: string,
    isGranted: boolean,
    isVisible: boolean,
    disabled: boolean
}