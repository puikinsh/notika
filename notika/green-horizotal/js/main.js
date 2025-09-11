(function ($) {
 "use strict";

		$(".chosen")[0] && $(".chosen").chosen({
            width: "100%",
            allow_single_deselect: !0
        });
		/*--------------------------
		 auto-size Active Class
		---------------------------- */	
		$(".auto-size")[0] && autosize($(".auto-size"));
		/*--------------------------
		 Collapse Accordion Active Class
		---------------------------- */	
		$(".collapse")[0] && ($(".collapse").on("show.bs.collapse", function(e) {
            $(this).closest(".panel").find(".panel-heading").addClass("active")
        }), $(".collapse").on("hide.bs.collapse", function(e) {
            $(this).closest(".panel").find(".panel-heading").removeClass("active")
        }), $(".collapse.in").each(function() {
            $(this).closest(".panel").find(".panel-heading").addClass("active")
        }));
		/*----------------------------
		 Bootstrap 5 tooltip
		------------------------------ */
		// Initialize Bootstrap 5 tooltips
		if (typeof bootstrap !== 'undefined') {
			var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
			var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
				return new bootstrap.Tooltip(tooltipTriggerEl);
			});
		}
		// Fallback for old data-toggle syntax
		if (document.querySelectorAll('[data-toggle="tooltip"]').length > 0) {
			var oldTooltips = [].slice.call(document.querySelectorAll('[data-toggle="tooltip"]'));
			oldTooltips.forEach(function(el) {
				el.setAttribute('data-bs-toggle', 'tooltip');
				if (typeof bootstrap !== 'undefined') {
					new bootstrap.Tooltip(el);
				}
			});
		}
		/*--------------------------
		 popover
		---------------------------- */	
		$('[data-toggle="popover"]')[0] && $('[data-toggle="popover"]').popover();
		/*--------------------------
		 File Download
		---------------------------- */	
		$('.btn.dw-al-ft').on('click', function(e) {
			e.preventDefault();
		});
		/*--------------------------
		 Sidebar Left
		---------------------------- */	
		$('#sidebarCollapse').on('click', function () {
			 $('#sidebar').toggleClass('active');
			 
		 });
		$('#sidebarCollapse').on('click', function () {
			$("body").toggleClass("mini-navbar");
			SmoothlyMenu();
		});
		$('.menu-switcher-pro').on('click', function () {
			var button = $(this).find('i.nk-indicator');
			button.toggleClass('notika-menu-befores').toggleClass('notika-menu-after');
			
		});
		$('.menu-switcher-pro.fullscreenbtn').on('click', function () {
			var button = $(this).find('i.nk-indicator');
			button.toggleClass('notika-back').toggleClass('notika-next-pro');
		});
		/*--------------------------
		 Button BTN Left
		---------------------------- */	
		
		$(".nk-int-st")[0] && ($("body").on("focus", ".nk-int-st .form-control", function() {
            $(this).closest(".nk-int-st").addClass("nk-toggled")
        }), $("body").on("blur", ".form-control", function() {
            var p = $(this).closest(".form-group, .input-group"),
                i = p.find(".form-control").val();
            p.hasClass("fg-float") ? 0 == i.length && $(this).closest(".nk-int-st").removeClass("nk-toggled") : $(this).closest(".nk-int-st").removeClass("nk-toggled")
        })), $(".fg-float")[0] && $(".fg-float .form-control").each(function() {
            var i = $(this).val();
            0 == !i.length && $(this).closest(".nk-int-st").addClass("nk-toggled")
        });
		/*--------------------------
		 mCustomScrollbar
		---------------------------- */	
		$(window).on("load",function(){
			$(".widgets-chat-scrollbar").mCustomScrollbar({
				setHeight:460,
				autoHideScrollbar: true,
				scrollbarPosition: "outside",
				theme:"light-1"
			});
			$(".notika-todo-scrollbar").mCustomScrollbar({
				setHeight:445,
				autoHideScrollbar: true,
				scrollbarPosition: "outside",
				theme:"light-1"
			});
			$(".comment-scrollbar").mCustomScrollbar({
				autoHideScrollbar: true,
				scrollbarPosition: "outside",
				theme:"light-1"
			});
		});
	/*----------------------------
	 jQuery MeanMenu
	------------------------------ */
	jQuery('nav#dropdown').meanmenu();
	
	/*----------------------------
	 wow js active
	------------------------------ */
	 new WOW().init();
	 
	/*----------------------------
	 Swiper active (modern replacement for owl)
	------------------------------ */  
	if (typeof Swiper !== 'undefined') {
		// Initialize Swiper for elements with owl-demo id or class
		const owlElements = document.querySelectorAll('#owl-demo, .owl-demo');
		owlElements.forEach(element => {
			// Convert to swiper structure if needed
			if (!element.classList.contains('swiper')) {
				element.classList.add('swiper');
				const wrapper = document.createElement('div');
				wrapper.className = 'swiper-wrapper';
				while (element.firstElementChild) {
					const slide = element.firstElementChild;
					slide.classList.add('swiper-slide');
					wrapper.appendChild(slide);
				}
				element.appendChild(wrapper);
				
				// Add navigation
				const nextBtn = document.createElement('div');
				nextBtn.className = 'swiper-button-next';
				nextBtn.innerHTML = '<i class="fa fa-angle-right"></i>';
				
				const prevBtn = document.createElement('div');
				prevBtn.className = 'swiper-button-prev';
				prevBtn.innerHTML = '<i class="fa fa-angle-left"></i>';
				
				element.appendChild(nextBtn);
				element.appendChild(prevBtn);
			}
			
			// Initialize Swiper with responsive breakpoints
			new Swiper(element, {
				slidesPerView: 4,
				spaceBetween: 20,
				speed: 800,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				breakpoints: {
					479: { slidesPerView: 1, spaceBetween: 10 },
					768: { slidesPerView: 2, spaceBetween: 15 },
					980: { slidesPerView: 3, spaceBetween: 20 },
					1199: { slidesPerView: 4, spaceBetween: 20 }
				}
			});
		});
	} else {
		console.warn('Swiper not loaded - carousel functionality disabled');
	}

	/*----------------------------
	 price-slider active
	------------------------------ */  
	  $( "#slider-range" ).slider({
	   range: true,
	   min: 40,
	   max: 600,
	   values: [ 60, 570 ],
	   slide: function( event, ui ) {
		$( "#amount" ).val( "£" + ui.values[ 0 ] + " - £" + ui.values[ 1 ] );
	   }
	  });
	  $( "#amount" ).val( "£" + $( "#slider-range" ).slider( "values", 0 ) +
	   " - £" + $( "#slider-range" ).slider( "values", 1 ) );  
	   
	/*--------------------------
	 scrollUp
	---------------------------- */	
	$.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    }); 	   
	
	
 
})(jQuery); 