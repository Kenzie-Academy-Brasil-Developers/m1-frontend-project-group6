import { Api } from './Api.controller.js'
import { Habit } from '../models/Habit.model.js'

function editProfile() {

    let user_info = document.querySelector(".header_userImage")

    user_info.addEventListener("click", () => {

        let user_info_event = document.querySelector(".profile_actions")

        user_info_event.classList.toggle("show")

    })

    let user_update = document.querySelector(".profile_actions_settings")

    user_update.addEventListener("click", () => {

        let user_update_settings = document.querySelector(".modal_edit_profile")

        user_update_settings.classList.toggle("show")

        let user_name = document.querySelector(".section_userInfo_name").innerText

        let user_change_input = document.querySelector("#edit_profile_name")

        user_change_input.value = user_name

    })

    let user_close_button = document.querySelector("#close_edit_profile_button")

    user_close_button.addEventListener("click", () => {

        let user_update_status = document.querySelector(".modal_edit_profile")

        user_update_status.classList.toggle("show")

    })

    let save_changes = document.querySelector("#edit_profile_save_button")

    save_changes.addEventListener("click", async () => {

        let user_name = document.querySelector("#edit_profile_name")

        let img_url = document.querySelector("#edit_profile_url")

        const content = {

        }

        if (user_name.value && img_url.value) {

            content.usr_name = user_name.value

            content.usr_image = img_url.value

            const apiResponse = await Api.updateProfile(content)

            localStorage.setItem('@Kenzie-Habit-M2:user', JSON.stringify(apiResponse))

            defineProfileInfo()

            let user_info_event = document.querySelector(".profile_actions")

            user_info_event.classList.toggle("show")

            let user_update_settings = document.querySelector(".modal_edit_profile")

            user_update_settings.classList.toggle("show")

        } else if (user_name.value) {

            content.usr_name = user_name.value

            const apiResponse = await Api.updateProfile(content)

            localStorage.setItem('@Kenzie-Habit-M2:user', JSON.stringify(apiResponse))

            defineProfileInfo()

            let user_info_event = document.querySelector(".profile_actions")

            user_info_event.classList.toggle("show")

            let user_update_settings = document.querySelector(".modal_edit_profile")

            user_update_settings.classList.toggle("show")

        } else if (img_url.value) {

            content.usr_image = img_url.value

            const apiResponse = await Api.updateProfile(content)

            localStorage.setItem('@Kenzie-Habit-M2:user', JSON.stringify(apiResponse))

            defineProfileInfo()

            let user_info_event = document.querySelector(".profile_actions")

            user_info_event.classList.toggle("show")

            let user_update_settings = document.querySelector(".modal_edit_profile")

            user_update_settings.classList.toggle("show")

        }

    })
}

editProfile()

function userLogout() {

    let user_log = document.querySelector("#user_logout")

    user_log.addEventListener("click", () => {

        localStorage.clear()

        location.href = "../../index.html"

    })
}

userLogout()

function checkToken() {
    const token = localStorage.getItem('@Kenzie-Habit-M2:token')

    if (!token) {

        const habitsTable = document.querySelector('table')
        habitsTable.innerText = ''

        const modalNoAccess = document.getElementsByClassName('modal_noAccess')[0]
        modalNoAccess.style.display = 'flex'

    }

    const btnLogin = document.getElementsByClassName('btn_login')[0]
    btnLogin.addEventListener('click', () => {
        
        location.replace('index.html')
    })

}

checkToken()

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

const allData = await Api.readAllUserHabits()
const allDataSort = allData.sort((a, b) => b.habit_id - a.habit_id)

export async function showHabits(data) {
//
    const habitsTable = document.querySelector('tbody')
    habitsTable.innerText = ''

    data.forEach(habit => {

        const newHabit = new Habit(habit.habit_id, habit.habit_title, habit.habit_description, habit.habit_category, habit.habit_status).createTemplate()

        habitsTable.appendChild(newHabit)
    })
}

showHabits(allDataSort)

async function filters() {

    const btnFilterAll = document.getElementsByClassName('btn_filter_all')[0]
    const btnFilterConcluded = document.getElementsByClassName('btn_filter_concluded')[0]

    btnFilterAll.addEventListener('click', (e) => {

        showHabits(allDataSort)
    })

    btnFilterConcluded.addEventListener('click', (e) => {

        const dataConcluded = allDataSort.filter(habit => habit.habit_status === true)
        const dataConcludedSort = dataConcluded.sort((a, b) => b.habit_id - a.habit_id)
        showHabits(dataConcludedSort)
    })
}

filters()

