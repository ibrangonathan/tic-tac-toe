import { toggle_ntf_modal, globals } from "../utils/globals.js"
import { set_route } from "../utils/navigation.js"
import { Render } from "../utils/render.js"

const render = new Render()

export class Auth 
{
    static logged = false
    static user = null

    async check()
    {
        globals.spinner(true)
        const result = await (await fetch("/api/auth/check", {
            method: "GET"
        })).json()
        globals.spinner(false)
        
        if(!result.message){
            Auth.logged = true
            Auth.user = result
        } else {
            Auth.logged = false
            Auth.user = null
        }

        return Auth.logged
    }

    async login(user_data)
    {
        globals.spinner(true)
        const result = await (await fetch("/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                identifier: user_data.get("identifier"),
                password: user_data.get("password")
            })
        })).json()
        globals.spinner(false)

        if(result.username){
            render.notification({
                title: "Tic Tac Toe",
                msg: "Welcome back, " + result.username + "!",
                action: {
                    text: "Continue",
                    callback: () => {
                        toggle_ntf_modal(false)
                    }
                }
            })
            Auth.redirect()
        } else {
            render.notification({
                title: "Error",
                msg: result.message,
                action: {
                    text: "Retry",
                    callback: () => toggle_ntf_modal(false)
                }
            })
        }
    }

    async register(user_data)
    {
        globals.spinner(true)
        const result = await (await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName: user_data.get("fullName"),
                email: user_data.get("email"),
                username: user_data.get("username"),
                password: user_data.get("password")
            })
        })).json()
        globals.spinner(false)

        if(result.username){
            render.notification({
                title: "Tic Tac Toe",
                msg: "Welcome, " + result.username + "!",
                action: {
                    text: "Continue",
                    callback: () => {
                        toggle_ntf_modal(false)
                    }
                }
            })
            Auth.redirect()
        } else {
            render.notification({
                title: "Error",
                msg: result.message,
                action: {
                    text: "Retry",
                    callback: () => toggle_ntf_modal(false)
                }
            })
        }
    }

    async logout()
    {
        globals.spinner(true)
        await fetch("/api/auth/signout", {
            method: "POST"
        })
        globals.spinner(false)
        Auth.redirect(["home", "Home"])
    }

    static redirect(route = ["profile", "Profile"])
    {
        set_route(route)
    }
}