describe('Enum', () => {
    it('should support in typescript', () => {
        enum CustomerType {
            REGULAR = "REGULAR",
            GOLD = "GOLD",
            PLATINUM = "PLATINUM"
        }
        
        type customer = {
            id: number,
            name: string,
            type: CustomerType
        }
        
        const customer: customer = {
            id: 1,
            name: 'Ridho Irvan Nurhidayat',
            type: CustomerType.REGULAR
        }
        console.info(customer)
    })
})