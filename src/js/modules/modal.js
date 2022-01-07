const btns = document.querySelectorAll(".product__btn")
const modal = document.querySelector(".modal")
const containerModal = document.querySelector(".modal__containe")
//console.log(prodModal)
btns.forEach((el) => {
   el.addEventListener('click', (e) => {
      let path = e.currentTarget.getAttribute('data-path');
     // console.log(path)
      const test = document.querySelector(`[data-target="${path}"]`).classList.add('modal__container--open');
         //
     //if (path.classList.contains('product__btn--show')){
     //   console.log(test)
         modal.classList.add("modal--open")
      
      //}
      //console.log(path)
         //.getAttribute('data-path');
      //modal.classList.add("modal--open")
   })
})
modal.addEventListener('click', (e) => {
   console.log(e.path)
//    if (!e.currentTarget.classList.contains('.modal__container--open')) {
//       modal.classList.remove("modal--open")
// }
  
})
