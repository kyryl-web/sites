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

  // let p = document.createElement('div');
  // p.classList.add('tabheader__item');
  // p.innerHTML = 'Sport';
  // tabsParent.append(p);


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
                <div class="menu__item-cost">Price:</div>
                <div class="menu__item-total"><span>${this.price}</span> uah/day</div>
            </div>`;
      this.parent.append(element);
    }
  }

  new Card(
    "img/tabs/vegy.jpg",
    "very",
    'Menu "Fitness"',
    'Menu "Fitness" is a new approach to cooking: more fresh vegetables and fruits. Product of active and healthy people. It is a brand new product with optimal price and high quality!',
    15,
    '.menu__field .container',
  ).renderCard();

  new Card(
    "img/tabs/elite.jpg",
    "elite",
    'Menu "Premium"',
    'In the menu "Premium" we use not only beautiful packaging design, but also quality dishes. Red fish, seafood, fruit - restaurant menu without going to restaurant!',
    20,
    '.menu__field .container',
    'menu__item'
  ).renderCard();

  new Card(
    "img/tabs/post.jpg",
    "post",
    'Menu "Lean"',
    'The "Lean" menu is a careful selection of ingredients: complete absence of animal products, milk from almonds, oats, coconut or buckwheat, the right amount of protein due to tofu and imported vegetarian steaks.',
    25,
    '.menu__field .container',
    'menu__item'
  ).renderCard();


  // ----------------------Forms--------------------

  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'Loading',
    success: 'Thank you! We will contact you soon',
    failure: 'Something went wrong...'
  };

  forms.forEach(item => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('sub')
    
      form.insertAdjacentHTML('afterend', `<div class="status">${message.loading}</div>`);
      const statusMessage = document.querySelector('.status');
      
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
          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        }
      })
    });
  }

  // ----------------------slider (simple)-----------------------------

    // const wrapper = document.querySelector('.offer__slider-wrapper'),
    //       slides = wrapper.querySelectorAll('.offer__slide'),
    //       current = document.querySelector('#current'),
    //       total = document.querySelector('#total'),
    //       arrNext = document.querySelector('.offer__slider-next'),
    //       arrPrev = document.querySelector('.offer__slider-prev'),
    //       width = window.getComputedStyle(wrapper).width;

    // let slideIndex = 1;

    // showSlide(slideIndex);

    // total.innerHTML = slides.length < 10 ? '0'+slides.length : slides.length;
    // current.innerHTML = '0'+slideIndex;

    // arrNext.addEventListener('click', () => {

    //   plusSlideIndex(1);
    // });

    // arrPrev.addEventListener('click', () => {

    //   plusSlideIndex(-1);
    // });

    // function showSlide(n) {
    //   if (n > slides.length) slideIndex = 1;
    //   if (n < 1) slideIndex = slides.length;
    //   slides.forEach(slide => {slide.style.display = 'none'; slide.classList.add('fade');});
    //   slides[slideIndex - 1].style.display = 'block';
    //   current.innerHTML = slideIndex < 10 ? '0'+slideIndex : slideIndex;
    // }

    // function plusSlideIndex(n) {
    //   slideIndex += n;
    //   showSlide(slideIndex);
    // }

    // --------------------- Slider (carousel with dots) -----------------------

      const 
            slides = document.querySelectorAll('.offer__slide'),
            slider = document.querySelector('.offer__slider'),
            current = document.querySelector('#current'),
            total = document.querySelector('#total'),
            next = document.querySelector('.offer__slider-next'),
            prev = document.querySelector('.offer__slider-prev'),
            slidesWrapper = document.querySelector('.offer__slider-wrapper');
            slidesField = document.querySelector('.offer__slider-inner'),
            width = window.getComputedStyle(slidesWrapper).width;

      let slideIndex = 1;
      let offset = 0;

      if(slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
      } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
      }

      slidesField.style.width = 100 * slides.length + '%';
      slidesField.style.display = 'flex';
      slidesField.style.transition = 'all 0.5s';

      slidesWrapper.style.overflow = 'hidden';

      slides.forEach(slide => {
        slide.style.width = width;
      });

      slider.style.position = 'relative';

      const indicators = document.createElement('ol'),
            dots = [];
      indicators.classList.add('carousel-indicators');

      slider.append(indicators);

      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');

        if (i == 0) {
          dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
      }

      next.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
          offset = 0;
        } else {
          offset += +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
          slideIndex = 1;
        } else {
          slideIndex++;
        }

        changeTextContent();

        changeDotsOpacity();
      });

      prev.addEventListener('click', () => {
        if (offset == 0) {
          offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
          offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
          slideIndex = slides.length
        } else {
          slideIndex--;
        }

        changeTextContent();

        changeDotsOpacity();
      });

      dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
          const slideTo = e.target.getAttribute('data-slide-to');

          slideIndex = slideTo;
          offset = +width.slice(0, width.length - 2) * (slideTo - 1);
          slidesField.style.transform = `translateX(-${offset}px)`;

          changeTextContent();

          changeDotsOpacity();
        })
      })

      function changeTextContent() {
        if(slides.length < 10) {
          current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
      }

      function changeDotsOpacity() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = '1';
      }


      // ----------------------------- Calc ----------------------------------

      const result = document.querySelector('.calculating__result span');
      let sex,
          height, 
          weight, 
          age, 
          ratio;

      if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
      } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
      }

      if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
      } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
      }

      function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
          elem.classList.remove(activeClass);

          if (elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
          }
          if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
          }
        })
      }

      initLocalSettings('#gender div', 'calculating__choose-item_active');
      initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

      function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
          result.textContent = '____';
          return;
        }

        if (sex === 'female') {
          result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
          result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
      }

      calcTotal();

      function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
          elem.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-ratio')) {
              ratio = +e.target.getAttribute('data-ratio');
              localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
            } else {
              sex = e.target.getAttribute('id');
              localStorage.setItem('sex', e.target.getAttribute('id'));
            }
  
            elements.forEach(elem => elem.classList.remove(activeClass));
            e.target.classList.add(activeClass);
            calcTotal();
          });
        });
      }
      
      getStaticInformation('#gender div', 'calculating__choose-item_active');
      getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

      function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

          if (input.value.match(/\D/g)) {
            console.log(input.value.match(/\D/g))
            input.style.border = '1px solid red';
          } else {
            console.log(input.value.match(/\D/g))
            input.style.border = 'none';
          }

          switch(input.getAttribute('id')) {
            case 'height':
              height = +input.value;
              break;
            case 'weight':
              weight = +input.value;
              break;
            case 'age':
              age = +input.value;
              break;
          }
          calcTotal();
        })
      }

      getDynamicInformation('#height');
      getDynamicInformation('#weight');
      getDynamicInformation('#age');
});





