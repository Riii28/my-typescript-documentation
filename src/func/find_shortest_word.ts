// fungsi yang mencari kata dengan panjang terpendek dalam sebuah kalimat

export function findShortestWord(sentence: string): string {
    return sentence
        .split(' ')
        .reduce((acc, curr) => acc.length <= curr.length ? acc : curr)
}