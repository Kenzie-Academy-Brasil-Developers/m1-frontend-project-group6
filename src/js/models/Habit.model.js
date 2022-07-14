import { Api } from "../controllers/Api.controller.js"

export class Habit {
    constructor(id, title, description, category, status) {
        this.id = id
        this.title = title
        this.description = description
        this.category = category
        this.status = status
    }

    createTemplate() {

        if (this.status == true) {

            const tr = document.createElement('tr')

            const status = document.createElement('td')
            const btnSelect = document.createElement('button')

            const title = document.createElement('td')
            const description = document.createElement('td')

            const category = document.createElement('td')
            const spanCateg = document.createElement('span')

            const edit = document.createElement('td')
            const editImg = document.createElement('img')

            tr.id = this.id

            status.classList.add('habit_status', `status:${this.id}`)
            title.classList.add('habit_title', `title:${this.id}`)
            description.classList.add('habit_description', `description:${this.id}`)
            category.classList.add('habit_category', `category:${this.id}`)
            edit.classList.add('habit_edit')

            title.innerText = this.title
            description.innerText = this.description
            spanCateg.innerText = this.category

            editImg.src = 'src/assets/img/editDots.svg'
            editImg.classList.add(`${this.id}`)

            const imgCheck = document.createElement('img')
            imgCheck.src = 'src/assets/img/checkSignal.svg'

            btnSelect.id = 'concluded'
            btnSelect.classList.add('btn_selectHabit-Concluded')
            btnSelect.appendChild(imgCheck)

            tr.style.backgroundColor = '#F1F3F5'

            title.style.textDecoration = 'line-through'

            editImg.addEventListener('click', async (e) => {
                const menuEdit = document.getElementsByClassName('edit_habit_modal')[0]
                menuEdit.style.display = 'flex'

                const editHabitButton = document.querySelector('#save_changes_habit_button')

                const element = e.target
                console.log(element)

                const habitId = element.classList[0]
                console.log(habitId)

                const title = document.getElementsByClassName(`title:${habitId}`)[0].innerText
                console.log(title)

                const editTitle = document.querySelector('#habit_title')
                console.log(editTitle)

                editTitle.value = title

                const description = document.getElementsByClassName(`description:${habitId}`)[0].innerText
                console.log(description)

                const editDescription = document.querySelector("#habit_description")
                console.log(editDescription)

                editDescription.value = description

                const category = document.getElementsByClassName(`category:${habitId}`)[0].innerText
                console.log(category)

                const editCategory = document.querySelector("#habit-category")
                console.log(editCategory)

                editCategory.value = category

                editHabitButton.classList.add(`${habitId}`)

            })

            // adding eventlistener to close edit modal: 

            const closeEditHabitModal = document.querySelector('#close_edit_modal_button')
            closeEditHabitModal.addEventListener('click', (e) => {
                const menuEdit = document.getElementsByClassName('edit_habit_modal')[0]
                menuEdit.style.display = 'none'
            })

            // adding eventlistener to close edit modal: 

            const closeCreateHabitModal = document.querySelector('.createHabit_innerButton')
            closeCreateHabitModal.addEventListener('click', (e) => {
                const menuCreate = document.querySelector('.modal')
                menuCreate.style.display = 'none'
            })

            status.appendChild(btnSelect)
            category.appendChild(spanCateg)
            edit.appendChild(editImg)
            tr.append(status, title, description, category, edit)

            return tr
        }

        else {

            const tr = document.createElement('tr')

            const status = document.createElement('td')
            const btnSelect = document.createElement('button')

            const title = document.createElement('td')
            const description = document.createElement('td')

            const category = document.createElement('td')
            const spanCateg = document.createElement('span')

            const edit = document.createElement('td')
            const editImg = document.createElement('img')

            tr.id = this.id

            status.classList.add('habit_status', `status:${this.id}`)
            btnSelect.classList.add('btn_selectHabit')
            title.classList.add('habit_title', `title:${this.id}`)
            description.classList.add('habit_description', `description:${this.id}`)
            category.classList.add('habit_category', `category:${this.id}`)
            edit.classList.add('habit_edit')

            title.innerText = this.title
            description.innerText = this.description
            spanCateg.innerText = this.category

            editImg.src = 'src/assets/img/editDots.svg'
            editImg.classList.add(`${this.id}`)

            const imgCheck = document.createElement('img')
            imgCheck.src = 'src/assets/img/checkSignal.svg'

            btnSelect.addEventListener('click', async (e) => {
                e.preventDefault()

                if (btnSelect.id !== 'concluded') {
                    btnSelect.id = 'concluded'

                    btnSelect.classList.add('btn_selectHabit-Concluded')

                    btnSelect.appendChild(imgCheck)

                    tr.style.backgroundColor = '#F1F3F5'

                    await Api.completeHabit(this.id)

                    window.location.reload()
                }
            })

            editImg.addEventListener('click', async (e) => {
                const menuEdit = document.getElementsByClassName('edit_habit_modal')[0]
                menuEdit.style.display = 'flex'

                const editHabitButton = document.querySelector('#save_changes_habit_button')

                const element = e.target
                console.log(element)

                const habitId = element.classList[0]
                console.log(habitId)

                const title = document.getElementsByClassName(`title:${habitId}`)[0].innerText
                console.log(title)

                const editTitle = document.querySelector('#habit_title')
                console.log(editTitle)

                editTitle.value = title

                const description = document.getElementsByClassName(`description:${habitId}`)[0].innerText
                console.log(description)

                const editDescription = document.querySelector("#habit_description")
                console.log(editDescription)

                editDescription.value = description

                const category = document.getElementsByClassName(`category:${habitId}`)[0].innerText
                console.log(category)

                const editCategory = document.querySelector("#habit-category")
                console.log(editCategory)

                editCategory.value = category

                editHabitButton.classList.add(`${habitId}`)

                const confirmDeletion = document.querySelector('#confirm_action_button')
                confirmDeletion.classList.add(`${habitId}`)

            })

            status.appendChild(btnSelect)
            category.appendChild(spanCateg)
            edit.appendChild(editImg)
            tr.append(status, title, description, category, edit)

            return tr
        }
    }
}
