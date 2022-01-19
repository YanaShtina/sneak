const burger = document.querySelector('.burger')
const nav = document.querySelector('.header__nav-mobile')

burger.addEventListener('click', () => {
   burger.classList.toggle('burger--active')
   nav.classList.toggle('header__nav-mobile--active') 
})
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




const catalogList = document.querySelector('.catalog-list');
let prodQuantity = 6;
const catalogMoreBtn = document.querySelector('.catalog__more');
//let dataLenght = null
const modalSlider = document.querySelector('.modal-slider__container .swiper-wrapper');
const modalPreview = document.querySelector('.modal-preview')
const modalInfo = document.querySelector('.modal-info__wrapper');
const modalDescr = document.querySelector('.modal-prod-descr');
const modalChars = document.querySelector('.prod-chars');
const modalVideo = document.querySelector('.prod-modal__video');


// const btnforModal = document.querySelectorAll('.product__btn')
// console.log(btnforModal)
// слайдер внутри модалки
const prodSlider = new Swiper('.modal-slider__container', {
   slidesPerView: 1,
   spaceBetween: 20
});
//console.log(catalogList)
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
            //   У КНОПКИ ДОБАВЛЕНИЯ УДАЛЕНО data-path="modal-cart"
            catalogList.innerHTML += `<li class="catalog-list__item ">
            <article>
               <div class="product__img">
                  <img src="${prodItem.mainImage}" alt="${prodItem.title}">
                  <div class="product__btns">
                     <button class="btn-reset btn__for-modal product__btn product__btn--show" data-id = "${prodItem.id}" aria-label="Показать информацию о товаре" data-path = "modal-prod">
                     <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.9518 10.0664C16.9518 12.2489 15.1818 14.0176 12.9993 14.0176C10.8168 14.0176 9.0481 12.2489 9.0481 10.0664C9.0481 7.88264 10.8168 6.11389 12.9993 6.11389C15.1818 6.11389 16.9518 7.88264 16.9518 10.0664Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9975 19.1936C17.7575 19.1936 22.1113 15.7711 24.5625 10.0661C22.1113 4.3611 17.7575 0.938599 12.9975 0.938599H13.0025C8.2425 0.938599 3.88875 4.3611 1.4375 10.0661C3.88875 15.7711 8.2425 19.1936 13.0025 19.1936H12.9975Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>  </button>
     
                     <button class="btn-reset product__btn product__btn--add" data-id = "${prodItem.id}" aria-label="Добавить товар в корзину" 
                     ><svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        const btns = document.querySelectorAll(".btn__for-modal")
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
        OpenModalLoad()
        addToCart()
        modalOpen() 
       
     })
         
      .catch(() => {
       console.log( 'Неok' )
      }) 
}

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

loadProducts(prodQuantity)

   //подрузка в модалку
   const loadModal = (id=1) => {
         fetch('./data/data.json')
         .then((response) => {
         //console.log(response.status)
          return response.json()
         })
            .then((modalData) => {
              // testGetBtn()
          // console.log(modalData)
          modalSlider.innerHTML = ''
            modalInfo.innerHTML = ''
            modalDescr.innerHTML = ''
            modalChars.innerHTML = ''
            modalVideo.innerHTML = ''
          
           //console.log(btnIdAll)
            for (let modalDataItem of modalData) {
               if (modalDataItem.id == id) {
                 // console.log(modalDataItem.title)
                  const sliderModal = modalDataItem.gallery.map((img,index) => {
                     return  ` 
                     <div class="swiper-slide" data-index=${index}>
                    <img src="${img}" alt="">
                 </div>`
                  })
                  modalSlider.innerHTML = sliderModal.join('');

                  const sliderPreview = modalDataItem.gallery.map((img, index) => {
                     return `
                     <div class="modal-preview__item ${index === 0 ? 'modal-preview__item--active' : ''}" data-index="${index}">
                     <img src="${img}" alt="">
                  </div>`
                  })
                  modalPreview.innerHTML = sliderPreview.join('');


                 // console.log(sliderModal)
                  const sizes = modalDataItem.sizes.map((size) => {
                     return `
                     <li class="modal-sizes__item">
                     <button class="modal-sizes__btn btn-reset">${size}</button>
                  </li>`
                  })
                  //console.log(sizes)

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
                     ${sizes.join('')}
                     </ul>
                  </div>
                  <div class="modal-info__price">
                     <p class="modal-info__price-current">${modalDataItem.price} р.</p>
                     <p class="modal-info__price-old">${modalDataItem.oldPrice ? modalDataItem.oldPrice + ' р.' : ''} </p> 
                  
                  </div>
                  `
                  modalDescr.textContent = modalDataItem.description

                  modalChars.innerHTML += ``
                  if (modalDataItem.video) {
                     modalVideo.style.display = 'block'
                     modalVideo.innerHTML +=`      <iframe class="prod-modal__video" src="https://www.youtube.com/embed/6YGbuZ0YnfE"allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                     `
                  } else {
                     modalVideo.style.display = 'none'
                  }
                 // console.log(modalDataItem.video)
               // console.log(modalDataItem.description)

                  let chsrsItem = '';

                 Object.keys(modalDataItem.chars).forEach((key) => {
                    //console.log(chsrsItem)
                    chsrsItem += `<p class="prod-bottom__desc prod-chars__item">
                    ${key} : ${modalDataItem.chars[key]}
                    </p>`
                 //   console.log(key)
                 })
                 modalChars.innerHTML = chsrsItem
               }
               
            }
         })
         .then(() => {
               prodSlider.update();
            const AllPreview = document.querySelectorAll('.modal-preview__item').forEach((el) => {
               el.addEventListener('click', (e) => {
                  let previewIndex = parseInt(e.currentTarget.dataset.index)

                  document.querySelectorAll('.modal-preview__item').forEach((el) => {
                     el.classList.remove('modal-preview__item--active')
                  })
                  el.classList.add('modal-preview__item--active')
                 // console.log(previewIndex)
                  prodSlider.slideTo(previewIndex)
                  })
            })
            
            prodSlider.on('slideChangeTransitionEnd', () => {
               let activeSlide = document.querySelector('.swiper-slide-active').dataset.index;

               let activePreview = document.querySelectorAll('.modal-preview__item').forEach((el) => {
                  el.classList.remove('modal-preview__item--active')

                  let test = document.querySelector(`.modal-preview__item[data-index="${activeSlide}"]`).classList.add('modal-preview__item--active')
                // console.log(test)
               }) 
            })      
         })
      }

