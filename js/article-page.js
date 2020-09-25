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
    
    
    if ($(window).width() < 993) {    // open close dropdown nav menu on mobile devices when click (tap) on link . For destops (> 800px) used css hover property
        $(".services_link").click(function(e) {
            event.preventDefault();
            $(".dropdown-list").toggleClass('active-dropdown');
        });   
    }
    
    
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
    
        //Enable scroll
        let $body = $(document.body);
        $body.css("overflow", "auto");
        $body.width("auto");
        if($('.popup').hasClass('thanks-content')) {
            $('.popup').removeClass('thanks-content');
        }
    }

    //closeModal();
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
    
                //Enable scroll
                let $body = $(document.body);
                $body.css("overflow", "auto");
                $body.width("auto");

                if($('.popup').hasClass('thanks-content')) {
                    $('.popup').removeClass('thanks-content');
                };
            };
        });
    };
    closeAllModals();
    /** Modal window end**/
    
    
    // show order call form
    let orderCallButton = document.querySelector('.header-right-info-order-button__button');
    let popupWindow = document.querySelector('.js-popup-campaign');
    let modalContentThanksMessage = document.querySelector('.modal-content-thanks');
    let modalContentCallOrder = document.querySelector('.modal-content-call-order'); 
    
    orderCallButton.addEventListener('click',(e)=> {
        modalContentCallOrder.style.display = 'flex';
        modalContentThanksMessage.style.display = 'none';
        showModal();
    });
    
    
    //Phone enter mask 
    jQuery(document).ready(function() {
        jQuery("#phone-field").mask("+375 (99) 999-99-99");
        jQuery("#phone-field-form2").mask("+375 (99) 999-99-99");
        jQuery("#order-call-form-number").mask("+375 (99) 999-99-99");
    });
    
    
    //Send order call form
    $(".order-call-form").submit(function() {
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $(".order-call-form").trigger("reset");
            modalContentCallOrder.style.display = 'none';
            modalContentThanksMessage.style.display = 'flex';
            showModal()
        });
        return false;
    });
});