// fungsi yang menerima array angka dan 
// mengembalikannya dalam format nomor telepon

export function formatPhoneNumber(numbers: number[]): any {
    
    return numbers
        .join('')
        .slice(0,3)
}