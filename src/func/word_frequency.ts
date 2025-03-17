// Fungsi yang menghitung jumlah kemunculan setiap kata dalam kalimat

export function wordFrequency(sentence: string): Record<string, number> {
    const arr: string[] = sentence.split(' ')
    let obj: Record<string, number> = {}
    for (let i = 0; i < arr.length; i++) {
        const word: string = arr[i]!
        if (obj[word]) {
            obj[word] += 1
        } else {
            obj[word] = 1
        }
    }
    return obj
}