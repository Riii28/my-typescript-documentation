export enum CustomerType {
    REGULAR = "REGULAR",
    GOLD = "GOLD",
    PLATINUM = "PLATINUM"
}

export type customer = {
    id: number,
    name: string,
    type: CustomerType
}