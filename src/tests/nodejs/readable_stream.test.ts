test('Streaming Data dengan ReadableStream', async () => {
    async function streamJSON() {
        try {
            const response: Response = await fetch('https://jsonplaceholder.typicode.com/posts')
            if (!response.ok) {
                return
            }
            const reader = response.body?.getReader()
            if(!reader) {
                return
            }

            let receivedText: string = ''
            const decoder = new TextDecoder()

            while (true) {
                const { value, done } = await reader.read()
                
                if (done) break
                receivedText += decoder.decode(value, { stream: true })
                console.info(receivedText)
            }

        } catch (err) {
            console.error(err)
        }
    }
    console.info(await streamJSON())

})