// Fungsi yang mengembalikan array hanya dengan kata kata yang panjangnya ganjil

export function filterOddLengthWords(words: string[]): string[] {
    return words.filter(word => word.length % 2 !== 0)
}