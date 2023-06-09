var $ = jQuery;

let page_loaded = false
let loader_interval = setInterval(function() {
	
	if (page_loaded == true) {
		// $('body').removeClass('_lock');
		$('.loader').removeClass('_active');
		clearInterval(loader_interval);
	}
	
}, 1000);


// $(window).on('load', function() {

	// page_loaded = true
// });

$('.loader__line').on('animationend', function() {
	
	// $('body').removeClass('_lock');
	$('.loader').removeClass('_active');
})

$(function() {

	page_loaded = true

let lang = $('html').attr('lang')

if (window.location.pathname === '/' && sessionStorage.getItem('anchor') != undefined || window.location.pathname === '/' + lang + '/' && sessionStorage.getItem('anchor') != undefined) {

	setTimeout(function() {
		if ($('.header__ticker').hasClass('_scroll')) {
			$('html').animate({scrollTop: $(sessionStorage.getItem('anchor')).offset().top - $('.header').height()}, 500);
		} else {
			$('html').animate({scrollTop: $(sessionStorage.getItem('anchor')).offset().top - $('.header').height() + 37}, 500);
		}
		sessionStorage.removeItem('anchor')
	},500)
}

$("._anchor").on('click', function(e) {

	let target;
	e.preventDefault();

	if ($('.main-menu__item_parent').hasClass('_active')) {

		$('.main-menu__item_parent a').trigger('click');
	}

	if (window.location.pathname === '/' || window.location.pathname === '/' + lang + '/') {
	
		if ($(this).attr('href')) {
	
			target = $(this).attr('href');
			if ($('.header__content').hasClass('_active')) {
				$('.header__burger').trigger('click');
			}
			
			if ($('.header__ticker').hasClass('_scroll')) {
				$('html').animate({scrollTop: $(target).offset().top - $('.header').height()}, 500);
			} else {
				$('html').animate({scrollTop: $(target).offset().top - $('.header').height() + 37}, 500);
			}
		} else {
	
			target = $(this).data('anchor');
			
			if ($('.header__ticker').hasClass('_scroll')) {
				$('html').animate({scrollTop: $(target).offset().top - $('.header').height()}, 500);
			} else {
				$('html').animate({scrollTop: $(target).offset().top - $('.header').height() + 37}, 500);
			}
		}
		
	} else {
	
		if ($(this).attr('href')) {
	
			target = $(this).attr('href');
			sessionStorage.setItem("anchor", target);
			window.location.pathname = '/' + lang + '/';

		} else {
	
			target = $(this).data('anchor');
			sessionStorage.setItem("anchor", target);
			window.location.pathname = '/' + lang + '/';
		}
	}
});

if ($('.ticker').length) {
	$('.ticker').marquee({
		line: '.ticker__wrapper',
		animSpeed: 50,
		pauseOnHover: false,
	});
}

let scrollPos = 0;
$(window).scroll(function () {

	let st = $(this).scrollTop();
	if (st > scrollPos) {
		$('.ticker').addClass('_scroll');
	} else {
		$('.ticker').removeClass('_scroll');
	}
	scrollPos = st;
});

$('.main-menu__item_parent > a').on('click', function(e) {

	e.preventDefault();
	$(this).toggleClass('_active');
	$(this).parent().toggleClass('_active');
	$(this).parent().find('.main-submenu').toggleClass('_active');

	if ($('.header__content').hasClass('_active')) {
		$('.main-menu__item').not($(this).parent()).toggle()
	}
})

$('.main-submenu__link').on('click', function() {
	
	if ($('.main-menu__item_parent').hasClass('_active')) {
		$('.main-menu__item_parent > a').trigger('click');
	}
})

$(document).mouseup(function (e) {
	//Назва контейнеру
	let container = $('.main-submenu');
	//Умова, щоб працювало тільки коли попап відкритий
	if ($('.main-submenu').hasClass('_active')) {
		//Умови при яких спрацює функція
			//Якщо клікають не на посилання
		if (!$("a").is(e.target)
			//Якщо клік не на вікно попапу
			&& !container.is(e.target)
			//Якщо клік ......
			&& container.has(e.target).length === 0) {
			//Імітує клік на вказаний елемент
			$('.main-menu__item_parent > a').trigger('click');
		}
	}
});

$('.language-toggle__current').on('click', function () {
	
	$(this).toggleClass('_active');
	$('.language-toggle__list').slideToggle();
})

$(document).mouseup(function (e) {
	//Назва контейнеру
	let container = $('.language-toggle');
	//Умова, щоб працювало тільки коли попап відкритий
	if ($('.language-toggle__current').hasClass('_active')) {
		//Умови при яких спрацює функція
			//Якщо клікають не на посилання
		if (!$("a").is(e.target)
			//Якщо клік не на вікно попапу
			&& !container.is(e.target)
			//Якщо клік ......
			&& container.has(e.target).length === 0) {
			//Імітує клік на вказаний елемент
			$('.language-toggle__current').trigger('click');
		}
	}
});

$('.header__burger').on('click', function() {
	$(this).toggleClass('_active');
	$('.header__content').toggleClass('_active');
	$('.side-links').toggleClass('_left');
	$('body').toggleClass('_lock');
	$('.ticker').toggleClass('_scroll');
})

$('.video-content__button').on('click', function () {

	let lang = $('html').attr('lang')
	
	$('.video-content__vbox video').attr('src', 'http://dev.checkme.digital/wp-content/themes/checkme-digital/assets/img/content/main-' + lang + '.mp4').attr('controls', true).removeAttr('muted').prop('muted', false);
	$(this).remove()
})

let text_items = $('.info-content__animate').children();
let items_count = text_items.length;
let index = 0;
let text_show_timer = 3000;
let text_hide_timer = 2800;

function animateText() {

	for(let i=0; i<items_count; i++){

		$(text_items[i]).removeClass('_show').removeClass('_hide');
	}

	$(text_items[index]).addClass('_show');

	setTimeout(function(){
		
		$(text_items[index]).addClass('_hide');
	},text_hide_timer)

	setTimeout(function(){

		if(index == items_count-1){
			index=0;
		} else {
			index++;
		}

		animateText();
	},text_show_timer); 
}animateText()

if ($('.flickity').length) {

	let tickerSpeed = 1;
	const slideshowEl = document.querySelector('.ticker-innovators__wrapper');

	let flickity=null;let isPaused=false;const update=()=>{isPaused||(flickity.slides&&(flickity.x=(flickity.x-tickerSpeed)%flickity.slideableWidth,flickity.selectedIndex=flickity.dragEndRestingSelect(),flickity.updateSelectedSlide(),flickity.settle(flickity.x)),window.requestAnimationFrame(update))},pause=()=>{isPaused=!0},play=()=>{isPaused&&(isPaused=!1,window.requestAnimationFrame(update))};

	flickity = new Flickity(slideshowEl, {
		autoPlay: false,
		prevNextButtons: false,
		pageDots: false,
		draggable: true,
		wrapAround: true,
		selectedAttraction: 0.015,
		friction: 0.25
	});
	flickity.x = 0;

	// slideshowEl.addEventListener('mouseenter', pause, false);
	// slideshowEl.addEventListener('focusin', pause, false);
	slideshowEl.addEventListener('mouseleave', play, false);
	slideshowEl.addEventListener('focusout', play, false);

	flickity.on('dragStart', () => {
	isPaused = true;
	});

	update();
}

if($('.swiper').length) {

	var slider_team = new Swiper('.slider-team', {
		loop: true,
		navigation: {
			nextEl: '.slider-team__arrow_right',
			prevEl: '.slider-team__arrow_left',
		},
		autoHeight: true,
		spaceBetween: 5,
		grabCursor: true,
	});
}

let slide_height = $('.slider-team__slide:first-child .team-slide__box').height();
$('.slider-team__slide:not(:first-child) .team-slide__box').height(slide_height)
$(window).on('resize', function() {

	slide_height = $('.slider-team__slide:first-child .team-slide__box').height();

	$('.slider-team__slide:not(:first-child) .team-slide__box').height(slide_height)
	slider_team.updateAutoHeight();
})

$('.team-features__more').on('click', function() {

	setTimeout(function() {
	
		slide_height = $('.slider-team__slide:first-child .team-slide__box').height();
		$('.slider-team__slide:not(:first-child) .team-slide__box').height(slide_height)
		slider_team.updateAutoHeight();
	}, 100);

	$(this).prev().toggleClass('_active');
	slider_team.updateAutoHeight();
})

$('.team-tabs__link').on('click', function(e) {
	
	e.preventDefault();
	$(this).parent().find($('.team-tabs__link')).removeClass('_active');
	$(this).addClass('_active');

	$(this).parents('.team-tabs').find($('.team-tabs__content')).removeClass('_active');
	$(this).parents('.team-tabs').find($('.team-tabs__content' + $(this).attr('href'))).addClass('_active');

	slider_team.updateAutoHeight();
})

$.each($('.item-consult__inbox, .item-services__inbox, .item-how-work__inbox, .owner-form__inbox'), function() {

	if($(this).find('input').prop('checked') == true) {
		$(this).addClass('_active');
	}
})

$(document).on('click', '.item-consult__inbox:not(.item-consult__inbox_submit), .item-services__inbox:not(.item-services__inbox_submit), .item-how-work__inbox:not(.item-how-work__inbox_submit), .owner-form__inbox:not(.owner-form__inbox_submit)', function() {
	
	if($(this).hasClass('_active')) {

		$(this).find('input').prop('checked', false);
	} else {

		$(this).find('input').prop('checked', true);
	}
	$(this).toggleClass('_active');
	return false;
})

$('.consult__link').on('click', function(e) {
	
	e.preventDefault();
	$('.consult__link').removeClass('_active');
	$(this).addClass('_active');

	$('.item-consult').removeClass('_active');
	$('.item-consult' + $(this).attr('href')).addClass('_active');
})

$('.nav-services__link').on('click', function(e) {
	
	e.preventDefault();
	$('.nav-services__link').removeClass('_active');
	$(this).addClass('_active');

	$('.item-services').removeClass('_active');
	$('.item-services' + $(this).attr('href')).addClass('_active');

	$('.nav-services__line span').css('width', $(this).data('line') + '%')
})

$('.main-submenu__link, .nav-footer__col:not(:first-child) .nav-footer__item a').on('click', function(e) {
	
	e.preventDefault();
	$('.nav-services__link[data-id='+ $(this).data('id') +']').trigger('click');
})

var buttons = $('.work-nav__link');
var image = $('.work-nav__bg');
var totalButtons = buttons.length;
var angle = 360 / totalButtons;

$('.work-nav__link').on('mouseenter click', function(e) {

	var currentIndex = buttons.index(this);
	var targetRotation = angle * currentIndex;
	
	e.preventDefault();
	$('.work-nav__link').removeClass('_active');
	$(this).addClass('_active');

	$('.item-how-work').removeClass('_active');
	$('.item-how-work' + $(this).attr('href')).addClass('_active');
	image.css('transform', 'translate(-50%,-50%)rotate('+ targetRotation +'deg)')
})

$('.spoiler-faq__name').on('click', function () {

	if($('.faq__content').hasClass('_single')) {
		$('.spoiler-faq__name').not($(this)).removeClass('_active');
		$('.spoiler-faq__contant').not($(this).next()).slideUp();
		$('.spoiler-faq').not($(this).parent()).removeClass('_active');
		$(this).toggleClass('_active').next().slideToggle();
		$(this).parent().toggleClass('_active');
	} else {
		$(this).toggleClass('_active').next().slideToggle();
		$(this).parent().toggleClass('_active');
	}
})

$('.ticker-instruments__line').marquee({
	mask: null,
	line: '.ticker-instruments__list',
	items: '.ticker-instruments__item',
	animSpeed: 30,
	pauseOnHover: false,
	hoverClass: 'hover',
	direction: 'right',
	initialDelay: 0,
});

let question;
let answer;

$('.toggle-serve').on('click', function() {
	$(this).toggleClass('_active');
	
	question = $('.serve__slide[data-state=question]');
	answer = $('.serve__slide[data-state=answer]');
	
	if (question.attr('data-state') == 'question') {

		question.attr('data-state', 'answer');
	} else if (answer.attr('data-state') == 'answer') {

		answer.removeAttr('data-state');
		if (answer.next().length) {
			answer.next().attr('data-state', 'question');
		} else {
			$('.serve__info .serve__slide:first-child').attr('data-state', 'question');
		}
		
	}
});

$('.side-links__item').mouseenter(function () {

	$('.side-links__link').not('.side-links__link_' + $(this).data('link')).removeClass('_active');
	$('.side-links__link_' + $(this).data('link')).addClass('_active');
})

$('.side-links').mouseleave(function () {
	
	$('.side-links__link').removeClass('_active');
})

$(document).mouseup(function (e) {
	//Назва контейнеру
	let container = $('.side-links');
	//Умова, щоб працювало тільки коли попап відкритий
	if ($('.side-links__link').hasClass('_active')) {
		//Умови при яких спрацює функція
			//Якщо клікають не на посилання
		if (!$("a").is(e.target)
			//Якщо клік не на вікно попапу
			&& !container.is(e.target)
			//Якщо клік ......
			&& container.has(e.target).length === 0) {
			//Імітує клік на вказаний елемент
			$('.side-links__link').removeClass('_active');
		}
	}
});

window.matchMedia('(max-width: 992px)').addEventListener('change', windowSize)

function windowSize(ma) {
	if ((ma && ma.matches) || $(window).width() <= 992) {

		$('.owner-revolution__overlay').on('click', function() {
	
			$(this).addClass('_hide');
		})

		// $('.lvl-overlay__button').on('click', function() {
			
		// 	// $('.lvl-overlay').removeClass('_active');
		// 	$(this).parent('.lvl-overlay').addClass('_active');
		// })

		$(document).mouseup(function (e) {
			//Назва контейнеру
			let container = $('.owner-revolution');
			//Умова, щоб працювало тільки коли попап відкритий
			if ($('.owner-revolution__overlay').hasClass('_hide')) {
				//Умови при яких спрацює функція
					//Якщо клікають не на посилання
				if (!$("a").is(e.target)
					//Якщо клік не на вікно попапу
					&& !container.is(e.target)
					//Якщо клік ......
					&& container.has(e.target).length === 0) {
					//Імітує клік на вказаний елемент
					$('.owner-revolution__overlay').removeClass('_hide');
				}
			}
		});
	} else {

		$('.owner-revolution').on('mouseenter', function() {
	
			$('.owner-revolution__overlay').addClass('_hide');
		}).on('mouseleave', function () {
		
			$('.owner-revolution__overlay').removeClass('_hide');
		})
	}
}windowSize();

$('.lvl-revolution').mouseenter(function () {

	$(this).find('.lvl-overlay').addClass('_active');
}).mouseleave(function () {

	$(this).find('.lvl-overlay').removeClass('_active');
})

$('.info-footer__why').on('click', function(e) {
	
	e.preventDefault();
	$('.freaks').addClass('_active');
	$('body').addClass('_lock');
	$('.ticker').addClass('_scroll');
})

$('.freaks__close').on('click', function() {
	
	$('.freaks').removeClass('_active');
	$('body').removeClass('_lock');
	$('.ticker').removeClass('_scroll');
})

$('.side-links__link_book, .info-content__link').on('click', function(e) {
	
	e.preventDefault();
	if ($('.freaks').hasClass('_active')) {
		$('.freaks').removeClass('_active');
	}
	if ($('.header__content').hasClass('_active')) {
		$('.header__burger').trigger('click')
	}
	$('.session').addClass('_active');
	$('body').addClass('_lock');
	$('.ticker').addClass('_scroll');
	$(this).removeClass('_active');
})

$('.session__close').on('click', function() {
	
	$('.session').removeClass('_active');
	$('body').removeClass('_lock');
	$('.ticker').removeClass('_scroll');
})

$(document).mouseup(function (e) {
	//Назва контейнеру
	let container = $('.session__wrapper, .freaks__wrapper');
	//Умова, щоб працювало тільки коли попап відкритий
	if ($('.session, .freaks').hasClass('_active')) {
		//Умови при яких спрацює функція
			//Якщо клікають не на посилання
		if (!$("a").is(e.target)
			//Якщо клік не на вікно попапу
			&& !container.is(e.target)
			//Якщо клік не на попап маски телефону
			&& !$('.iti *').is(e.target)
			//Якщо клік ......
			&& container.has(e.target).length === 0) {
			//Імітує клік на вказаний елемент
			$('.session, .freaks').removeClass('_active');
			$('body').removeClass('_lock');
		}
	}
});

if ($('.intlTelInput').length) {

	window.intlTelInput(document.querySelector('#contact-phone'), {
		initialCountry: 'us',
		placeholderNumberType: 'FIXED_LINE',
		utilsScript: "../libs/phone-mask/utils.js",
	});
}


$(window).on('load', function() {
	
	$('#contact-phone').on('countrychange', function() {
		let country_info = $('.iti__selected-flag').attr('title');
		let flag = country_info.substring(country_info.indexOf("+"))
		let phone_placeholder = $('#contact-phone').attr('placeholder')
		let old_text = phone_placeholder.substring(phone_placeholder.indexOf("+"))
		let new_text = phone_placeholder.replace(old_text, flag);
		
		$('#contact-phone').attr('placeholder', new_text)
	})

	if (!$('#contact-phone').val()) {

		$('#contact-phone').on('focus', function() {

			$(this).val('+');
		})
	}
});

})