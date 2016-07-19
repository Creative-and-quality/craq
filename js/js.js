//slider
(function ($) {
	
	'use strict';
	
	var slider = (function () {
		
		var
			flag = true,
			timerDuration = 5000,
			timer = 0;
		
		return {

			init: function () {

				var _this = this;

				//Создадим точки
				_this.createDots();

				//включим автопереключение
				_this.autoSwitch();

				//клик по кнопкам
				$('.slider__controls-button').on('click', function(e){

					e.preventDefault();

					var 
						$this = $(this),
						slides = $this.closest('.slider').find('.slider__item'),
						activeSlide = slides.filter('.active'),
						nextSlide = activeSlide.next(),
						prevSlide = activeSlide. prev(),
						firstSlide = slides.first(),
						lastSlide = slides.last();

					_this.resetTimer();

					if($this.hasClass('slider__controls-button_next')){

						if(nextSlide.length) {
							_this.moveSlide(nextSlide, 'forward');
						} else {
							_this.moveSlide(firstSlide, 'forward');
						}

					} else {

						if(prevSlide.length) {
							_this.moveSlide(prevSlide, 'backward');
						} else {
							_this.moveSlide(lastSlide, 'backward');
						}
					}

				});

				//клик по точкам
				$('.slider__dots-link').on('click', function (e) {
					e.preventDefault();

					var
						$this = $(this),
						dots = $this.closest('.slider__dots').find('.slider__dots-item'),
						activeDot = dots.filter('.active'),
						dot = $this.closest('.slider__dots-item'),
						curDotNum = dot.index(),
						direction = (activeDot.index() < curDotNum) ? 'forward' : 'backward',
						reqSlide = $this.closest('.slider').find('.slider__item').eq(curDotNum);

					if (!dot.hasClass('active')) {
						_this.resetTimer();
						_this.moveSlide(reqSlide, direction);
					}

				});

				//остановка прокрутки слайдера по наведению на кнопку
				$('.slider__button').hover(

					function() {
					_this.autoSwitchOff();
					},

					function() {
					_this.autoSwitch();
					}
				);

			},
			
			moveSlide: function (slide, direction){

				var 
					_this = this,
					container = slide.closest('.slider'),
					slides = container.find('.slider__item'),
					activeSlide = slides.filter('.active'),
					slideWidth = slides.width(),
					duration = 500,
					reqCssPosition = 0,
					reqSlideStrafe = 0;

				if(flag) {

					flag = false;

					if (direction === 'forward') {
						reqCssPosition = slideWidth;
						reqSlideStrafe = -slideWidth;
					} else if (direction === 'backward') {
						reqCssPosition = -slideWidth;
						reqSlideStrafe = slideWidth;
					}

					slide.css('left', reqCssPosition).addClass('inslide');

					var movableSlide = slides.filter('.inslide');

					activeSlide.animate({left: reqSlideStrafe}, duration);

					movableSlide.animate({left: 0}, duration, function () {

						var $this = $(this);

						slides.css('left', '0').removeClass('active');
						$this.toggleClass('inslide active');

						_this.text(container);

						_this.setActiveDot(container.find('.slider__dots'));

						flag = true;

					});

				}

			},
			
			text: function (container) {
				
				var activeSlide = container.find('.slider__item').filter('.active');
				
				container
					.find('.slider__content-item')
					.eq(activeSlide.index())
					.addClass('active-content')
					.siblings()
					.removeClass('active-content');
				
			},
			
			createDots: function () {
				
				var
					_this = this,
					container = $('.slider'),
					dotMarkup = '<li class="slider__dots-item"> \
													<a class="slider__dots-link" href="#"></a> \
												</li>';
				
				container.each(function () {
					
					var
						$this = $(this),
						slides = $this.find('.slider__item'),
						dotContainer = $this.find('.slider__dots');
					
					for (var i=0; i<slides.length; i++) {
						dotContainer.append(dotMarkup);
					}
					
					_this.setActiveDot(dotContainer);
					
				});
			},
			
			setActiveDot: function (container) {
				
				var slides = container.closest('.slider__list-wrap').find('.slider__item');
				
				container
					.find('.slider__dots-item')
					.eq(slides.filter('.active').index())
					.addClass('active')
					.siblings()
					.removeClass('active');
				
			},

			autoSwitch: function () {
				
				var _this = this;
				
				timer = setInterval(function () {
					
					var
						slides = $('.slider__list .slider__item'),
						activeSlide = slides.filter('.active'),
						nextSlide = activeSlide.next(),
						firstSlide = slides.first();
					
					if(nextSlide.length) {
						_this.moveSlide(nextSlide, 'forward');
					} else {
						_this.moveSlide(firstSlide, 'forward');
					}
					
				}, timerDuration);
				
			},

			autoSwitchOff: function () {

				if (timer) {
					clearInterval(timer);
				}
			},
			
			resetTimer: function () {
				
				if (timer) {
					
					clearInterval(timer);
					this.autoSwitch();
					
				}
				
			}
			
		}
		
	}());
	
	$(document).ready(function () {
		if($('.slider').length){
			slider.init();
		}
	});
	
})(jQuery);
// end_Slider


