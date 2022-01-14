const cartBtn = document.querySelector('.cart__btn')
const cartMini = document.querySelector('.mini-cart')
cartBtn.addEventListener('click', () => {
   cartMini.classList.toggle('mini-cart--opened')
  
})


document.addEventListener('click', (e) => {
   if (!e.target.classList.contains('mini-cart') &&
      !e.target.closest('mini-cart') &&
      !e.target.classList.contains('cart__btn') &&
      !e.target.classList.contains('mini-product__delete'))
       {
      cartMini.classList.remove('mini-cart--opened')
   }

})

const cartOpenBtn = document.querySelector('.mini-cart__btn')
//console.log(cartOpenBtn)
function modalOpenCart() {
   cartOpenBtn.addEventListener('click', (e) => {
      let path = e.currentTarget.getAttribute('data-path');
      const test = document.querySelector(`[data-target="${path}"]`).classList.add('modal__container--open');
      modal.classList.add("modal--open")
      disableScroll()
   })
   
}
modalOpenCart ()