
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

