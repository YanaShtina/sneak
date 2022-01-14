const catalogList = document.querySelector('.catalog-list');
const catalogMoreBtn = document.querySelector('.catalog__more');
const prodModal = document.querySelector('[data-graph-target="prod-modal"] .modal-content');
const prodModalSlider = document.querySelector('.modal-slider .swiper-wrapper');
const prodModalPreview = document.querySelector('.modal-slider .modal-preview');
const prodModalInfo = document.querySelector('.modal-info__wrapper');
const prodModalDescr = document.querySelector('.modal-prod-descr');
const prodModalChars = document.querySelector('.prod-chars');
const prodModalVideo = document.querySelector('.prod-modal__video');
let prodQuantity = 6; // изначальный вывод элементов
let dataLenght = null; // общее число всех элементов

prodModal.addEventListener('click', () => modalOpen)
const prodSlider = new Swiper('.modal-slider__container', {
   slidesPerView: 1,
   spaceBetween: 20
 });

const normalPrice = (str) => {
   return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

if (catalogList) {
   const loadProducts = (quantity = 5) => {
      fetch('../data/data.json')
         .then((response) => {
            return response.json(); // преобразуем жсон в джс
         })
         .then((data) => {
            dataLenght = data.length;
            catalogList.innerHTML = '';
            for (let i = 0; i < dataLenght; i++) {
               if (i < quantity) {
                  let item = data[i];
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
         
   };
      

   loadProducts(prodQuantity);

   const loadModalData = (id = 1) => {
      fetch('../data/data.json')
         .then((response) => {
            return response.json(); // преобразуем жсон в джс
         })
         .then((data) => {
            prodModalSlider.innerHTML = '';
            prodModalInfo.innerHTML = '';
            prodModalDescr.textContent = '';
            prodModalChars.innerHTML = '';
            prodModalVideo.innerHTML = '';
            prodModalPreview.innerHTML = '';
            for (let dataItem of data) {
               if (dataItem.id == id) {
                  const slides = dataItem.gallery.map((image, idx) => {
                     return `
                     <div class="swiper-slide" data-index=${idx}>
                      <img src="${image}" alt="">
                     </div>   `
                  });

                  const preview = dataItem.gallery.map((image, idx) => {
                     return `
                     <div class="modal-preview__item ${idx === 0 ? 'modal-preview__item--active' : ''}" tabindex="0" data-index="${idx}">
                        <img src="${image}" alt="">
                     </div>
                     `
                  })

                  const sizes = dataItem.sizes.map((size, idx) => {
                     return `
                     <li class="modal-sizes__item">
                     <button class="modal-sizes__btn btn-reset">${size}</button>
                  </li>`
                  });

                  prodModalSlider.innerHTML = slides.join('');
                  prodModalPreview.innerHTML = preview.join('');
     

                  prodModalInfo.innerHTML = `
                  <h3 class="modal-info__title">${dataItem.title}</h3>
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
                      ${sizes.join('')}
                     </ul>
                  </div>
                  <div class="modal-info__price">
                     <p class="modal-info__price-current">${dataItem.price} р.</p>
                     <p class="modal-info__price-old">${dataItem.oldPrice ? dataItem.oldPrice + ' р.' : ''} </p> 
                  
                  </div>
                  `
                  prodModalDescr.textContent = dataItem.description;

                  let charsItems = '';

                  Object.keys(dataItem.chars).forEach(function eachKey(key) {
                     charsItems += `<p class="prod-bottom__desc prod-chars__item">
                     ${key} : ${dataItem.chars[key]}
                     </p>`
                  })

                  prodModalChars.innerHTML = charsItems;

                 

                  if (dataItem.video) {
                     prodModalVideo.style.display = 'block';
                     prodModalVideo.innerHTML = `
                  <iframe class="prod-modal__video" src="https://www.youtube.com/embed/6YGbuZ0YnfE"allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  `
                  } else {
                     prodModalVideo.style.display = 'none';
                  }
               }
            }
         })
         .then(() => {
            prodSlider.update();

           prodSlider.on('slideChangeTransitionEnd', function () {
              let idx = document.querySelector('.swiper-slide-active').dataset.index;
               document.querySelectorAll(".modal-preview__item").forEach(el => {
                  el.classList.remove("modal-preview__item--active");
                  document.querySelector(`.modal-preview__item[data-index="${idx}"]`).classList.add("modal-preview__item--active")
               })
            
             });

           document.querySelectorAll(".modal-preview__item").forEach(el => {
               el.addEventListener('click', (e) => {
                  const idx = parseInt(e.currentTarget.dataset.index);
                  document.querySelectorAll(".modal-preview__item").forEach(el => {
                     el.classList.remove('modal-preview__item--active')
                  })
                  el.classList.add('modal-preview__item--active')
                  prodSlider.slideTo(idx)
               });
            });
         });
   };

   catalogMoreBtn.addEventListener('click', (e) => {
      prodQuantity = prodQuantity + 3;

      loadProducts(prodQuantity);

      if (prodQuantity >= dataLenght) {
         catalogMoreBtn.style.display = 'none';
      } else {
         catalogMoreBtn.style.display= 'block'
      }

   })
}

//добавление в корзину
let price = 0;

const cartList = document.querySelector('.mini-cart__list');
const fullPrice = document.querySelector('.mini-cart__sum');
const cartCounter = document.querySelector('.cart__counter');

const PriceWithoutSpaces = (srt) => {
   return srt.replace(/\s/g, '');
}
const plusFullPrice = (currentPrice) => {
   return price += currentPrice;
}
const minusFullPrice = (currentPrice) => {
   return price -= currentPrice;
}
const showFullPrice = () => {
   fullPrice.textContent = `${normalPrice(price)} р.`
   //fullPrice.textContent = `${price} р.`
}
const printQuantity = (num) => {
   cartCounter.textContent = num
}

const loadCart = (id = 1) => {
   fetch('../data/data.json')
      .then((response) => {
         return response.json();
      })
      .then((data) => {
        
         for (let dataItem of data) {
            if (dataItem.id == id) {
               //console.log(dataItem)
               cartList.insertAdjacentHTML('afterbegin', `
               <li class="mini-cart__item" data-id= "${dataItem.id}">
               <article class="mini-cart__product mini-product">
                 <div class="mini-product__img">
                   <img src="${dataItem.mainImage}" alt="${dataItem.title}">
                 </div>
                 <div class="mini-product__content">
                   <div class="mini-product__text">
                     <h3 class="mini-product__title">${dataItem.title}</h3>
                     <p class="mini-product__price">${normalPrice(dataItem.price)} р.</p>
                   </div>
                   <button class="btn-reset mini-product__delete"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M18.5715 2.85715H13.5715V2.14285C13.5715 0.959387 12.6121 0 11.4287 0H8.57152C7.38805 0 6.42867 0.959387 6.42867 2.14285V2.85715H1.42865C1.03415 2.85715 0.714355 3.17695 0.714355 3.57145C0.714355 3.96595 1.03419 4.28571 1.42865 4.28571H2.20506L3.57151 19.3507C3.6052 19.7196 3.91537 20.0015 4.28581 20H15.7144C16.0848 20.0015 16.395 19.7196 16.4287 19.3507L17.7951 4.28571H18.5715C18.966 4.28571 19.2858 3.96591 19.2858 3.57141C19.2858 3.17691 18.966 2.85715 18.5715 2.85715ZM7.85722 2.14285C7.85722 1.74835 8.17702 1.42856 8.57152 1.42856H11.4287C11.8232 1.42856 12.143 1.74835 12.143 2.14285V2.85715H7.85726V2.14285H7.85722ZM15.0622 18.5714H4.93796L3.64295 4.28571H7.14296H16.3608L15.0622 18.5714Z" fill="#4D4D4D" fill-opacity="0.3"/>
                     <path d="M7.8573 16.381C7.85722 16.38 7.85717 16.379 7.85709 16.378L7.14279 6.37805C7.11479 5.98355 6.77227 5.68647 6.3778 5.71447C5.9833 5.74247 5.68623 6.085 5.71423 6.47946L6.42853 16.4794C6.45519 16.854 6.76733 17.144 7.14283 17.143H7.19427C7.58781 17.1157 7.88467 16.7745 7.8573 16.381Z" fill="#4D4D4D" fill-opacity="0.3"/>
                     <path d="M9.99994 5.71436C9.60544 5.71436 9.28564 6.03415 9.28564 6.42865V16.4286C9.28564 16.8231 9.60544 17.1429 9.99994 17.1429C10.3944 17.1429 10.7142 16.8231 10.7142 16.4286V6.42865C10.7142 6.03415 10.3944 5.71436 9.99994 5.71436Z" fill="#4D4D4D" fill-opacity="0.3"/>
                     <path d="M13.6219 5.71423C13.2274 5.68623 12.8849 5.9833 12.8569 6.3778L12.1426 16.3778C12.1137 16.7712 12.4091 17.1136 12.8026 17.1425C12.8038 17.1426 12.8049 17.1427 12.8062 17.1428H12.8569C13.2324 17.1437 13.5445 16.8537 13.5712 16.4792L14.2855 6.47921C14.3135 6.08475 14.0164 5.74227 13.6219 5.71423Z" fill="#4D4D4D" fill-opacity="0.3"/>
                     </svg>
                     </button>
                 </div>
               </article>
             </li>
               `)

               return(dataItem)
            };
         }
      })
     .then((item) => {
      console.log(item.price)
        plusFullPrice(item.price);
        showFullPrice();
        
        
        let num = document.querySelectorAll('.mini-cart__list .mini-cart__item').length;
        if (num > 0) {
         cartCounter.classList.add('cart__counter--visible')
        }
        printQuantity(num)
   }  
   )
      };


const cartLogic = () => {
   
   const productBtn = document.querySelectorAll('.product__btn--add');
   //console.log(productBtn)
   productBtn.forEach(el => {
      el.addEventListener('click', (e) => {
         const id = e.currentTarget.dataset.id;
         loadCart(id);
     
            e.currentTarget.classList.add('product__btn--add--disabled')
   })  
   })

cartList.addEventListener('click', (e) => {
      if (e.target.classList.contains('mini-product__delete')) {
      
         const self = e.target
         console.log(self)
         const parent = self.closest('.mini-cart__item')
         //console.log(parent )
       
         
         const price =parseInt(PriceWithoutSpaces(document.querySelector('.mini-product__price').textContent) )
         //console.log( price)

         const id = parent.dataset.id
         document.querySelector(`.product__btn--add[data-id="${id}"]`).classList.remove('product__btn--add--disabled')
         parent.remove();
         console.log(minusFullPrice(price));;
         showFullPrice();
        
         const MiniCartModal = document.querySelector('.mini-cart');
         let num = document.querySelectorAll('.mini-cart__list .mini-cart__item').length;
            if (num == 0) {
               cartCounter.classList.remove('cart__counter--visible')
                console.log( 'tut')
               MiniCartModal.classList.remove('mini-cart--opened')
            }
         printQuantity(num)
         
      
      }
      //const productBtnDisabled = document.querySelector('.product__btn--disabled')
     // console.log(productBtnDisabled )
      //productBtnDisabled.classList.remove('product__btn--disabled')
   })

}

const openOrderModalBtn = document.querySelector('.mini-cart__btn')
const cartModalOrderList = document.querySelector('.cart-modal-order__list')
const cartModalOrderQuantity = document.querySelector('.cart-modal-order__quantity span')
const cartModalOrderSum = document.querySelector('.cart-modal-order__sum span')
const cartModalOrderBtn = document.querySelector('.cart-modal-order__btn')


openOrderModalBtn.addEventListener('click', () => {
   const miniCartList = document.querySelector('.mini-cart__list').innerHTML
   cartModalOrderList.innerHTML = miniCartList
   cartModalOrderQuantity.textContent = document.querySelectorAll('.mini-cart__list .mini-cart__item').length;
   cartModalOrderSum.textContent = fullPrice.textContent
})

cartModalOrderBtn.addEventListener('click', () => {
   if (cartModalOrderList.classList.contains('cart-modal-order__list--open')) {
      cartModalOrderList.classList.remove('cart-modal-order__list--open')
      cartModalOrderBtn.classList.remove('cart-modal-order__btn--open')
   } else
    {
      cartModalOrderList.classList.add('cart-modal-order__list--open')
      cartModalOrderBtn.classList.add('cart-modal-order__btn--open')
      }
  }
)

// cartModalOrderList.addEventListener('click', (e) => {
//    if (e.target.classList.contains('mini-product__delete')) {
//       console.log('я кнопка удаления товара')
//       const self = e.target;
//       const parent = self.closest('.mini-cart__item')
//       const price = parseInt(PriceWithoutSpaces(parent.querySelector('.mini-product__price').textContent))
//       const id = parent.dataset.id;
//       setTimeout(() => {
//          parent.remove();
//       }, 100)
//       minusFullPrice(price);
//       showFullPrice();

//       // cartModalOrderSum.innerHTML = fullPrice.innerHTML;
//       // cartModalOrderQuantity.innerHTML = cartCounter.innerHTML;

//       // cartModalOrderQuantity.textContent = 'доделать'
         
//    }
   
// })
 





