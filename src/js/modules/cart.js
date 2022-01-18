const cartBtn = document.querySelector('.cart__btn')
const cartMini = document.querySelector('.mini-cart')
const closeBtn = document.querySelector('.modal__close')
cartBtn.addEventListener('click', () => {
   if (!miniCartList.children.length == 0) {
      cartMini.classList.toggle('mini-cart--opened')
      //console.log(miniCartList.children.length)
   }
   else {
      alert('Корзина пуста, пожалуйста, добавьте товары')
   }
  
})
//console.log(closeBtn)
// closeBtn.addEventListener('click', (e) => {
//    document.querySelector('.modal').classList.remove('modal--open')
     
// })
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
modalOpenCart()

//* финальное оформление заказа*/



