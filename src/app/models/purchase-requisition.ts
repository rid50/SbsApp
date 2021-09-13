export interface PurchaseRequisition {
    contractId:string;
    supplierName:string;
    customerName:string;
    dateEntry:string;
    leadTime:number;
    partNo:string;
    partNoDescription:string
    itemId:number
    sumQuantity:number
    unitPrice:number
    totalPrice:number
}