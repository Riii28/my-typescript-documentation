// Fungsi yang mengecek apakah dua string adalah anagram
// memiliki huruf yang sama tetapi urutannya berbebda

export function isAnagram(str1: string, str2: string): any {
    return str1.split('').sort().join('') === str2.split('').sort().join('')
}