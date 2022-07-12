// script com todos os requests da Api

export class Api {

    static baseUrl = "https://habits-kenzie.herokuapp.com"
    static token = JSON.parse(localStorage.getItem("@Kenzie-Habit-M2:token"))
    static headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
    }

    static async userLogin(loginData) {

        const loginUrl = this.baseUrl + "/api/userLogin"

        return await fetch(loginUrl, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(loginData)
        })
            .then(res => res.json())
            .then(res => {
                if (res.token && res.response) {
                    localStorage.setItem("@Kenzie-Habit-M2:token", JSON.stringify(res.token))
                    localStorage.setItem("@Kenzie-Habit-M2:user", JSON.stringify(res.response))
                }
                if (res.message) {
                    console.log(res.message)
                }
                return res
            })
            .catch(err => {
                console.log(err)
            })

    }

}