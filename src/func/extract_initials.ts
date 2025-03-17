// Fungsi yang mengambil huruf pertama dari setiap kata
// dalam string dan menggabungkannya

export function extractInitials(sentence: string): string {
    return sentence
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
}

