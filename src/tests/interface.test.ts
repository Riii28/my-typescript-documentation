describe('Interface', () => {
    it('should support function interface in typescript', () => {
        interface Sum {
            (value1: number, value2: number): number
        }

        const sum: Sum = (value1: number, value2: number): number => {
            return value1 + value2
        }

        expect(sum(2,3)).toBe(5)
    })

    it('should support indexable interface in typescript', () => {
        interface Arr {
            [index: number]: string
        }

        const arr: Arr = ['Ridho','Irvan','Nurhidayat']

        expect(arr[0]).toBe('Ridho')
    })

    it('should support indexable interface for non number in typescript', () => {
        interface Library {
            [key: string]: string
        }

        const library: Library = {
            name: 'Atomic Habits',
            no: '1'
        }

        expect(library['name']).toBe('Atomic Habits')
    })

    it('should support extending interface in typescript', () => {
        interface Employee {
            id: number,
            name: string,
            division: string
        }

        interface Manager extends Employee {
            numberOfEmployee: number
        }

        const employee: Employee = {
            id: 1,
            name: 'Ridho Irvan Nurhidayat',
            division: 'IT'
        }

        const manager: Manager = {
            id: 1,
            name: 'Amelia Ramadani',
            division: 'IT',
            numberOfEmployee: 100
        }

        console.table(employee)
        console.table(manager)
    })

    it('should support interface function in typescript', () => {
        interface Greeting {
            name: string,
            greet: (name: string) => string
        }

        const greeting: Greeting = {
            name: 'Ridho',
            greet: function(name: string): string  {
                return `Halo ${name} saya ${this.name}`
            }
        }

        expect(greeting.greet('Amelia')).toBe('Halo Amelia saya Ridho')
    })
})