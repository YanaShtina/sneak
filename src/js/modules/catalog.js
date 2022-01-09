const catalogList = document.querySelector('.catalog-list');
let prodQuantity = 6;
const catalogMoreBtn = document.querySelector('.catalog__more');
//let dataLenght = null
const modalSlider = document.querySelector('.modal-slider__container swiper-wrapper');
const modalPreview = document.querySelector('.modal-preview')
const modalInfo = document.querySelector('.modal-info');
const modalDescr = document.querySelector('.modal-prod-descr');
const modalChars = document.querySelector('.prod-chars');
const modalVideo = document.querySelector('.prod-modal__video');

//console.log(modalInfo)
   const loadProducts = (quantity = 3) => {
      dataAll = fetch('./data/data.json')
      .then((response) => {
      //console.log(response.status)
       return response.json()
       
   })
     .then((productsData) => {
       productsDataLength = productsData.length
        //console.log(productsDataLength)
        catalogList.innerHTML = '';
        
        for (let i = 0; i < productsDataLength; i++)
        {
           if (i < quantity)
           {
            let prodItem = productsData[i];
            catalogList.innerHTML += `<li class="catalog-list__item ">
            <article>
               <div class="product__img">
                  <img src="${prodItem.mainImage}" alt="${prodItem.title}">
                  <div class="product__btns">
                     <button class="btn-reset product__btn product__btn--show" data-id = "${prodItem.id}" aria-label="Показать информацию о товаре" data-path = "modal-prod">
                     <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9518 10.0664C16.9518 12.2489 15.1818 14.0176 12.9993 14.0176C10.8168 14.0176 9.0481 12.2489 9.0481 10.0664C9.0481 7.88264 10.8168 6.11389 12.9993 6.11389C15.1818 6.11389 16.9518 7.88264 16.9518 10.0664Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9975 19.1936C17.7575 19.1936 22.1113 15.7711 24.5625 10.0661C22.1113 4.3611 17.7575 0.938599 12.9975 0.938599H13.0025C8.2425 0.938599 3.88875 4.3611 1.4375 10.0661C3.88875 15.7711 8.2425 19.1936 13.0025 19.1936H12.9975Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>  </button>
     
                     <button class="btn-reset product__btn product__btn--add" data-id = "${prodItem.id}" aria-label="Добавить товар в корзину" data-path="modal-cart"><svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 6.57893H16.6038L13.0359 0.319309C12.8589 0.0083658 12.475 -0.093156 12.1784 0.0938088C11.8823 0.280773 11.7865 0.684867 11.9641 0.996475L15.1461 6.57893H4.85388L8.03587 0.996431C8.21348 0.684823 8.11767 0.280729 7.82164 0.0937645C7.52439 -0.0932003 7.14173 0.00832153 6.96411 0.319265L3.39617 6.57888H0V7.89468H1.35651L2.94432 16.8103C3.11033 17.7438 3.88547 18.421 4.78761 18.421H15.2124C16.1145 18.421 16.8896 17.7438 17.055 16.811L18.6434 7.89468H20C20 7.89468 20 6.57893 20 6.57893ZM15.8264 16.5688C15.7715 16.8797 15.5133 17.1053 15.2124 17.1053H4.78761C4.4867 17.1053 4.22854 16.8798 4.173 16.5681L2.62789 7.89468H17.3721L15.8264 16.5688Z" fill="white"/>
                        </svg></button>
                  </div>
               </div>
               <h3 class="product__title">"${prodItem.title}"</h3>
               <span class="product__price"> ${prodItem.price} р </span>
            </article>
         </li>
            ` 
         }
     
        }
        const btns = document.querySelectorAll(".product__btn")
        const modal = document.querySelector(".modal")
        const containerModals = document.querySelectorAll(".modal__container")
        const body = document.body
        
        function disableScroll() {
         let positionY = window.scrollY
    //     console.log(positionY)
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
        modalOpen() 
       
     })
         
      .catch(() => {
       console.log( 'Неok' )
      }) 
}
   

   loadProducts(prodQuantity)
   //подрузка в модалку
   const loadModal = (id = 1) => {
         fetch('./data/data.json')
         .then((response) => {
         //console.log(response.status)
          return response.json()
         })
         .then((modalData) => {
           console.log(modalData)
            modalInfo.innerHTML = ''
            modalDescr.innerHTML = ''
            modalChars.innerHTML = ''
            modalVideo.innerHTML = ''

            for (let modalDataItem of modalData) {
               if (modalDataItem.id == id) {
                 // console.log(modalDataItem.title)
                  modalInfo.innerHTML = `
                  <h3 class="modal-info__title">${modalDataItem.title}</h3>
                  <div class="modal-info__rate">
                     <img src="img/star.svg" alt="Рейтинг 5 из 5">
                     <img src="img/star.svg">
                     <img src="img/star.svg">
                     <img src="img/star.svg">
                     <img src="img/star.svg">
                  </div>
                  <div class="modal-info__sizes">
                     <p class="modal-info__subtitle">Выберите размер</p>
                     <ul class="list--reset modal-info__sizes-list modal-sizes">
                     // sizes
                     </ul>
                  </div>
                  <div class="modal-info__price">
                     <p class="modal-info__price-current">${modalDataItem.price} р.</p>
                     <p class="modal-info__price-old">${modalDataItem.oldPrice ? modalDataItem.oldPrice + ' р.' : ''} </p> 
                  
                  </div>
                  `
                  modalDescr.textContent = modalDataItem.description

                  modalChars.innerHTML += ``
               }
               
            }
         })
      }

      loadModal()






   // подгрузка на кнопку показать еще
   catalogMoreBtn.addEventListener('click', () => {
      prodQuantity = prodQuantity + 3;
      loadProducts(prodQuantity);
     // console.log(productsDataLength)
      if (prodQuantity >= productsDataLength) {
         catalogMoreBtn.style.display = 'none';
      } else {
         catalogMoreBtn.style.display= 'block'       
      }
   })
      





