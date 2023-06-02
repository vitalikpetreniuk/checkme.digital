!function(i){function t(t){this.options=i.extend({holder:null,handleFlexible:!0,pauseOnHover:!0,hoverClass:"hover",direction:"left",cloneClass:"cloned",mask:null,line:">*",items:">*",animSpeed:10,initialDelay:0},t),this.init()}t.prototype={init:function(){this.options.holder&&(this.initStructure(),this.attachEvents())},initStructure:function(){this.holder=i(this.options.holder),this.mask=this.options.mask?this.holder.find(this.options.mask):this.holder,this.line=this.mask.find(this.options.line),this.items=this.line.find(this.options.items).css({float:"left"}),this.direction="left"===this.options.direction?-1:1,this.recalculateDimensions(),this.cloneItems=this.items.clone().addClass(this.options.cloneClass).appendTo(this.line),this.itemWidth>=this.maskWidth?(this.activeLine=!0,this.offset=-1===this.direction?0:this.maxOffset):(this.activeLine=!1,this.cloneItems.hide(),this.offset=0),this.line.css({width:2*this.itemWidth,marginLeft:this.offset})},attachEvents:function(){var t=this;this.options.handleFlexible&&(this.resizeHandler=function(){t.recalculateDimensions(),t.itemWidth<t.maskWidth?(t.activeLine=!1,t.cloneItems.hide(),t.stopMoving(),t.offset=0,t.line.css({marginLeft:t.offset})):(t.activeLine=!0,t.cloneItems.show(),t.startMoving())},i(window).bind("resize orientationchange",this.resizeHandler)),this.options.pauseOnHover&&(this.hoverHandler=function(){t.stopMoving(),t.holder.addClass(t.options.hoverClass)},this.leaveHandler=function(){t.startMoving(),t.holder.removeClass(t.options.hoverClass)},this.holder.bind({mouseenter:this.hoverHandler,mouseleave:this.leaveHandler})),setTimeout(function(){t.initialFlag=!0,t.startMoving()},t.options.initialDelay||1)},recalculateDimensions:function(){var t=this;this.maskWidth=this.mask.width(),this.itemWidth=1,this.items.each(function(){t.itemWidth+=i(this).outerWidth(!0)}),this.maxOffset=-this.itemWidth},startMoving:function(){var i=this;if(i.activeLine&&i.initialFlag){var t=i.direction<0?i.maxOffset:0;i.offset=parseInt(i.line.css("marginLeft"),10)||0,i.line.stop().animate({marginLeft:t},{duration:Math.abs(1e3*(i.offset-t)/i.options.animSpeed),easing:"linear",complete:function(){i.offset=i.direction<0?0:i.maxOffset,i.line.css({marginLeft:i.offset}),i.startMoving()}})}},stopMoving:function(){this.line.stop()},destroy:function(){this.stopMoving(),this.cloneItems.remove(),this.items.css({float:""}),this.line.css({marginLeft:"",width:""}),this.holder.removeClass(this.options.hoverClass),this.holder.unbind("mouseenter",this.hoverHandler),this.holder.unbind("mouseleave",this.leaveHandler),i(window).unbind("resize orientationchange",this.resizeHandler)}},i.fn.marquee=function(e){return this.each(function(){jQuery(this).data("Marquee",new t(i.extend(e,{holder:this})))})}}(jQuery);


// HTML-структура:

// <div class="line-box"> - Родительский блок, к которому будет подключаться плагин (может быть одновременно и маской)
// 	<div class="line-wrap"> - Блок, который будет скроллится
// 		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p> - Контент бегущей строки
// 	</div>
// </div>


// В плагине доступны следующие опции:

// $('div.line-box').marquee({
// 	mask: null,               // селектор маски (опционально, по умолчанию маской будет блок, к которому применён плагин)
// 	line: 'div.line-wrap',    // селектор скроллящегося блока (по умолчанию прямой потомок маски)
// 	items: '>*',              // селектор элементов в скроллящемся блоке (по умолчанию прямой потомок скролл.блока)
// 	animSpeed: 50,            // скорость анимации (пикселей в секунду)
// 	pauseOnHover: true,       // приостанавливать бегущую строку на ховер
// 	hoverClass: 'hover',      // класс ховерного состояния бегущей строки
// 	direction: 'left',        // направление движения "влево" или "вправо" ("left","right")
// 	initialDelay: 0           // первоначальная задержка перед стартом бегущей строки (мсек)
// });

// https://codepen.io/viriava/pen/YWxeEL