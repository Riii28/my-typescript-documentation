// Fungsi yang menggandakan setiap huruf dalam string

export function doubleChars(str: string): string {
    const key = new Set(['a','i','u','e','o'])

    return str
        .split('')
        .map(char => key.has(char) ? char.repeat(2) : null)
        .join('')
}