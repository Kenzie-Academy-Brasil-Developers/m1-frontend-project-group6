// script com todos os requests da Api

export class Api {

    static baseUrl = 'https://habits-kenzie.herokuapp.com'
    static token = JSON.parse(localStorage.getItem('@Kenzie-Habit-M2:token'))
    static headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
    };


    static async userLogin(loginData) {

        const loginUrl = this.baseUrl + '/api/userLogin'

        return await fetch(loginUrl, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(loginData)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.token && res.response) {
                    localStorage.setItem('@Kenzie-Habit-M2:token', JSON.stringify(res.token))
                    localStorage.setItem('@Kenzie-Habit-M2:user', JSON.stringify(res.response))
                }
                if (res.message) {
                    console.log(res.message)
                }
                return res
            })
            .catch(err => console.log(err))
    }

    static async updateProfile(profileUpdate) {

        const updateProfileUrl = this.baseUrl + '/api/user/profile'

        return await fetch(updateProfileUrl, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(profileUpdate)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                return res
            })
            .catch(err => console.log(err))
    }

    static async createHabit(newHabit) {

        const createHabitUrl = this.baseUrl + '/api/habits'

        return await fetch(createHabitUrl, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(newHabit)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                return res
            })
            .catch(err => console.log(err))
    }

    static async readAllUserHabits() {

        const readAllUserHabitsUrl = this.baseUrl + '/api/habits'

        return await fetch(readAllUserHabitsUrl, {
            method: 'GET',
            headers: this.headers
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                return res
            })
            .catch(err => console.log(err))
    }

    static async readHabitByCategory(habitCategory) {

        const readHabitByCategoryUrl = this.baseUrl + `/api/habits/category/${habitCategory}`

        return await fetch(readHabitByCategoryUrl, {
            method: 'GET',
            headers: this.headers
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                return res
            })
            .catch(err => console.log(err))
    }

    static async updateHabit(habitUpdate, habitId) {

        const updateHabitUrl = this.baseUrl + `/api/habits/${habitId}`

        return await fetch(updateHabitUrl, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(habitUpdate)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                return res
            })
            .catch(err => console.log(err))
    }

    static async completeHabit(habitId) {

        const completeHabitUrl = this.baseUrl + `/api/habits/complete/${habitId}`

        return await fetch(completeHabitUrl, {
            method: 'PATCH',
            headers: this.headers
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.message)
                return res
            })
            .catch(err => console.log(err))
    }

    static async deleteHabit(habitId) {

        const deleteHabitUrl = this.baseUrl + `/api/habits/${habitId}`

        return await fetch(deleteHabitUrl, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(res => res.json())
            .then(res => {
                console.log(res.message)
                return res
            })
            .catch(err => console.log(err))
    }
}