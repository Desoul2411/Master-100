$( document ).ready(function() {
    //Show hide header right block with application form and navigation
    let burgerOpenButton = document.querySelector('#nav-open-button');
    let burgerCloseButton = document.querySelector('.nav-close-button__span');
    let menuList = document.querySelector('.nav-list');
    
    burgerCloseButton.addEventListener('click', () => {
        menuList.classList.remove('visible');
        document.body.style.overflow = 'auto';
    });
    
    burgerOpenButton.addEventListener('click', () => {
        menuList.classList.add('visible');
        document.body.style.overflow = 'hidden';
    });
    
    
    if ($(window).width() < 993) {    // open close dropdown nav menu on mobile devices when click (tap) on link . For desktops (> 993px) used css hover property
        $(".services_link").click(function(e) {
            event.preventDefault();
            $(".dropdown-list").toggleClass('active-dropdown');
        });   
    };

    
    //**  close dropdown when click outside **/
    let dropdownList = document.querySelector('.dropdown-list');
    document.onclick = function(event){
        if (!event.target.classList.contains('services_link') && !event.target.classList.contains('dropdown-list__item_link') && !event.target.classList.contains('nav-list__item_link') && !event.target.classList.contains('dropdown-list__item_link')) {
            dropdownList.classList.remove('active-dropdown');
        };
    };
    

    /** Modal window starts**/
    const showModal = () => {
         // Blur efffect 
        $('main').css({'transition':'.5s', 'filter':'blur(5px)'});
        $('header').css({'transition':'.5s', 'filter':'blur(5px)'});
        $('.footer').css({'transition':'.5s', 'filter':'blur(5px)'});
        $('.js-overlay-campaign').addClass('show-popup');

        //Disable scroll
        let $body = $(document.body);
        let oldWidth = $body.innerWidth();
        $body.css("overflow", "hidden");
        $body.width(oldWidth);

        //Vertical position for popup window
        let verticalPopupPos = pageYOffset + document.documentElement.clientHeight/2 + 'px';
        $('.popup').css( "top", verticalPopupPos);
    };
    
    // close modal when click X buttton
    const closeModalFunc = () => {
        $('.js-overlay-campaign').removeClass('show-popup');
        $('main').css('filter','none');
        $('header').css('filter','none');
        $('.footer').css('filter','none');
        //Enable scroll
        let $body = $(document.body);
        $body.css("overflow", "auto");
        $body.width("auto");
        if($('.popup').hasClass('thanks-content')) {
            $('.popup').removeClass('thanks-content');
        }
    };

    //closeModal
    $('.js-close-campaign').click(closeModalFunc);
    $('.modal-close-button__button').click(closeModalFunc);
    
    
    //close all modal windows
    const closeAllModals = () => {
        $(document).mouseup(function (e) { 
            let popup = $('.js-popup-campaign');
            if (e.target!=popup[0]&&popup.has(e.target).length === 0&&!$('.nav-list').hasClass("visible")){
                $('.js-overlay-campaign').removeClass('show-popup');
                $('main').css('filter','none');
                $('header').css('filter','none');
                $('.footer').css('filter','none');
                //Enable scroll
                let $body = $(document.body);
                $body.css("overflow", "auto");
                $body.width("auto");

                if($('.popup').hasClass('thanks-content')) {
                    $('.popup').removeClass('thanks-content');
                }
            }
        });
    };
    
    closeAllModals();
    /** Modal window end**/
    
    
    // show order call form
    let orderCallButton = document.querySelector('.header-right-info-order-button__button');
    let modalContentThanksMessage = document.querySelector('.modal-content-thanks');
    let modalContentCallOrder = document.querySelector('.modal-content-call-order'); 
    let leaveCommentButton = document.querySelector('.comments-section__leave-comment-button'); 
    let modalContentComment = document.querySelector('.modal-content-leave-comment'); 
    
    orderCallButton.addEventListener('click',(e)=> {
        modalContentThanksMessage.style.display = 'none';
        modalContentComment.style.display = 'none';
        modalContentCallOrder.style.display = 'flex';
        showModal();
    });
    
    leaveCommentButton.addEventListener('click',(e)=> {
        modalContentCallOrder.style.display = 'none';
        modalContentThanksMessage.style.display = 'none';
        modalContentComment.style.display = 'flex';
        showModal();
    });
    
    
    //Phone enter mask 
    jQuery(document).ready(function() {
        jQuery("#phone-field").mask("+375 (99) 999-99-99");
        jQuery("#phone-field-form2").mask("+375 (99) 999-99-99");
        jQuery("#order-call-form-number").mask("+375 (99) 999-99-99");
    });
    
    
    $(".fancybox").jqPhotoSwipe({
        galleryOpen: function (gallery) {
        //with `gallery` object you can access all methods and properties described here http://photoswipe.com/documentation/api.html
        // gallery.zoomTo(1, {x:gallery.viewportSize.x/2,y:gallery.viewportSize.y/2}, 500);
        var pswp = new PhotoSwipe( /* ... */ );
        pswp.getZoomLevel(3);
        }
    });


    $('.photogallery-block__gallery').owlCarousel({
        loop: false,
        items: 5,
        margin: 12,
        nav:true,
        navText: false,
        responsive:{
            1130: {
               items:5,
            },
            768: {
               items:4,
            },
            425: {
               items:3,
               nav:false,
            },
            320: {
                items:2, 
            },
        }
    });


    $('.works-video-block__gallery').owlCarousel({
        loop: false,
        items: 3,
        margin: 12,
        nav:true,
        navText: false,
        responsive:{
            768: {
               items:3,
            },
            425: {
               items:2,
               nav:false,
            },
            320: {
                items:1, 
            }, 
        }
    });


    //Send order-call-form
    $(".order-call-form").submit(function() {
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $(".order-call-form").trigger("reset");
            modalContentCallOrder.style.display = 'none';
            modalContentComment.style.display = 'none';
            modalContentThanksMessage.style.display = 'flex';
            showModal();
        });
        return false;
    });


    /*** Star rating  starts***/
    const ratingItemList = document.querySelectorAll('.rating__item');
    const ratingItemsArray = Array.prototype.slice.call(ratingItemList);

    ratingItemsArray.forEach(item =>
        item.addEventListener('click',() => {
            const {itemValue} = item.dataset;
            item.parentNode.dataset.totalValue = itemValue;
        })
    ); 
    /*** Star rating end ***/


    /***Custom serialize form data function starts***/
    const serializeForm = ()=> {
		let data = {};
		data.name = $('.leave-comment-form-name__input').val();
        data.mark = $(".leave-comment-form__star-rating-block").attr('data-total-value');
		data.comment = $('.leave-comment-form__comment-input').val();
		return data
	};
     /***Custom serialize form data function end***/


    //Send leave-comment-form
    $(".leave-comment-form").submit(function() {
            modalContentCallOrder.style.display = 'none';
            modalContentComment.style.display = 'none';
            modalContentThanksMessage.style.display = 'flex';
            $('.popup').addClass('thanks-content');
            showModal();
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: serializeForm()
        }).done(function() {
            $(this).find("input").val("");
            $(".leave-comment-form").trigger("reset");
            modalContentCallOrder.style.display = 'none';
            modalContentComment.style.display = 'none';
            modalContentThanksMessage.style.display = 'flex';
            showModal();
        });
        return false;
    });

    
    function returnToVideoBlock () {
        let verticalVideoBlockPosition = $('.works-video-block__gallery').offset().top -40 + 'px';
        $('html, body').animate({
            scrollTop: verticalVideoBlockPosition
        }, 0);
    }; 

    /*** Show youtube video starts ***/
    $('.works-video-block__item').on('click', function() {
        event.preventDefault();
        $('#youtube-tovideo-popup').addClass('active');
        let videoId = $(this).find('img').attr('data-video-id-show');
        let videoIframeSrcValue = 'https://www.youtube.com/embed/' + videoId + '?wmode=opaque&amp;amp;iv_load_policy=3&amp;amp;cc_load_policy=0&amp;amp;modestbranding=1&amp;amp;autohide=2&amp;amp;autoplay=0&amp;amp;rel=0&amp;amp;enablejsapi=1&amp;amp;widgetid=1';
        $('iframe').attr('src',videoIframeSrcValue);
        $('.youtube-tovideo').css('display','block');
        $('body').css('overflow','hidden');

        //Vertical position for popup window
        returnToVideoBlock();
        
        let verticalPopupPos = pageYOffset + 80 + 'px';
        $('.youtube-tovideo').css( "top", verticalPopupPos);
        $('#youtube-tovideo-popup').css({"z-index": "10","visibility":"visible"});
        //Vertical position for close button
        let verticalCloseButttonPos = pageYOffset + 20 + 'px';
        $('#youtube-tovideo-popup-x').css( "top", verticalCloseButttonPos);
    });
    

    var mql = window.matchMedia("(orientation: portrait)");
    // screen orientation event listener
    mql.addListener(function(m) {
        if(m.matches && $('#youtube-tovideo-popup').hasClass('active')) {
            // Changed to portrait mode
            //Vertical position for popup window
            let verticalPopupPos = pageYOffset + 80 + 'px';
            $('.youtube-tovideo').css( "top", verticalPopupPos);
            $('#youtube-tovideo-popup').css({"z-index": "10","visibility":"visible"});
            //Vertical position for close button
            let verticalCloseButttonPos = pageYOffset + 20 + 'px';
            $('#youtube-tovideo-popup-x').css( "top", verticalCloseButttonPos);
        }
        else if (!m.matches && $('#youtube-tovideo-popup').hasClass('active')) {
            // Changed to landscape mode
            //Vertical position for popup window
            let verticalPopupPos = pageYOffset + 80 + 'px';
            $('.youtube-tovideo').css( "top", verticalPopupPos);
            $('#youtube-tovideo-popup').css({"z-index": "10","visibility":"visible"});
            //Vertical position for close button
            let verticalCloseButttonPos = pageYOffset + 20 + 'px';
            $('#youtube-tovideo-popup-x').css( "top", verticalCloseButttonPos);
        }
    });


    /* close video by click on X button */
    $('#youtube-tovideo-popup-x').on('click', function () {
        $('iframe').attr('src','');
        $('.youtube-tovideo').css('display','none');
        $('#youtube-tovideo-popup').css({"z-index": "-1","visibility":"hidden"});
        $('body').css('overflow','auto');
        $('#youtube-tovideo-popup').removeClass('active');
        returnToVideoBlock();
    });


    /* close video by click on empty space */
    $(document).mouseup(function (e) { 
        let popup = $('#videoIframe');
        if (e.target!=popup[0]&&popup.has(e.target).length === 0&&!$('.nav-list').hasClass("visible")){
            $('#youtube-tovideo-popup').css({"z-index": "-1","visibility":"hidden"});
            $('#youtube-tovideo-popup').removeClass('active');
            $('.youtube-tovideo').css('display','none');
            //Enable scroll
            let $body = $(document.body);
            $body.css("overflow", "auto");
            $body.width("auto");
        }
    });


    /*** adjust screen vertical position after leaving video fullscreen mode  ***/
    document.addEventListener("fullscreenchange", function() {
        if (!document.fullscreenElement) returnToVideoBlock();
    }, false);
    
    document.addEventListener("msfullscreenchange", function() {
        if (!document.msFullscreenElement) returnToVideoBlock();
    }, false);
    
    document.addEventListener("mozfullscreenchange", function() {
        if (!document.mozFullScreen) returnToVideoBlock();
    }, false);
    
    document.addEventListener("webkitfullscreenchange", function() {
        if (!document.webkitIsFullScreen) returnToVideoBlock();
    }, false);
    /*** Show youtube video end ***/
});