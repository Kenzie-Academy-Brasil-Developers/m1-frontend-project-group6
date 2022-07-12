// script da página de login do usuário
import { Api } from '/src/js/controllers/Api.controller.js'
console.log('olá, mundo!')


const data = {
    "email": "grupo6Bert@mail.com",
    "password": "82cf6d8e7e0fe6cf1a6770b0a7abb838"
}
console.log(await Api.userLogin(data))