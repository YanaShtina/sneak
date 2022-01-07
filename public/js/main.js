const burger = document.querySelector('.burger')
const nav = document.querySelector('.header__nav-mobile')

burger.addEventListener('click', () => {
   burger.classList.toggle('burger--active')
   nav.classList.toggle('header__nav-mobile--active') 
})
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
   console.log(e.p)
//    if (!e.currentTarget.classList.contains('.modal__container--open')) {
//       modal.classList.remove("modal--open")
// }
  
})

const quizData = [{
   number: 1,
   title: "Какой тип кроссовок рассматриваете?",
   answer_alias: "type",
   answers: [{
         answer_title: "кеды",
         type: "checkbox"
      },
      {
         answer_title: "кеды",
         type: "checkbox"
      },
      {
         answer_title: "кеды",
         type: "checkbox"
      },
      {
         answer_title: "кеды",
         type: "checkbox"
      },
      {
         answer_title: "кеды",
         type: "checkbox"
      },
      {
         answer_title: "кеды",
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
   // {
   //    number: 4,
   //    title: "Оставьте свой телефон, мы вам перезвоним",
   //    answer_alias: "phone",
   //    answers: [
   //       {
   //       answer_title: "Введите телефон",
   //       type: "text"
   //    },
   //    ]
   // }
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
		console.log('next question!');

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
					// if () {
						
					// }
				
					const quizFormData = new FormData();


					for (let item of this.resultArray) {
						for (let obj in item) {
							quizFormData.append(obj, item[obj].substring(0, item[obj].length - 1));
						}
						
					}
					console.log(this.resultArray)
					//quizFormData.append('textarea', textareaText);
				
					// let xhr = new XMLHttpRequest();
   
					// xhr.onreadystatechange = function() {
					// 	if (xhr.readyState === 4) {
					// 		if (xhr.status === 200) {
					// 			console.log('Отправлено');
					// 		}
					// 	}
					// }
					
		
					// xhr.open('POST', 'mail.php', true);
					// xhr.send(quizFormData);
		
					// document.querySelector('.quiz__form').reset();
				})

			}
		} else {
			console.log('Не валидно!')
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

// class Quiz {
// 	constructor(selector, data, options) {
// 		this.$el = document.querySelector(selector);
// 		this.options = options;
// 		this.data = data;
// 		this.counter = 0;
// 		this.dataLength = this.data.length;
// 		this.resultArray = [];
// 		this.tmp = {};
// 		this.init()
// 		this.events()
// 	}

// 	init() {
// 		console.log('init!');
// 		this.$el.innerHTML = quizTemplate(this.data[this.counter], this.dataLength, this.options);
// 	}

// 	nextQuestion() {
// 		console.log('next question!');

// 		if (this.valid()) {
// 			if (this.counter + 1 < this.dataLength) {
// 				this.counter++;
// 				this.$el.innerHTML = quizTemplate(this.data[this.counter], this.dataLength, this.options);

// 				if ((this.counter + 1 == this.dataLength)) {
//           document.querySelector('.quiz-question__answers').style.display = 'block';
// 				}
// 			} else {
// 				console.log('А все! конец!');
//         document.querySelector('.quiz__content').style.display = 'none';
//         document.querySelector('.quiz__last-quastion').style.display = 'block';
//         document.querySelector('.quiz__title').textContent = 'Ваша подборка готова!';
//         document.querySelector('.quiz__desc').textContent = 'Оставьте свои контактные данные, чтобы бы мы могли отправить  подготовленный для вас каталог';

//         document.querySelector('.quiz__form').addEventListener('submit', (e) => {
//           e.preventDefault();

//           quizFormData = new FormData();


//           for (let item of this.resultArray) {
//             for (let obj in item) {
//               quizFormData.append(obj, item[obj].substring(0, item[obj].length - 1));
//             }
//           }

//           quizFormData.append('textarea', textareaText);

//           let xhr = new XMLHttpRequest();

//           xhr.onreadystatechange = function() {
//             if (xhr.readyState === 4) {
//               if (xhr.status === 200) {
//                 console.log('Отправлено');
//               }
//             }
//           }

//           document.querySelector('.quiz__form').querySelectorAll('input').forEach(el => {
//             if (el.value) {
//               xhr.open('POST', 'mail.php', true);
//               xhr.send(quizFormData);

//               document.querySelector('.quiz__form').reset();
//             }
//           });


//         });

//       }
// 		} else {
// 			console.log('Не валидно!')
// 		}
// 	}

// 	events() {
// 		console.log('events!')
// 		this.$el.addEventListener('click', (e) => {
// 			if (e.target == document.querySelector('[data-next-btn]')) {
// 				this.addToSend();
// 				this.nextQuestion();
// 			}
// 		});

// 		this.$el.addEventListener('change', (e) => {
// 			if (e.target.tagName == 'INPUT') {
// 				if (e.target.type !== 'checkbox' && e.target.type !== 'radio') {
// 					let elements = this.$el.querySelectorAll('input')

// 					elements.forEach(el => {
// 						el.checked = false;
// 					});
// 				}
// 				this.tmp = this.serialize(document.querySelector('.quiz__form'));
// 			} else {
//         let textarea = this.$el.querySelector('textarea');
//         textareaText = textarea.value;
//       }
// 		});
// 	}

// 	valid() {
// 		let isValid = false;

//     let textarea = this.$el.querySelector('textarea');

//     if (textarea) {
//       if (textarea.value.length > 0) {
//         isValid = true;
//         return isValid;
//       }
//     }


// 		let elements = this.$el.querySelectorAll('input');
// 		elements.forEach(el => {
// 			switch(el.nodeName) {
// 				case 'INPUT':
// 					switch (el.type) {
// 						case 'text':
// 							if (el.value) {
// 								isValid = true;
// 							} else {
// 								el.classList.add('error')
// 							}
// 						case 'checkbox':
// 							if (el.checked) {
// 								isValid = true;
// 							} else {
// 								el.classList.add('error')
// 							}
// 						case 'radio':
// 							if (el.checked) {
// 								isValid = true;
// 							} else {
// 								el.classList.add('error')
// 							}
// 					}
// 			}
// 		});

// 		return isValid;
// 	}

// 	addToSend() {
// 		this.resultArray.push(this.tmp)
// 	}

// 	serialize(form) {
// 		let field, s = {};
// 		let valueString = '';
// 		if (typeof form == 'object' && form.nodeName == "FORM") {
// 			let len = form.elements.length;
// 			for (let i = 0; i < len; i++) {
// 				field = form.elements[i];

// 				if (field.name && !field.disabled && field.type != 'file' && field.type != 'reset' && field.type != 'submit' && field.type != 'button') {
// 					if (field.type == 'select-multiple') {
// 						for (j = form.elements[i].options.length - 1; j >= 0; j--) {
// 							if (field.options[j].selected)
// 								s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
// 						}
// 					} else if ((field.type != 'checkbox' && field.type != 'radio' && field.value) || field.checked) {
// 						valueString += field.value + ',';

// 						s[field.name] = valueString;
// 					}
// 				}
// 			}
// 		}
// 		return s
// 	}
// }

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

// let styles = getComputedStyle(document.documentElement);
// let colorValue = styles.getPropertyValue('--color-accent')

// let selector = document.querySelector('input[type="tel"]');
// let im = new Inputmask("+7 (999) 999-9999");
// im.mask(selector);



// let productsFormData = null;

// let validateForms = function (selector, rules, messages, successModal, yaGoal) {
// 	new window.JustValidate(selector, {
//       rules: rules,
//       messages: messages,
//       colorWrong: colorValue,
//       submitHandler: function (form) {
//          if (form.classList.contains('cart-modal-order__form'))
//          {
//             //productsFormData = new FormData(form)
//             productsFormData = new FormData(document.querySelector('.cart-modal-order__form'));
//             document.querySelectorAll('.cart-modal-order__list .mini-cart__item').forEach((el, idx) => {
//                let title = el.querySelector('.mini-product__title').textContent
//                let price = el.querySelector('.mini-product__price').textContent
//                console.log(title)

     
//              productsFormData.append(`product-${idx + 1}`, `${title}, ${price}`);
              
               
//             })

//             productsFormData.append(`summ`, `${document.querySelector('.cart-modal-order__sum span').textContent}`)
            

//             let xhr = new XMLHttpRequest();
   
//             xhr.onreadystatechange = function() {
//                if (xhr.readyState === 4) {
//                   if (xhr.status === 200) {
//                      console.log('Отправлено');
//                   }
//                }
//             }
   
//             xhr.open('POST', 'mail.php', true);
//             xhr.send(productsFormData);
   
//             form.reset();
//          }
//          else {
//             let formData = new FormData(form);
//             //console.log(formData)
//             let xhr = new XMLHttpRequest();
   
//             xhr.onreadystatechange = function() {
//                if (xhr.readyState === 4) {
//                   if (xhr.status === 200) {
//                      console.log('Отправлено');
//                   }
//                }
//             }
   
//             xhr.open('POST', 'mail.php', true);
//             xhr.send(formData);
   
//             form.reset();
//          }
			
// 		}
// 	});
// }

// validateForms('.callback-form',
//    { name: { required: true }, tel: { required: true } },
//    { name: { required: 'Введите имя',  } , tel: {required: 'Введите телефон'}},
//    '.thanks-popup');

// validateForms('.cart-modal-order__form',
//       {
//          name: { required: true },
//          tel: { required: true },
//          email: { required: true },
//       },
//       {
//          name: { required: 'Введите имя'},
//          tel: { required: 'Введите телефон'},
//          email: { required: 'Введите email'}
//       },
//       '.thanks-popup'
//    );

