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