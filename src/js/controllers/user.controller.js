import { Api } from './Api.controller.js'
import { Habit } from '../models/Habit.model.js'

async function defineProfileInfo() {
    const userInfo = await JSON.parse(localStorage.getItem('@Kenzie-Habit-M2:user'))

    const headerUserImage = document.getElementsByClassName('header_userImage')[0]
    const sectionUserImage = document.getElementsByClassName('section_userInfo_image')[0]
    const sectionUserName = document.getElementsByClassName('section_userInfo_name')[0]

    headerUserImage.src = userInfo.usr_image
    sectionUserImage.src = userInfo.usr_image
    sectionUserName.innerText = userInfo.usr_name

}

defineProfileInfo()

async function showHabits() {

    const data = await Api.readAllUserHabits()
    const dataConcluded = data.filter(habit => habit.habit_status === true)

    const habitsTable = document.querySelector('tbody')
    habitsTable.innerText = ''

    data.forEach(habit => {

        const newHabit = new Habit(habit.habit_id, habit.habit_title, habit.habit_description, habit.habit_category, habit.habit_status).createTemplate()
        console.log(newHabit)
        habitsTable.appendChild(newHabit)
    });
}

showHabits()

function filters() {
    const filterBtns = document.querySelector('nav')
    filterBtns.addEventListener('click', (e) => {
        const element = e.target

        if (element.innerText === 'Todos') {
            habitsTable.innerText = ''

            showHabits(data)
        }

        else if (element.innerText === 'Concluídos') {
            habitsTable.innerText = ''

            showHabits(dataConcluded)
        }
    })
}

filters()

function userMenu() {
    //const menu = document.

    const sectionUserImage = document.getElementsByClassName('header_userImage')[0]
    sectionUserImage.addEventListener('click', (e) => {
        //exibir modal 
    })
}

//userMenu()

function createHabit() {
    const closeCreateHabitMenu = document.querySelector('.createHabit_innerButton')
    closeCreateHabitMenu.addEventListener('click', (e) => {
        const createHabitModal = document.querySelector('.modal')
        createHabitModal.style.display = 'none'
    })

    const btnCreate = document.querySelector('.btn_create')
    btnCreate.addEventListener('click', (e) => {
        const createHabitModal = document.querySelector('.modal')
        createHabitModal.style.display = 'flex'
    })
}

createHabit()

function requestApiToCreateHabit() {
    // capturando dados digitados no modal criar habito para enviar para Api:

    const createHabitButton = document.querySelector('#create_habit_btn')
    createHabitButton.addEventListener('click', async (e) => {
        const data = {}

        const habitTitle = document.querySelector('#title').value
        console.log(habitTitle)
        if (habitTitle !== '') {
            data.habit_title = habitTitle
        }

        const habitDescription = document.querySelector('#create_habit_description').value
        console.log(habitDescription)
        if (habitDescription !== '') {
            data.habit_description = habitDescription
        }

        const habitCategory = document.querySelector('.create_habit_category').value
        console.log(habitCategory)
        if (habitCategory !== '') {
            data.habit_category = habitCategory
        }
        console.log(data)
        const apiResponse = await Api.createHabit(data)
        if (apiResponse.habit_id) {

            const closeCreateHabitMenu = document.querySelector('.modal')
            closeCreateHabitMenu.style.display = 'none'

        }
        showHabits()
        // window.location.reload()
        // console.log(apiResponse)
    })

}

requestApiToCreateHabit()

function showMore() {
    const btnShowMore = document.getElementsByClassName('btn_showMore')[0]
    btnShowMore.addEventListener('click', (e) => {
        habitsTable.style.overflow = 'visible'
    })
}

async function requestApiToEditHabit() {

    const saveChangesButton = document.querySelector('#save_changes_habit_button')
    saveChangesButton.addEventListener('click', async (e) => {
        e.preventDefault()

        const data = {}

        const habitTitle = document.querySelector('#habit_title').value
        console.log(habitTitle)
        if (habitTitle !== '') {
            data.habit_title = habitTitle
        }

        const habitDescription = document.querySelector('#habit_description').value
        console.log(habitDescription)
        if (habitDescription !== '') {
            data.habit_description = habitDescription
        }

        const habitCategory = document.querySelector('#habit-category').value
        console.log(habitCategory)
        if (habitCategory !== '') {
            data.habit_category = habitCategory
        }
        console.log(data)

        const habitId = saveChangesButton.classList[0]

        console.log(habitId)

        const editHabitButton = document.querySelector('#save_changes_habit_button')
        editHabitButton.classList.remove(`${editHabitButton.classList[0]}`)

        const apiResponse = await Api.updateHabit(data, habitId)
        if (apiResponse.habit_id) {

            const closeCreateHabitMenu = document.querySelector('.edit_habit_modal')
            closeCreateHabitMenu.style.display = 'none'

        }
        showHabits()

    })

    const closeEditHabitModal = document.querySelector('#close_edit_modal_button')
    closeEditHabitModal.addEventListener('click', (e) => {

        e.preventDefault()

        const editHabitButton = document.querySelector('#save_changes_habit_button')
        editHabitButton.classList.remove(`${editHabitButton.classList[0]}`)

    })



}

requestApiToEditHabit()

showMore()


// função para adicionar e remover os valores a serem editados no modal de editar hábito:

function addAndRemoveEditContentModal(e) {

    const editPostButton = document.querySelector('.edit-button');

}