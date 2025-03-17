// fungsi yang menerima array angka dan 
// mengembalikannya dalam format nomor telepon

export function formatPhoneNumber(numbers: number[]): any {
    const phoneNumber: string = numbers.join('')
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`
}