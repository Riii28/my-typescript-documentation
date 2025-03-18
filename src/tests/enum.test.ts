import { customer, CustomerType } from "../types/enum"

describe('Enum', () => {
    it('should support in typescript', () => {
        const customer: customer = {
            id: 1,
            name: 'Ridho Irvan Nurhidayat',
            type: CustomerType.REGULAR
        }
        console.info(customer)
    })
})