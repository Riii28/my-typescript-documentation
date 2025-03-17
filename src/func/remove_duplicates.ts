// Fungsi yang menghapus elemen duplikat dari array string

export function removeDuplicates(words: string[]): string[] {
    const key = new Set()
    let value: string[] = []
    words.forEach((word) => {
        if (!key.has(word)) {
            key.add(word)
            value.push(word)
        }
    })
    return value
}