const OpenModalLoad = () => {
   const ProdBtnAll = document.querySelectorAll('.product__btn--show')
   ProdBtnAll.forEach((el) => {
     
       el.addEventListener('click', (event) => {
           let btnId = event.currentTarget.dataset.id
        //console.log(btnId)
        loadModal(btnId)
        })
   })   
}
  

//* ЗАГРКЗКА В КОРЗИНУ*/
const miniCart = document.querySelector('.mini-cart')
const miniCartList = document.querySelector('.mini-cart__list')
const cartCounter = document.querySelector('.cart__counter')
const miniCartSum = document.querySelector('.mini-cart__sum')
let sumOfPrice = 0



const sumPrice = (price) => {
   miniCartSum.textContent = `${sumOfPrice+= price}  р.` 
}

const showQuantity = (miniCartItem) => {
   cartCounter.classList.add('cart__counter--visible')
    cartCounter.textContent = miniCartItem   
}

const loadCart = (btnAddId) => {
 
   let data = fetch('./data/data.json')
      .then((response) => {
         return response.json()
    
      })
      .then((cartData) => {
       //console.log(cartData)
       
         for (let dataItem of cartData) {
           
            if (dataItem.id == btnAddId) {
               miniCartList.insertAdjacentHTML('afterBegin', `
            <li class="mini-cart__item" data-id= "${dataItem.id}">
            <article class="mini-cart__product mini-product">
              <div class="mini-product__img">
                <img src="${dataItem.mainImage}" alt="${dataItem.title}">
              </div>
              <div class="mini-product__content">
                <div class="mini-product__text">
                  <h3 class="mini-product__title">${dataItem.title}</h3>
                  <p class="mini-product__price">${dataItem.price} р.</p>
                </div>
              </div>
            </article>
          </li>
            ` )
            return dataItem
            }
            
         }
         
      })
      .then((CartItem) => {
         const miniCartItem = document.querySelectorAll('.mini-cart__item').length
         showQuantity(miniCartItem)
         sumPrice(CartItem.price)
        
      })
   .then(() => {
      {
         
         const miniCartQuantity = [...document.querySelectorAll('.mini-cart__item')]
         const miniCartSum = document.querySelector('.cart-modal-order__sum span')
         const cartModalOrderQuantity = document.querySelector('.cart-modal-order__quantity span')

         const miniCartShowBtn = document.querySelector('.cart-modal-order__btn--show')
         const cartModalOrderList = document.querySelector('.cart-modal-order__list')
       
         cartModalOrderQuantity.textContent = miniCartQuantity.length + ' шт.'
         miniCartSum.textContent = sumOfPrice + ' p.'

         const miniCartArr = miniCartQuantity
         
        // console.log(miniCartArr)

         miniCartShowBtn.addEventListener('click', (e) => {
        
            //cartModalOrderList.innerHTML = 'dfd'
           const prodListForCopy = document.querySelector('.mini-cart__list').innerHTML
            //console.log(prodListForCopy)
          cartModalOrderList.innerHTML = prodListForCopy
          cartModalOrderList.classList.toggle('cart-modal-order__list--open')
         })

         //console.log(miniCartShowBtn)
         


   //console.log(cartModalOrderQuantity.textContent)
      }
   }) 
    
}


