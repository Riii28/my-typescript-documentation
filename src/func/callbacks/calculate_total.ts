// Fungsi yang menerima array angka, callback filter, 
// dan callback operasi untuk menghitung total.

export function calculateTotal(
    arr: number[],
    filterCallback: (num: number) => boolean,
    operation: (total: number, num: number) => number
): number {
    // return arr
    //     .filter(num => filterCallback(num))
    //     .reduce((acc, curr) => operation(acc, curr), 0)

    const filtered = arr.filter(num => filterCallback(num))
    return filtered.length > 0 ? filtered.reduce(operation) : 0
}
