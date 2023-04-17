window.addEventListener('DOMContentLoaded', () => {

  // --------------Tabs-------------------------

  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');


  function hideTabContent(tabs) {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(tabs, i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent(tabs);
  showTabContent(tabs);

  tabsParent.addEventListener('click', (e) => {
    const target = e.target;

    if (target && target.classList.contains('tabheader__item')) {
      const newTabs = document.querySelectorAll('.tabheader__item');
      newTabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent(newTabs);
          showTabContent(newTabs, i);
        }
      })
    }
  });

  let p = document.createElement('div');
  p.classList.add('tabheader__item');
  p.innerHTML = 'Спорт';
  tabsParent.append(p);


  // ----------------Timer--------------------------

  let date = '2023-10-29T21:20:00';

  function getDate(date) {
    date = Date.parse(date);
    let now = new Date();

    let mil = date - now;
    let seconds = Math.floor(mil / 1000) % 60;
    let minutes = Math.floor(mil / 1000 / 60) % 60;
    let hours = Math.floor(mil / 1000 / 60 / 60) % 24;
    let days = Math.floor(mil / 1000 / 60 / 60 / 24) % 365;

    return {
      total: mil,
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      days: days
    }
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getDate(endtime);
      if (t.total <= 0) {
        days.innerHTML = getZero(0);
        hours.innerHTML = getZero(0);
        minutes.innerHTML = getZero(0);
        seconds.innerHTML = getZero(0);
        clearInterval(timeInterval);
        return;
      }
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
    }
  }

  setClock('.timer', date);


  // --------------Modal------------------

  const showBtns = document.querySelectorAll('[data-modal]'),
        closeBtn = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');

  function showModal(elem) {
    elem.style.display = 'block';
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimer);
  }

  function closeModal(elem) {
    elem.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  showBtns.forEach(btn => {
    btn.addEventListener('click', () => showModal(modal));
  });

  closeBtn.addEventListener('click', () => closeModal(modal))

  modal.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal(modal);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && window.getComputedStyle(modal).display === "block") {
      closeModal(modal);
    }
  });

  const modalTimer = setTimeout(showModal, 300000, modal);
  
  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      showModal(modal);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);  


  // ------------------class-----------------

  class Card {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.title = title;
      this.alt = alt;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    renderCard() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else{
        this.classes.forEach(className => element.classList.add(className));
      }
      
      element.innerHTML =
          ` <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>`;
      this.parent.append(element);
    }
  }

  new Card(
    "img/tabs/vegy.jpg",
    "very",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    15,
    '.menu__field .container',
  ).renderCard();

  new Card(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум"',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    20,
    '.menu__field .container',
    'menu__item'
  ).renderCard();

  new Card(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    25,
    '.menu__field .container',
    'menu__item'
  ).renderCard();


  // ----------------------Forms--------------------

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'Загрузка',
    success: 'Сасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append.statusMessage;

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      request.setRequestHeader('content-type', 'application/json');
      const formData = new FormData(form);

      const object = {};
      formData.forEach(function(value, key){
        object[key] = value;
      });

      const json = JSON.stringify(object);

      request.send(json);

      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          statusMessage.textContent = message.success;
          form.rest();
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        } else {
          statusMessage.textContent = message.failure;
        }
      })
    });
  }

  // ----------------------slider (simple)-----------------------------

    const wrapper = document.querySelector('.offer__slider-wrapper'),
          slides = wrapper.querySelectorAll('.offer__slide'),
          current = document.querySelector('#current'),
          total = document.querySelector('#total'),
          arrNext = document.querySelector('.offer__slider-next'),
          arrPrev = document.querySelector('.offer__slider-prev'),
          width = window.getComputedStyle(wrapper).width;

    let slideIndex = 1;

    showSlide(slideIndex);

    total.innerHTML = slides.length < 10 ? '0'+slides.length : slides.length;
    current.innerHTML = '0'+slideIndex;

    arrNext.addEventListener('click', () => {

      plusSlideIndex(1);
    });

    arrPrev.addEventListener('click', () => {

      plusSlideIndex(-1);
    });

    function showSlide(n) {
      if (n > slides.length) slideIndex = 1;
      if (n < 1) slideIndex = slides.length;
      slides.forEach(slide => {slide.style.display = 'none'; slide.classList.add('fade');});
      slides[slideIndex - 1].style.display = 'block';
      current.innerHTML = slideIndex < 10 ? '0'+slideIndex : slideIndex;
    }

    function plusSlideIndex(n) {
      slideIndex += n;
      showSlide(slideIndex);
    }

})