const addToCart = () => {
   const btnAdd = [...document.querySelectorAll('.product__btn--add')]
   //console.log(btnAdd)
   btnAdd.forEach((key) => {
      key.addEventListener('click', (e) => {
         //console.log('Я кнопка в корзину')
         const btnAddId = e.currentTarget.dataset.id
         //console.log(btnAddId)
        loadCart (btnAddId)
      })
   })
}





 




 
document.addEventListener('DOMContentLoaded', () => {
	const accordions = document.querySelectorAll('.faq-accordion');

	accordions.forEach(el => {
		el.addEventListener('click', (e) => {
			//console.log('faq works')
			const self = e.currentTarget;
			//console.log(self)
			const control = self.querySelector('.faq-accordion__control');
			const content = self.querySelector('.faq-accordion__content');

			self.classList.toggle('open');

			// если открыт аккордеон
			if (self.classList.contains('open')) {
				control.setAttribute('aria-expanded', true);
				content.setAttribute('aria-hidden', false);
				content.style.maxHeight = content.scrollHeight + 'px';
			} else {
				control.setAttribute('aria-expanded', false);
				content.setAttribute('aria-hidden', true);
				content.style.maxHeight = null;
			}
		});
	});
});


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
  
   if (e.target == modal || e.target.classList.contains('modal__close')) {
     modal.classList.remove("modal--open")
      containerModals.forEach(el => {
         el.classList.remove('modal__container--open')
         enableScroll()
      })   
   }
})



  


const quizData = [
	{
   number: 1,
   title: "Какой тип кроссовок рассматриваете?",
   answer_alias: "type",
   answers: [{
         answer_title: "Вариант 1",
         type: "checkbox"
      },
      {
         answer_title: "Вариант 2",
         type: "checkbox"
      },
      {
         answer_title: "Вариант 3",
         type: "checkbox"
      },
      {
         answer_title: "Вариант 4",
         type: "checkbox"
      },
      {
         answer_title: "Вариант 5",
         type: "checkbox"
      },
      {
         answer_title: "Вариант 5",
         type: "checkbox"
      },
   ]
},
{
   number: 2,
   title: "Какой размер вам подойдет?",
   answer_alias: "size",
   answers: [{
         answer_title: "менее 36",
         type: "checkbox"
      },
      {
         answer_title: "36-38",
         type: "checkbox"
      },
      {
         answer_title: "39-41",
         type: "checkbox"
      },
      {
         answer_title: "42-44",
         type: "checkbox"
      },
      {
         answer_title: "45 и больше",
         type: "checkbox"
      },
   ]
},
{
   number: 3,
   title: "Уточните какие-либо моменты",
   answer_alias: "message",
   answers: [{
      answer_title: "Введите сообщение",
      type: "textarea"
   },
   ]
   },
];


