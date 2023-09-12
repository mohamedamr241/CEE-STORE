export type order = {
    product_id?:number,
    quantity:number,
    user_id?:number,
    status:string
}
export type orders = {
    id:number,
    user_id:number,
    status:string,
    price:number
}
export type orderInfo = {
    name:string,
    price:number
    quantity:number,
    description:string,
    image:string,
    category:string,
    username:string,
    status:string
}

export type orderTest = {
    id:number,
    name:string,
    price:number
    description:string,
    image:string,
}