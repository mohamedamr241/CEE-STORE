export type user ={
    id:number,
    email:string,
    username:string,
    firstname:string,
    lastname:string,
    password:string,
    isadmin:boolean
}
export type userInfo={
    id?:number,
    username?:string,
    firstname?:string,
    lastname?:string,
    isadmin?:boolean,
    token?:string,
    refreshToke?:string,
    status:string
}
export type userData = {
    email:string,
    username:string,
    image:string
}