const quizTemplate = (data = [], dataLength = 0, options) => {
	const {number, title} = data;
	const {nextBtnText} = options;
	const answers = data.answers.map(item => {

		if (item.type === 'checkbox') {
			return `
		<li class="quiz-question__item">
			<img src="img/quizImg.jpg" alt="">
			<label class="custom-checkbox quiz-question__label">

			<input type="${item.type}" class="custom-checkbox__field quiz-question__answer" data-valid="false name="${data.answer_alias}" ${item.type == 'text' ? 'placeholder="Введите ваш вариант"' : ''} value="${item.type !== 'text' ? item.answer_title : ''}">
			<span class="custom-checkbox__content">${item.answer_title}</span>

		 </label>	
		</li>	
		`;
		} else if (item.type === 'textarea') {
			return `
			 <label class="quiz-question__label">
			 <textarea class="quiz-question__textarea" placeholder = "${item.answer_title}"></textarea>
			</label>`
		} else {
			return`
			<label class="quiz-question__label">
				<input type="${item.type}" data-valid="false" class="quiz-question__answer" name="${data.answer_alias}" ${item.type == 'text' ? 'placeholder="Введите ваш вариант"' : ''} value="${item.type !== 'text' ? item.answer_title : ''}">
				<span>${item.answer_title}</span>
			</label>
			`} 
		
		
	});

	return `
			<div class="quiz-question">
				<h3 class="quiz-question__title">${title}</h3>
				<ul class="quiz-question__answers list--reset">
					${answers.join('')}
				</ul>
			</div>

         <div class="quiz-bottom">
               <div class="quiz__questions">${number} из ${dataLength}</div>
               <button class="quiz-question__btn btn btn-reset btn--third" type="button"  data-next-btn>${nextBtnText}</button>
         </div>	
	`
};

class Quiz {
	constructor(selector, data, options) {
		this.$el = document.querySelector(selector);
		this.options = options;
		this.data = data;
		this.counter = 0;
		this.dataLength = this.data.length;
		this.resultArray = [];
		this.tmp = {};
		this.init()
		this.events()
	}
	
	init() {
		//console.log('init!');
		this.$el.innerHTML = quizTemplate(this.data[this.counter], this.dataLength, this.options);
	}

	nextQuestion() {
	//	console.log('next question!');

		if (this.valid()) {
			if (this.counter + 1 < this.dataLength) {
				this.counter++;
				this.$el.innerHTML = quizTemplate(this.data[this.counter], this.dataLength, this.options);

				if ((this.counter + 1 == this.dataLength)) {
					document.querySelector('.quiz-question__answers').style.display = 'block';
				}
			} else {
				console.log('А все! конец!');
				document.querySelector('.quiz__content').style.display = 'none';
			
				document.querySelector('.quiz__last-quastion').style.display = 'block';
				document.querySelector('.quiz__title').textContent = 'Ваша подборка готова!';
				document.querySelector('.quiz__desc').textContent = 'Оставьте свои контактные данные, чтобы бы мы могли отправить  подготовленный для вас каталог';

				document.querySelector('.quiz__form').addEventListener('submit', (e) => {
					//console.log('send')
					e.preventDefault();
				
				
					const quizFormData = new FormData();


					for (let item of this.resultArray) {
						for (let obj in item) {
							quizFormData.append(obj, item[obj].substring(0, item[obj].length - 1));
						}
						
					}
				//	console.log(this.resultArray)
				})

			}
		} else {
			alert('Заполните поле')
		}
	}

	

	events() {
		//console.log('events!')
		this.$el.addEventListener('click', (e) => {
			if (e.target == document.querySelector('[data-next-btn]')) {
				this.addToSend();
				this.nextQuestion();
			}

			if (e.target == document.querySelector('[data-send]')) {
				this.send();
			}
		});

		this.$el.addEventListener('change', (e) => {
			if (e.target.tagName == 'INPUT') {
				if (e.target.type !== 'checkbox' && e.target.type !== 'radio') {
					let elements = this.$el.querySelectorAll('input')

					elements.forEach(el => {
						el.checked = false;
					});
				}
				this.tmp = this.serialize(document.querySelector('.quiz__form'));
				
			}
		});
	}

	valid() {
		let isValid = false;

		let textarea = this.$el.querySelector('textarea');

		if (textarea) {
			if (textarea.value.length > 0) {
				isValid = true;
				return isValid;
			}
			
		}



		let elements = this.$el.querySelectorAll('input')
		elements.forEach(el => {
			switch(el.nodeName) {
				case 'INPUT':
					switch (el.type) {
						case 'text':
							if (el.value) {
								isValid = true;
							} else {
								el.classList.add('error')
							}
						case 'checkbox':
							if (el.checked) {
								isValid = true;
							} else {
								el.classList.add('error')
							}
						case 'radio':
							if (el.checked) {
								isValid = true;
							} else {
								el.classList.add('error')
							}
					}
			}
		});

		return isValid;
	}

