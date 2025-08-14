import chalk from "chalk";

const fetch_code_verification = async () => {
    try {
        const response = await fetch('https://github.com/login/device/code',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id: 'Ov23liaF3glySjJdRy0P',
                scope: 'repo user'
            })
        })

        if (response.status != 200) {
            console.info(chalk.hex('#FFA500')(" !github api a un erreur"));
            return null
        }
        const data = await response.json()

        return Object(data)
    } catch (error) {
        console.info(chalk.hex('#FFA500')(" !internal server error, cantact admin"));
        return null
    }
}

const fetch_token = async (device_code) => {
    try {
        const response = await fetch('https://github.com/login/oauth/access_token',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                client_id: 'Ov23liaF3glySjJdRy0P',
                device_code: device_code,
                grant_type: 'urn:ietf:params:oauth:grant-type:device_code'
            })
        })

        if (response.status != 200) {
            console.info(chalk.hex('#FFA500')(" !github api a un erreur"));
            return null
        }
        const data = await response.json()

        return Object(data)
    } catch (error) {
        console.info(chalk.hex('#FFA500')(" !internal server error, cantact admin"));
        console.error(error)
        return null
    }
}

export {
    fetch_code_verification,
    fetch_token
}