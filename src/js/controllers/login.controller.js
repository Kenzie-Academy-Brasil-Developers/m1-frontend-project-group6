// script da página de login do usuário
import { Api } from "./Api.controller.js"

const btnLogin = document.querySelector('button')
btnLogin.addEventListener('click', async (e) => {
    e.preventDefault()

    const inputs = document.querySelector('form').elements

    const content = {
        email:    inputs[0].value,
        password: inputs[1].value
    }
   
    const login = await Api.userLogin(content)

    if (login.message) {
        alert(login.message)
    }

    else {
        window.location.href += 'src/pages/user.page.html'
    }
})
