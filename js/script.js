'use strict';

window.addEventListener('load', function () {
  if (this.document.querySelector('.product__slider')) {
    new Swiper('.product__slider', {
      loop: true,
      speed: 1000,
      parallax: true,
      mousewheel: true,
      keyboard: true,
      on: {
        init: function () {
          document.documentElement.classList.add('loaded');
        },
      },
    });
  }
});

const cart = document.querySelector('.header__cart');
let cartValue = document.querySelector('.header__cart span');
const speedAnimation = 1000;

document.addEventListener('click', function (e) {
  const target = e.target;
  if (target.closest('.product__buy')) {
    const productSlide = target.closest('.product__slide');
    const productImg = productSlide.querySelector('.product__picture');
    const productImgFly = productImg.cloneNode('true');

    const cartPos = {
      left: cart.getBoundingClientRect().left,
      top: cart.getBoundingClientRect().top,
    };

    productImgFly.style.cssText = `
			position: fixed;
			top: ${productImg.getBoundingClientRect().top}px;
			left: ${productImg.getBoundingClientRect().left}px;
			width: ${productImg.offsetWidth}px;
			height: ${productImg.offsetHeight}px;
			transition: all ${speedAnimation}ms ease;
		`;

    document.body.append(productImgFly);

    setTimeout(function () {
      productImgFly.style.left = cartPos.left + 'px';
      productImgFly.style.top = cartPos.top + 'px';
      productImgFly.style.width = 0;
      productImgFly.style.height = 0;
      productImgFly.style.opacity = 0.5;
    }, 0);

    setTimeout(function () {
      cartValue.innerHTML = ++cartValue.innerHTML;
      productImgFly.remove();
    }, speedAnimation);
  }
});
