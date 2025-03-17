import chalk from "chalk"

let count: number = 0
export function Console(func: Function, ...args: any[]): void {
    count++
    const result: any = func(...args)
    console.info(chalk.yellowBright.bold(`${count}. Fungsi ${func.name}:`), result, '\n')
}