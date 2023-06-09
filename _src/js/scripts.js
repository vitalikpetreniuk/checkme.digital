var $ = jQuery;

$(function() {

// $('.ticker').marquee({
// 	line: '.ticker__wrapper',
// 	animSpeed: 50,
// 	pauseOnHover: false,
// });

$('.main-menu__item_parent > a').on('click', function(e) {
	e.preventDefault();
	$(this).toggleClass('_active');
	$(this).parent().toggleClass('_active');
	$(this).parent().find('.main-submenu').toggleClass('_active');
})

// $(document).mouseup(function (e) {
// 	//Назва контейнеру
// 	let container = $('.main-submenu');
// 	//Умова, щоб працювало тільки коли попап відкритий
// 	if ($('.main-submenu').hasClass('_active')) {
// 		//Умови при яких спрацює функція
// 			//Якщо клікають не на посилання
// 		if (!$("a").is(e.target)
// 			//Якщо клік не на вікно попапу
// 			&& !container.is(e.target)
// 			//Якщо клік ......
// 			&& container.has(e.target).length === 0) {
// 			//Імітує клік на вказаний елемент
// 			$('.main-submenu').removeClass('_active');
// 		}
// 	}
// });

$('.language-toggle__current').on('click', function () {
	
	$(this).toggleClass('_active');
	$('.language-toggle__list').slideToggle();
})

// $(document).mouseup(function (e) {
// 	//Назва контейнеру
// 	let container = $('.language-toggle__list');
// 	//Умова, щоб працювало тільки коли попап відкритий
// 	if ($('.language-toggle__current').hasClass('_active')) {
// 		//Умови при яких спрацює функція
// 			//Якщо клікають не на посилання
// 		if (!$("a").is(e.target)
// 			//Якщо клік не на вікно попапу
// 			&& !container.is(e.target)
// 			//Якщо клік ......
// 			&& container.has(e.target).length === 0) {
// 			//Імітує клік на вказаний елемент
// 			$('.language-toggle__current').trigger('click');
// 		}
// 	}
// });

$('.header__burger').on('click', function() {
	$(this).toggleClass('_active');
	$('.header__content').toggleClass('_active');
	$('.side-links').toggleClass('_left');
	$('body').toggleClass('_lock');
})

$('.video-content__button').on('click', function () {
	
	$('.video-content__vbox video').attr('src', 'img/content/main.mp4').attr('controls', true).removeAttr('muted').prop('muted', false);
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

$('.lvl-evolution').on('click', function() {
	$(this).find('.lvl-overlay').toggleClass('_active');
})

let tickerSpeed = 0.5;
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

if($('.swiper').length) {

	new Swiper('.swiper', {
		loop: true,
		navigation: {
			nextEl: '.slider-team__arrow_right',
			prevEl: '.slider-team__arrow_left',
		},
		autoHeight: true,
	});
}

$('.team-tabs__link').on('click', function(e) {
	
	e.preventDefault();
	$(this).parent().find($('.team-tabs__link')).removeClass('_active');
	$(this).addClass('_active');

	$(this).parents('.team-tabs').find($('.team-tabs__content')).removeClass('_active');
	$(this).parents('.team-tabs').find($('.team-tabs__content' + $(this).attr('href'))).addClass('_active');
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

$('.services__link').on('click', function(e) {
	
	e.preventDefault();
	$('.services__link').removeClass('_active');
	$(this).addClass('_active');

	$('.item-services').removeClass('_active');
	$('.item-services' + $(this).attr('href')).addClass('_active');
})

$('.work-nav__link').on('click', function(e) {
	
	e.preventDefault();
	$('.work-nav__link').removeClass('_active');
	$(this).addClass('_active');

	$('.item-how-work').removeClass('_active');
	$('.item-how-work' + $(this).attr('href')).addClass('_active');
	$('.work-nav__bg').css('transform', 'translate(-50%,-50%)rotate('+ $(this).data('rotate') +'deg)')
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

$('.side-links__item').on('click', function() {
	
	$('.side-links__link').not('.side-links__link_' + $(this).data('link')).removeClass('_active');
	$('.side-links__link_' + $(this).data('link')).toggleClass('_active');
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

$('.owner-evolution__overlay').on('click', function() {
	
	$(this).addClass('_hide');
})

})