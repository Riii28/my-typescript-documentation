// fungsi yang menerima array angka dan callback
// untuk mengubah setiap elemennya

export function processArray(arr: number[], callback: (num: number) => number | boolean): number[] {
    return arr
        .map(num => callback(num))
        .filter(num => num !== false) as number[]
}

export function square(num: number): number {
    return num * num
}

export function evenNumber(num: number): number | boolean {
    return num % 2 === 0 ? num : false
}