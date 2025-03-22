describe('expect function', () => {
    test('modifiers .not', () => {
        const person: string = 'Ridho'
        expect(person).not.toBe('Rdho')
    })

    test('modifiers .resolves', async () => {
        const myPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                if (true) {
                    resolve('Promise berhasil dipanggil')
                } 
                reject('Promise gagal dipanggil')
            }, 500)
        })
        await expect(Promise.resolve(myPromise)).resolves.toBe('Promise berhasil dipanggil')
    })

    test('modifiers .reject', async () => {
        await expect(Promise.reject(new Error('octopus'))).rejects.toThrow('octopus')
    })

    test('matcher .toBe(value)', () => {
        const name: string = 'ridho'
        expect(name).toBe('ridho')
    })

    test('matcher .toBeCloseTo(value)', () => {
        const num1: number = 0.2
        const num2: number = 0.1
        expect(num1 + num2).toBeCloseTo(0.3)
    })

    test('matcher .toHaveBeenCalled()', () => {
        const func = jest.fn()

        function greet(callback: (name: string) => void, name: string) {
            callback(name)
        }

        greet(func, 'Ridho')
        expect(func).toHaveBeenCalled()
    })

    test('matcher .toHaveBeenCalledTimes(number)', () => {
        const func = jest.fn()

        function greet(callback: (name: string) => void, name: string[]) {
            name.forEach(n => {
                callback(n)
            })
        }

        greet(func, ['ridho','irvan'])
        expect(func).toHaveBeenCalledTimes(2)
    })

    test('matcher .toHaveReturned()', () => {
        const greet = jest.fn((): string => 'Hello')
        greet()

        expect(greet).toHaveReturned()
    })

    test('matcher .toHaveReturnedTimes()', () => {
        const greet = jest.fn((): string => 'Hello')
        greet()
        greet()

        expect(greet).toHaveReturnedTimes(2) 
    })

    test('matcher .toHaveReturnedWith(value)', () => {
        const greet = jest.fn((): string => 'Hello')
        greet()

        expect(greet).toHaveReturnedWith('Hello')
    })

    test('matcher .toHaveLength(number)', () => {
        expect([1,2,3,4,5]).toHaveLength(5)
    })

    test('matcher .toBeDefined()', () => {
        const vars = 1
        expect(vars).toBeDefined()
    })

    test('matcher .toBeFalsy()', () => {
        expect(null).toBeFalsy()
    })

    test('matcher .toBeGreaterThan(number)', () => {
        expect(5).toBeGreaterThan(1)
    })

    test('matcher .toBeGreaterThanOrEqual(number)', () => {
        expect(5).toBeGreaterThanOrEqual(5)
    })

    test('matcher .toBeLessThan(number)', () => {
        expect(10).toBeLessThan(15)
    })

    test('matcher .toBeLessThanOrEqual', () => {
        expect(10).toBeLessThanOrEqual(10)
    })

    test('matcher .toBeNull()', () => {
        expect(null).toBeNull()
    })

    test('matcher .toBeTruthy', () => {
        expect(true).toBeTruthy()
    })

    test('matcher .toBeNaN', () => {
        expect(NaN).toBeNaN()
    })

    test('matcher .toContain(item)', () => {
        const arr: string[] = ['ridho','irvan']
        expect(arr).toContain('ridho')
    })    

    
})