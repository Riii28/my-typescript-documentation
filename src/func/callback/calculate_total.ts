// Fungsi yang menerima array angka, callback filter, 
// dan callback operasi untuk menghitung total.

export function calculateTotal(
    arr: number[],
    filterCallback: (num: number) => boolean,
    operation: (total: number, num: number) => number
): number {
    return arr
        .filter(num => filterCallback(num))
        .reduce((acc, curr) => operation(acc, curr), 0)
}
