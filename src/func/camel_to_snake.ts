// fungsi yang mengubah teks dalam camelCase menjadi snake_case.

export function camelToSnake(str: string): any {
    return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}