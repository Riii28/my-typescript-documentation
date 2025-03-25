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

        await expect(fetchUser(1)).resolves.toMatchObject({
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
            const responses = await Promise.all(
                ids.map((id) => fetch(`https://jsonplaceholder.typicode.com/users/${id}`))
            )
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
    
    test('latihan 5: fetch data user dan format namanya', async () => {
        interface User {
            id: number
            name: string
            username: string
            email: string
            phone: string
        }

        async function fetchAndFormatUser(id: number): Promise<string> {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

            if (!response.ok) {
                throw new Error('Gagal mengambil user')
            }

            const data = await response.json() as User
            return data?.name.toUpperCase()
        }

        await expect(fetchAndFormatUser(1)).resolves.toBe('LEANNE GRAHAM')
    })

    test('latihan 6: fetch data user dan ambil domain email unik', async () => {
        interface User {
            id: number
            email: string
        }

        async function fetchUniqueDomains(users: number[]): Promise<string[]> {
            const responses = await Promise.allSettled(
                users.map((user) => fetch(`https://jsonplaceholder.typicode.com/users/${user}`))
            )

            const data = await Promise.allSettled(
                responses
                    .filter((res): res is PromiseFulfilledResult<Response> => res.status === 'fulfilled')
                    .map((res) => res.value.json())
            )

            const emails = data
                .filter((res): res is PromiseFulfilledResult<User> => res.status === 'fulfilled')
                .map((res) => res.value.email)

            const domains = emails
                .map(email => email.split('@')[1])
                .filter((domain): domain is string => !!domain)

            return [...new Set(domains)].sort()
        }

        await expect(fetchUniqueDomains([1, 2, 3, 4, 5])).resolves.toEqual([
            'annie.ca',
            'april.biz',
            'kory.org',
            'melissa.tv',
            'yesenia.net'
        ])
    })

    test('latihan 6: ambil data postingan dan hitung kata terbanyak', async () => {
        async function fetchAndAnalyzePosts(postsIds: number[]): Promise<string> {
            const responses: Response[] = await Promise.all(
                postsIds.map((id) => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`))
            )

            const data: { body: string }[] = await Promise.all(
                responses.map((res) => {
                    if (!res.ok) {
                        throw new Error('postingan tidak ditemukan')
                    }
                    return res.json()
                })
            )

            const posts: string = data
                .map((post) => post.body)
                .join('')
                .toLowerCase()
            
            const words: string[] = posts
                .split(/\W+/)
                .filter(Boolean)
                .sort()

            let obj: Record<string, number> = {}
            
            words.forEach((_, i) => {
                const str: string = words[i]!
                obj[str] ? obj[str] += 1 : obj[str] = 1
            })

            const maxEntry: [string, number] = Object.entries(obj)
                .reduce((max, curr) => curr[1] > max[1] ? curr : max)

            return maxEntry[0]
        }
        await expect(fetchAndAnalyzePosts([1,2,3,4,5])).resolves.toBe('et')
    })

    test('latihan 7: ambil data komentar dan hitung panjang rata-rata', async () => {
        async function fetchAndAnalyzeComments(postIds: number[]): Promise<any> {
            const responses: Response[] = await Promise.all(
                postIds.map((id) => fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`))
            )

            const data = await Promise.all(
                responses.map(async (res) => {
                    if (!res.ok) {
                        throw new Error('gagal mengambil komentar')
                    }
                    return res.json()
                })
            )
            
            const allComents: { body: string }[] = data
                .flatMap((values) => values)

            const totalCommentLength: number = allComents
                .reduce((acc, curr) => {
                    return acc + curr.body.length
                }, 0)

            const average: number = Math.round(
                totalCommentLength / allComents.length
            )
            return average
        }
        await expect(fetchAndAnalyzeComments([1,2])).resolves.toBeGreaterThan(50)
    })
})


