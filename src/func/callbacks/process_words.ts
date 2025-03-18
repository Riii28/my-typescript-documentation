// Fungsi yang menerima kalimat dan callback yang mengubah setiap kata.

export function processWords(sentence: string, callback: (word: string) => string): string {
    return sentence
        .split(' ')
        .map(word => callback(word))
        .join(' ')
}

export function reverseWord(word: string): string {
    return word
        .split('')
        .reverse()
        .join('')
}