// Fungsi yang mengacak urutan karakter dalam string

export function shuffleString(str: string): string {
    let value: string = ''
    for (let i = 0; i < str.length; i++) {
        value += str[Math.floor(Math.random() * str.length)]
    }
    return value
}

export default function shuffleString2(str: string): string {
    if (!str) return ""; // Pastikan string tidak kosong

    const arr: any = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Pastikan j selalu valid
        if (arr[i] !== undefined && arr[j] !== undefined) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    return arr.join('');
}