	addToSend() {
		this.resultArray.push(this.tmp)
	}

	send() {
		if (this.valid()) {
			const formData = new FormData();

			for (let item of this.resultArray) {
				for (let obj in item) {
					formData.append(obj, item[obj].substring(0, item[obj].length - 1));
				}
			}

			const response = fetch("mail.php", {
				method: 'POST',
				body: formData
			});
		}
	}

	serialize(form) {
		let field, s = {};
		let valueString = '';
		if (typeof form == 'object' && form.nodeName == "FORM") {
			let len = form.elements.length;
			for (let i = 0; i < len; i++) {
				field = form.elements[i];
				
				if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
					if (field.type == 'select-multiple') {
						for (j = form.elements[i].options.length - 1; j >= 0; j--) {
							if (field.options[j].selected)
								s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
						}
					} else if ((field.type != 'checkbox' && field.type != 'radio' && field.value) || field.checked) {
						valueString += field.value + ',';
						
						s[field.name] = valueString;
						
						
					}
				}
			}
		}
		return s
	}
}



window.quiz = new Quiz('.quiz__form .quiz__content', quizData, {
	nextBtnText: "Следующий шаг",
	sendBtnText: "Отправить",
});
const rangeSlider = document.getElementById('range-slider');
//console.log(rangeSlider)
if (rangeSlider) {
	noUiSlider.create(rangeSlider, {
    start: [500, 99999],
		connect: true,
		step: 1,
    range: {
			'min': [500],
			'max': [99999]
    }
	});

	const input0 = document.getElementById('input-0');
	const input1 = document.getElementById('input-1');
	const inputs = [input0, input1];

	rangeSlider.noUiSlider.on('update', function(values, handle){
		inputs[handle].value = Math.round(values[handle]);
	});

	const setRangeSlider = (i, value) => {
		let arr = [null, null];
		arr[i] = value;
		rangeSlider.noUiSlider.set(arr);
	};

	inputs.forEach((el, index) => {
		el.addEventListener('change', (e) => {
			setRangeSlider(index, e.currentTarget.value);
		});
	});
}

let styles = getComputedStyle(document.documentElement);
let colorValue = styles.getPropertyValue('--color-accent')

let selector = document.querySelector('input[type="tel"]');
let im = new Inputmask("+7 (999) 999-9999");
im.mask(selector);



let productsFormData = null;

let validateForms = function (selector, rules, messages, successModal, yaGoal) {
	new window.JustValidate(selector, {
      rules: rules,
      messages: messages,
      colorWrong: colorValue,
      submitHandler: function (form) {
         if (form.classList.contains('cart-modal-order__form'))
         {
            //productsFormData = new FormData(form)
            productsFormData = new FormData(document.querySelector('.cart-modal-order__form'));
            document.querySelectorAll('.cart-modal-order__list .mini-cart__item').forEach((el, idx) => {
               let title = el.querySelector('.mini-product__title').textContent
               let price = el.querySelector('.mini-product__price').textContent
               console.log(title)

     
             productsFormData.append(`product-${idx + 1}`, `${title}, ${price}`);
              
               
            })

            productsFormData.append(`summ`, `${document.querySelector('.cart-modal-order__sum span').textContent}`)
            

            let xhr = new XMLHttpRequest();
   
            xhr.onreadystatechange = function() {
               if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                     console.log('Отправлено');
                  }
               }
            }
   
            xhr.open('POST', 'mail.php', true);
            xhr.send(productsFormData);
   
            form.reset();
         }
         else {
            let formData = new FormData(form);
            //console.log(formData)
            let xhr = new XMLHttpRequest();
   
            xhr.onreadystatechange = function() {
               if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                     console.log('Отправлено');
                  }
               }
            }
   
            xhr.open('POST', 'mail.php', true);
            xhr.send(formData);
   
            form.reset();
         }
			
		}
	});
}

validateForms('.callback-form',
   { name: { required: true }, tel: { required: true } },
   { name: { required: 'Введите имя',  } , tel: {required: 'Введите телефон'}},
   '.thanks-popup');

validateForms('.cart-modal-order__form',
      {
         name: { required: true },
         tel: { required: true },
         email: { required: true },
      },
      {
         name: { required: 'Введите имя'},
         tel: { required: 'Введите телефон'},
         email: { required: 'Введите email'}
      },
      '.thanks-popup'
   );

