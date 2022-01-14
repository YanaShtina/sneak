const catalogList = document.querySelector('.catalog-list');
console.log(catalogList)
const loadProducts = (quantity = 5) => {
   fetch('./data/data.json')
      .then((response) => {
         return response.json(); // преобразуем жсон в джс
      })
    
      .then((data) => {
         //console.log(data)
         dataLenght = data.length;
         catalogList.innerHTML = 'dfdfdfd';
         const btnforModal = document.querySelectorAll('.product__btn')
         console.log(btnforModal)
         for (let i = 0; i < dataLenght; i++) {
            if (i < quantity) {
               let item = data[i];
              // console.log(data[i])
               catalogList.innerHTML += `
               <li class="catalog-list__item ">
               <article>
                  <div class="product__img">
                     <img src="${item.mainImage}" alt="${item.title}">
                     <div class="product__btns">
                        <button class="btn-reset product__btn product__btn--show" data-id = "${item.id}" aria-label="Показать информацию о товаре" data-graph-path = "prod-modal">
                        <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9518 10.0664C16.9518 12.2489 15.1818 14.0176 12.9993 14.0176C10.8168 14.0176 9.0481 12.2489 9.0481 10.0664C9.0481 7.88264 10.8168 6.11389 12.9993 6.11389C15.1818 6.11389 16.9518 7.88264 16.9518 10.0664Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                           <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9975 19.1936C17.7575 19.1936 22.1113 15.7711 24.5625 10.0661C22.1113 4.3611 17.7575 0.938599 12.9975 0.938599H13.0025C8.2425 0.938599 3.88875 4.3611 1.4375 10.0661C3.88875 15.7711 8.2425 19.1936 13.0025 19.1936H12.9975Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                           </svg>  </button>

                        <button class="btn-reset product__btn product__btn--add" data-id = "${item.id}" aria-label="Добавить товар в корзину"><svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M20 6.57893H16.6038L13.0359 0.319309C12.8589 0.0083658 12.475 -0.093156 12.1784 0.0938088C11.8823 0.280773 11.7865 0.684867 11.9641 0.996475L15.1461 6.57893H4.85388L8.03587 0.996431C8.21348 0.684823 8.11767 0.280729 7.82164 0.0937645C7.52439 -0.0932003 7.14173 0.00832153 6.96411 0.319265L3.39617 6.57888H0V7.89468H1.35651L2.94432 16.8103C3.11033 17.7438 3.88547 18.421 4.78761 18.421H15.2124C16.1145 18.421 16.8896 17.7438 17.055 16.811L18.6434 7.89468H20C20 7.89468 20 6.57893 20 6.57893ZM15.8264 16.5688C15.7715 16.8797 15.5133 17.1053 15.2124 17.1053H4.78761C4.4867 17.1053 4.22854 16.8798 4.173 16.5681L2.62789 7.89468H17.3721L15.8264 16.5688Z" fill="white"/>
                           </svg></button>
                     </div>
                  </div>
                  <h3 class="product__title">"${item.title}"</h3>
                  <span class="product__price"> ${normalPrice(item.price)} р </span>
               </article>
            </li>
               `;
            }
         }
         const productsBtns = document.querySelectorAll('.product__btn');

         productsBtns.forEach(el => {
           //console.log(el)
           el.addEventListener('focus', (e) => {
            let parent = e.currentTarget.closest('.product__btns');
          //  console.log(parent)
            parent.classList.add('product__btns--active');
           }, true);
            
           el.addEventListener('blur', (e) => {
            let parent = e.currentTarget.closest('.product__btns');
           // console.log(parent)
            parent.classList.remove('product__btns--active');
           }, true);
            
            
         })
         cartLogic();
         const modal = new GraphModal({
            isOpen: (modal) => {
               if (modal.modalContainer.classList.contains('prod-modal')) {
                  //  console.log('ok')
                  const openBtnId = modal.previousActiveElement.dataset.id;
                  loadModalData(openBtnId);
                  prodSlider.update();
               }
            
            },
         });
      })
      .catch(() => {
         console.log('ne ok')
      })
};
loadProducts()