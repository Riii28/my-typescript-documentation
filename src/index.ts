import chalk from "chalk"
import { camelToSnake } from "./func/camel_to_snake.js"

let count: number = 0
export function Console(func: Function, ...args: any[]): void {
    count++
    console.info(chalk.yellowBright.bold(`${count}. Fungsi ${camelToSnake(func.name)}:`), func(...args), '\n')
}