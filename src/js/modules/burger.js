const burger = document.querySelector('.burger')
const nav = document.querySelector('.header__nav-mobile')

burger.addEventListener('click', () => {
   burger.classList.toggle('burger--active')
   nav.classList.toggle('header__nav-mobile--active') 
})