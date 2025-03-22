describe('promises', () => {
    test('latihan 1: simulasi fetch data', async () => {
        function fetchUserData(id: number): Promise<{ id: number, name: string }> {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (id > 0) {
                        resolve({ name: 'ridho', id })
                    } else {
                        reject('Invalid user ID')
                    }
                }, 1000)
            })
        }

        await expect(fetchUserData(1)).resolves.toEqual({ name: 'ridho', id: 1 })
    })

    test('latihan 2: menjalankan beberapa request secara paralel', async () => {
        function fetchUserData(id: number): Promise<{ id: number, name: string }> {
            return new Promise((resolve, reject) => {
                if (id > 0) {
                    resolve({ id, name: 'Amelia' })
                } else {
                    reject('Invalid user ID')
                }
            })
        }

        function fetchMultipleUsers(ids: number[]): Promise<{ id: number, name: string}[]> {
            return Promise.all(ids.map(fetchUserData))
        }

        await expect(fetchMultipleUsers([1, 2, 3, -1])).rejects.toBe('Invalid user ID')
    })

    test('latihan 3: fetch data satu user', async () => {
        interface User {
            id: number
            name: string
            username: string
            email: string
            phone: string
        }

        async function fetchUser(id: number): Promise<User> {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            if (!response.ok) {
                throw new Error('User not found')
            }
            return response.json()
        }

        await expect(fetchUser(1).then(data => data)).resolves.toMatchObject({
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            phone: "1-770-736-8031 x56442"
          })
    })

    test('latihan 4: fetch banyak user secara paralel', async () => {
        interface User {
            id: number
            name: string
            username: string
            email: string
            phone: string
        }

        async function fetchMultipleUsers(ids: number[]): Promise<User[]> {
            const responses = await Promise.all(ids.map((id) => fetch(`https://jsonplaceholder.typicode.com/users/${id}`)))
            const data = await Promise.all(responses.map(async (res) => {
                if (!res.ok) {
                    throw new Error('User not found')
                }
                return res.json()
            }))

            return data.map((user: User) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                username: user.username
            }))
        }

        await expect(fetchMultipleUsers([1,2,3])).resolves.toEqual([
            {
                id: 1,
                name: "Leanne Graham",
                username: "Bret",
                email: "Sincere@april.biz",
                phone: "1-770-736-8031 x56442"
            },
            {
                id: 2,
                name: "Ervin Howell",
                username: "Antonette",
                email: "Shanna@melissa.tv",
                phone: "010-692-6593 x09125"
            },
            {
                id: 3,
                name: "Clementine Bauch",
                username: "Samantha",
                email: "Nathan@yesenia.net",
                phone: "1-463-123-4447"
            }
        ])
    })
})


