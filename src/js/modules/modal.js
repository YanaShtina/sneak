const btns = document.querySelectorAll(".btn__for-modal")
const modal = document.querySelector(".modal")
const containerModals = document.querySelectorAll(".modal__container")
const body = document.body

function disableScroll() {
   let positionY = window.scrollY
  // console.log(positionY)
   body.classList.add('disable-scroll')
   document.body.dataset.position = positionY;
	document.body.style.top = -positionY + 'px';
}
function enableScroll() {
   let positionY1 = parseInt(document.body.dataset.position, 10);
  document.body.style.top = 'auto';
   body.classList.remove('disable-scroll')
   window.scroll(0, positionY1);
	//body.removeAttribute('data-position');
}
function modalOpen (){
   btns.forEach((el) => {
      el.addEventListener('click', (e) => {
         let path = e.currentTarget.getAttribute('data-path');
         const test = document.querySelector(`[data-target="${path}"]`).classList.add('modal__container--open');
         modal.classList.add("modal--open")
         disableScroll()
      })
      
   })
}


modal.addEventListener('click', (e) => {
  
   if (e.target == modal) {
     modal.classList.remove("modal--open")
      containerModals.forEach(el => {
         el.classList.remove('modal__container--open')
         enableScroll()
      })   
   }
})



  