function createHabit() {
    const closeCreateHabitMenu = document.querySelector('.createHabit_innerButton')
    closeCreateHabitMenu.addEventListener('click', (e) => {
        const createHabitModal = document.querySelector('.modal')
        createHabitModal.style.display = 'none'
    })

    const btnCreate = document.querySelector('.btn_create')
    btnCreate.addEventListener('click', (e) => {

        const titleInput = document.querySelector('#title')
        const descriptionInput = document.querySelector('#create_habit_description')

        titleInput.value = ''
        descriptionInput.value = ''

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

        const errorModal = document.getElementsByClassName('modal_not_created')[0]

        errorModal.addEventListener('click', () => {
            errorModal.style.display = 'none'
        })

        const habitTitle = document.querySelector('#title').value

        if (habitTitle !== '') {
            data.habit_title = habitTitle
        } else {
            errorModal.style.display = 'flex'
        }

        const habitDescription = document.querySelector('#create_habit_description').value

        if (habitDescription !== '') {
            data.habit_description = habitDescription
        } else {
            errorModal.style.display = 'flex'
        }

        const habitCategory = document.querySelector('.create_habit_category').value

        if (habitCategory !== '') {
            data.habit_category = habitCategory
        }

        const apiResponse = await Api.createHabit(data)

        if (apiResponse.habit_id) {

            const closeCreateHabitMenu = document.querySelector('.modal')
            closeCreateHabitMenu.style.display = 'none'

            const modalSuccess = document.getElementsByClassName('modal_success')[0]
            modalSuccess.style.display = 'flex'

            modalSuccess.addEventListener('click', () => {
                modalSuccess.style.display = 'none'
            })

        }
        const allHabits = await Api.readAllUserHabits()

        const allHabitsSort = allHabits.sort((a, b) => b.habit_id - a.habit_id)
        showHabits(allHabitsSort)

    })

}

requestApiToCreateHabit()

function showMore() {
    const habitsTable = document.querySelector('tbody')

    const btnShowMore = document.getElementsByClassName('btn_showMore')[0]
    btnShowMore.addEventListener('click', (e) => {
        habitsTable.style.overflow = 'visible'
        habitsTable.style.maxHeight = 'none'
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

        const confirmDeletion = document.querySelector('#confirm_action_button')
        confirmDeletion.classList = ''

        const editHabitButton = document.querySelector('#save_changes_habit_button')
        editHabitButton.classList = ''

        const apiResponse = await Api.updateHabit(data, habitId)
        if (apiResponse.habit_id) {

            const closeCreateHabitMenu = document.querySelector('.edit_habit_modal')
            closeCreateHabitMenu.style.display = 'none'

        }

        const allHabits = await Api.readAllUserHabits()
        const allHabitsSort = allHabits.sort((a, b) => b.habit_id - a.habit_id)
        showHabits(allHabitsSort)
    })

    const closeEditHabitModal = document.querySelector('#close_edit_modal_button')
    closeEditHabitModal.addEventListener('click', (e) => {

        // e.preventDefault()

        const confirmDeletion = document.querySelector('#confirm_action_button')
        const editHabitButton = document.querySelector('#save_changes_habit_button')

        console.log(editHabitButton)

        confirmDeletion.classList.add(`${editHabitButton.classList[0]}`)
        editHabitButton.classList.remove(`${editHabitButton.classList[0]}`)

    })

    const deleteHabit = document.querySelector('#delete_habit_button')
    deleteHabit.addEventListener('click', (e) => {

        const modalDeleteHabit = document.querySelector('.modal_exclude')
        modalDeleteHabit.style.display = 'flex'

        const modalEditHabit = document.querySelector('.edit_habit_modal')
        modalEditHabit.style.display = 'none'

        const editHabitButton = document.querySelector('#save_changes_habit_button')
        editHabitButton.classList.remove(`${editHabitButton.classList[0]}`)

    })

    const closeDeleteHabitButton = document.querySelector('#cancel_action_button')
    closeDeleteHabitButton.addEventListener('click', (e) => {

        const modalDeleteHabit = document.querySelector('.modal_exclude')
        modalDeleteHabit.style.display = 'none'

        const confirmDeletion = document.querySelector('#confirm_action_button')
        confirmDeletion.classList = ''

    })

    const closeEditHabitModalButton2 = document.querySelector('#close_exclude_habit_modal_button')
    closeEditHabitModalButton2.addEventListener('click', (e) => {

        const modalExclude = document.querySelector('.modal_exclude')
        modalExclude.style.display = 'none'

        const confirmDeletion = document.querySelector('#confirm_action_button')
        confirmDeletion.classList = ''

    })

    const confirmDeletion = document.querySelector('#confirm_action_button')
    confirmDeletion.addEventListener('click', async (e) => {

        const habitId = confirmDeletion.classList[0]
        console.log(habitId)

        const apiResponse = await Api.deleteHabit(habitId)

        if (apiResponse.message) {

            const modalDeleteHabit = document.querySelector('.modal_exclude')
            modalDeleteHabit.style.display = 'none'

            const allHabits = await Api.readAllUserHabits()
            const allHabitsSort = allHabits.sort((a, b) => b.habit_id - a.habit_id)
            showHabits(allHabitsSort)

            console.log(apiResponse)

            const allDataa = await Api.readAllUserHabits()
            const allDataSortt = allDataa.sort((a, b) => b.habit_id - a.habit_id)

            showHabits(allDataSortt)

            const confirmDeletion = document.querySelector('#confirm_action_button')
            confirmDeletion.classList = ''

            const confirmEditHabitButton = document.querySelector('#save_changes_habit_button')
            confirmEditHabitButton.classList = ''

        }
    })

}

requestApiToEditHabit()

showMore()

// função para adicionar e remover os valores a serem editados no modal de editar hábito:

function addAndRemoveEditContentModal(e) {

    const editPostButton = document.querySelector('.edit-button');

}

function deleteHabit() {



}