// плавная прокрутка
(function ($) {

	$(document).ready(function() {

		$('.button-up').fadeOut(0);

		$('.scroll').click(function () {

	    var elementClick = $(this).attr("href");
	    var destination = $(elementClick).offset().top;
	    $('html,body').stop().animate({scrollTop: destination}, 500);
	    return false;

	  });

		$('.button-up').click(function () {

	    $('html,body').stop().animate({scrollTop: 0}, 500);
	    return false;

	  });

  	$(window).scroll(function() {

			if($(this).scrollTop() > 500) {
				$('.button-up').fadeIn();
			} else {
				$('.button-up').fadeOut();
			}

		});

	});

})(jQuery);
// end_плавная прокрутка


// popup
(function ($) {
	
	'use strict';
	
	$(document).ready(function () {
		
		$('.popup-shadow, .popup, .popup-product').fadeOut(0);
		
		// купить полную версию
		$('#buy-button, #slider-buy-button').click(function () {
			
			$('.popup-shadow').fadeIn(100);
			setTimeout(function () {
				$('#popupRequest').fadeIn(300);
			}, 100);
			
		});

		// возможности продукта
		$('#product-features, #slider-product-features').click(function () {
			
			$('.popup-shadow').fadeIn(100);
			setTimeout(function () {
				$('.popup-product').fadeIn(300);
			}, 100);
			
		});
		
		// закрыть окно
		$('.popup__close-button').click(function () {
			$('.popup, .popup-product').fadeOut(300);
			setTimeout(function () {
				$('.popup-shadow').fadeOut(100);
			}, 300);
		});
		
		// кнопка Отправить во всплывающем окне обратной связи
		$('.popup__submit-button').on('click', function (e) {
			
			e.preventDefault();
			
			$('#popupRequest').fadeOut(300);
			$('#popupAccepted').fadeIn(300);
			setTimeout(function () {
				$('#popupAccepted').fadeOut(300);
				setTimeout(function () {
					$('.popup-shadow').fadeOut(100);
				}, 300);
			}, 3000);
			
		});

		//кнопка Отправить в футере
		$('.footer-form__submit').click(function(e) {

			e.preventDefault();

			$('.popup-shadow').fadeIn(100);
			setTimeout(function () {
				$('#popupFooter').fadeIn(300);
			}, 100);

		});
		
	});
	
})(jQuery);
// end_popup


//выпадающее меню
(function ($) {

	$(document).ready(function() {

		$('.nav-button').click(function () {

			if($('.nav').hasClass('nav_animation')) {
				$('.nav').removeClass('nav_animation');
			} else {
				$('.nav').addClass('nav_animation');
			}

		});

	});

})(jQuery);
//end_выпадающее меню