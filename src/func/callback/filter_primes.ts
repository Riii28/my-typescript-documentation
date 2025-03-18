// yang menerima array angka dan callback untuk 
// menentukan apakah angka tersebut prima atau tidak

export function filterPrimes(arr: number[], callback: (num: number) => boolean): number[] {
    return arr.filter(callback)
}

export function isPrime(num: number): boolean {
    if (num < 2) return false

    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false
        }
    }

    return true
}