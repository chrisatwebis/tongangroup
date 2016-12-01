(function ($) {

	//check mobile device
	$.browser.isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

	function centerPartnerLogo() {
		if (!$.browser.isMobile) {
			//partner page, the image will be vertically align with the views row.
			$(".view-id-partners.view-display-id-page .views-row").each(function(){
				var img_height = $(this).find(".views-field-field-logo-image").height();
				var parent_height = $(this).height();
				var margin_top = (parent_height - img_height)/2 + "px";
				$(this).find(".views-field-field-logo-image").css("margin-top", margin_top);
			});
		}
	}
	function centerQuoteForPageWithBanner() {
  	
  	//field collection field for quote,  the quote text and author will align with the image
		if (!$.browser.isMobile) {
			$(".field-collection-item-field-quote").each(function(){
	  		var element_height = $(this).find(".group-right").height();
	  		var parent_height = $(this).height();
	  		var margin_top = (parent_height - element_height)/2 + "px";
	  		$(this).find(".group-right").css("margin-top", margin_top);
	  	});		
		}
		else {
			$(".field-collection-item-field-quote").each(function(){
	  		var margin_top =  "20px";
	  		$(this).find(".group-right").css("margin-top", margin_top);
	  	});		
		}
	}

	function addCustomNav() {
		if ($("#custom-navigator").length > 0) {
			var parent = $("#custom-navigator").parent();
			var nav = $("#custom-navigator").find("ul");
			parent.find(".views-row").each(function(){
				var id = $(this).find(".node-anchor").attr("id");
				var title = $(this).find(".field-name-title .field-item").html();
				var item = $("<li><a href='#"+id+"' class='custom-nav-item'>"+title+"</a></li>");
				nav.append(item);
			});
			$('body').scrollspy({ target: '#custom-navigator' });
			
			var header_height = $("#page-header").outerHeight();
			var affixTop = $('#custom-navigator').offset().top;
			$('#custom-navigator').affix({
			  offset: {
			    top: (affixTop - header_height * 2),
			  }
			})
		}
	}

  $(document).ready(function() {

  	//insert the webform checkboxes description underneath the title
  	$(".webform-component-checkboxes").each(function(){
  		$(this).find(".description").insertAfter($(this).find("> .control-label"));
  	});


  	var is_front = ($("body.front").length > 0) ? true : false;
  	//check mobile device
  	$.browser.isMobile = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
		//get window width;
		var win_width = $(window).width();
		var doc_height = $(document).height();	
		var win_top = $(window).scrollTop();

		var header = $('#page-header');
		var header_height = header.outerHeight();
		if (header.css('position') != 'fixed') {
			header_height = 0;
		}
  
  	//register the anchors for animation;
		$(window).on("load", function() {
  		//affix activation
  		addCustomNav();
	  	$(window).on('resize', function(){
		  	centerPartnerLogo();
				centerQuoteForPageWithBanner();
	  	});
	  	$(window).resize();
			//detect the current url.
	  	var anchor = window.location.hash;
	  	console.log(anchor);
	  	if(anchor.length > 0){
	  		$('a[href*='+anchor+']').first().click();	
	  	}
	  	// bindWindowScroll();

			anchorAnimation();
		});


		function bindWindowScroll(){
	  	$(window).bind('scroll',function(e){
	  		//update the variables while page is scrolling.
	  		doc_height = $(document).height();
				win_top = $(window).scrollTop();
				if(win_top < 0){
					win_top = 0;
					$(window).scrollTop(0);
				}
		  });
	  }

	  function unbindWindowScroll(){
	  	$(window).unbind('scroll');
	  }

	  //register header for animation
		function headerAnimation(){
			//set the background.
			if(win_top > header_height){
				if(!header.hasClass("position_fixed")){
					header.hide();
					header.addClass("position_fixed");
					header.fadeIn(400, "swing", function() {});
				}
			}else{
				if(header.hasClass("position_fixed")){
					header.hide();
					header.removeClass("position_fixed");
					header.fadeIn(400, "swing", function() {});
				}
			}
		}

		//register the anchors for animation
		function anchorAnimation() {
			$(".block_anchor").each(function(){
				var element_id = $(this).attr("id");
		    $('a[href*=#'+element_id+']').click(function(e){
		    	if($('#'+element_id).length > 0){
		    		e.preventDefault();
				    // $('html, body').animate({ scrollTop: ($('#'+element_id).offset().top - header_height - 30) }, 1000, function() {
				    $('html, body').animate({ scrollTop: ($('#'+element_id).offset().top - header_height) }, 1000, function() {
				    	removeHash();				    	
				    });

			   	}
		    });			
			});
			$(".node-anchor").each(function(){
				var element_id = $(this).attr("id");
		    $('a[href*=#'+element_id+']').click(function(e){
		    	if($('#'+element_id).length > 0){
		    		e.preventDefault();
				    $('html, body').animate({ scrollTop: ($('#'+element_id).offset().top - header_height) }, 1000, function() {
				    	removeHash();				    	
				    });

			   	}
		    });			
			});
		}

		function removeHash () { 
		  history.pushState("", document.title, window.location.pathname + window.location.search);
		}

		//serach form handler
		//var baseUrl = window.location.protocol + "//" + window.location.host + "/sites/all/themes/first_world/css/img/list-icon/search-icon_1.png";
		//console.log(baseUrl);

		$("#block-search-form .form-search .input-group >input").addClass("hidden");
		$("#block-search-form .form-search .input-group >input").css({width: 0, opacity: 0});

		// $("#navbar .navbar-collapse .menu.navbar-nav").append("<input type='image' src='"+baseUrl+"' width='34' height='34'>");
		// $("#navbar .navbar-collapse .menu.navbar-nav >input").click(function(){
		// 	if ($("#block-search-form .form-search .input-group >input").hasClass("hidden")) {
		// 		showSearchForm();
		// 	}
		// 	else {
		// 		hideSearchForm();
		// 	}
		// });
		
		$(".search-link").click(function(e){
			e.preventDefault();
			if ($("#block-search-form .form-search .input-group >input").hasClass("hidden")) {
				showSearchForm();
			}
			else {
				hideSearchForm();
			}
		});

		
		// $("#block-search-form .form-search .input-group >input").blur(function(){
		// 	console.log("blur");
		// 	hideSearchForm();
		// });


		function showSearchForm() {
			$("#block-search-form .form-search .input-group >input").removeClass("hidden");
			$("#block-search-form .form-search .input-group >input").animate({
				width: 180,
				opacity: 1,
			}, 'slow');
			$("#block-search-form .form-search .input-group >input").focus();
		}

		function hideSearchForm() {
			$("#block-search-form .form-search .input-group >input").animate({
				width: 0,
				opacity: 0,
			}, 'slow', function(){
				$("#block-search-form .form-search .input-group >input").addClass("hidden");
			});
		}
	
	});

})(jQuery);




