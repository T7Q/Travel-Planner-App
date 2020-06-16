import { handleSubmit } from './js/formHandler'
import { updateUI } from './js/updateUI'

import './styles/style.scss'

import city from './img/polynesia.jpg'
import linkedin from './img/linkedin.png'
import fb from './img/facebook.png'
import tw from './img/twitter.png'
import rain from './img/rain.png'


window.addEventListener('click', handleSubmit);

export {
    handleSubmit,
    updateUI
}