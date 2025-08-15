import chalk from "chalk";
import { promisify } from "node:util";
import child_process from "node:child_process";
const exec = promisify(child_process.exec)


export async function get_env(key) {
    const shell = `
        cd #
        cd /tmp
        mkdir -p  gitfollow_cli_env
        cd gitfollow_cli_env
        echo "" >> ${key}
        cat ${key}
    `
    try {
        const { stdout, stderr } = await exec(shell);
        console.error(chalk.hex('#FFA500')(stderr))
        return stdout.toString().trim()
    } catch(erreur) {
        return ""
    }
}

export async function set_env(key, value) {
    const shell = `
        cd #
        cd /tmp
        mkdir -p gitfollow_cli_env
        cd gitfollow_cli_env
        echo ${value} > ${key}
    `
    try {
        const { stdout, stderr } = await exec(shell);
        console.error(chalk.hex('#FFA500')(stderr))
    } catch (error) {
        console.error(chalk.hex('#FFA500')(" !internal server error "));
    }
}

export const base_url = 'https://api.github.com'