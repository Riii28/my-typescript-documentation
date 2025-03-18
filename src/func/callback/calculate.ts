// fungsi calculate yang menerima dua angka dan sebuah 
// callback untuk menentukan operasi apa yang dilakukan.

export function calculate(a: number, b: number, callback: (x: number, y: number) => number): number {
    return callback(a, b)
}

export function multiple(x: number, y: number): number {
    return x * y
}

export function sum(x: number, y: number): number {
    return x + y
}