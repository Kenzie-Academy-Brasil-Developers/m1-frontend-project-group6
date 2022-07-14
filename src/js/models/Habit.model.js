import { Api } from "../controllers/Api.controller.js"

export class Habit {
    constructor(id, title, description, category, status){
        this.id          =  id
        this.title       =  title
        this.description =  description
        this.category    =  category
        this.status      =  status
    }
    
    createTemplate() {

        if (this.status == true) {

            const tr          = document.createElement('tr')

            const status      = document.createElement('td')
            const btnSelect   = document.createElement('button')

            const title       = document.createElement('td')
            const description = document.createElement('td')

            const category    = document.createElement('td')
            const spanCateg   = document.createElement('span')

            const edit        = document.createElement('td')
            const editImg     = document.createElement('img')

            status.classList.add('habit_status')
            title.classList.add('habit_title')
            description.classList.add('habit_description')
            category.classList.add('habit_category')
            edit.classList.add('habit_edit')
            
            title.innerText       = this.title
            description.innerText = this.description
            spanCateg.innerText    = this.category

            editImg.src = 'src/assets/img/editDots.svg'

            const imgCheck = document.createElement('img')
            imgCheck.src   = 'src/assets/img/checkSignal.svg'
            
            btnSelect.id = 'concluded'
            btnSelect.classList.add('btn_selectHabit-Concluded')
            btnSelect.appendChild(imgCheck)

            tr.style.backgroundColor = '#F1F3F5'

            title.style.textDecoration = 'line-through'

            editImg.addEventListener('click', (e) => {
                const menuEdit = document.getElementsByClassName('edit_habit_modal')[0]
                menuEdit.style.display = 'flex'
            })

            status.appendChild(btnSelect)
            category.appendChild(spanCateg)
            edit.appendChild(editImg)
            tr.append(status, title, description, category, edit)

            return tr
        }

        else {

            const tr          = document.createElement('tr')

            const status      = document.createElement('td')
            const btnSelect   = document.createElement('button')
    
            const title       = document.createElement('td')
            const description = document.createElement('td')
    
            const category    = document.createElement('td')
            const spanCateg   = document.createElement('span')
    
            const edit        = document.createElement('td')
            const editImg     = document.createElement('img')
    
            status.classList.add('habit_status')
            btnSelect.classList.add('btn_selectHabit')
            title.classList.add('habit_title')
            description.classList.add('habit_description')
            category.classList.add('habit_category')
            edit.classList.add('habit_edit')
            
            title.innerText       = this.title
            description.innerText = this.description
            spanCateg.innerText    = this.category
    
            editImg.src = 'src/assets/img/editDots.svg'
    
            const imgCheck = document.createElement('img')
            imgCheck.src   = 'src/assets/img/checkSignal.svg'
            
            btnSelect.addEventListener('click', async (e) => {
                e.preventDefault()
    
                if (btnSelect.id !== 'concluded') {
                    btnSelect.id = 'concluded'

                    btnSelect.classList.add('btn_selectHabit-Concluded')
        
                    btnSelect.appendChild(imgCheck)
        
                    tr.style.backgroundColor = '#F1F3F5'
        
                    await Api.completeHabit(this.id)
                } 
            })

            editImg.addEventListener('click', (e) => {
                const menuEdit = document.getElementsByClassName('edit_habit_modal')[0]
                menuEdit.style.display = 'flex'
            })

            status.appendChild(btnSelect)
            category.appendChild(spanCateg)
            edit.appendChild(editImg)
            tr.append(status, title, description, category, edit)

            return tr
        }
    }
}
