$(document).ready(function() {
    /**Scroll to element starts**/
    var $page = $('html, body');
    $('a[href*="#"]').click(function() {
        $page.animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 400);
        return false;
    });
    /**Scroll to element end**/


    //Show hide header right block with application form and navigation
    let burgerOpenButton = document.querySelector('#nav-open-button');
    let burgerCloseButton = document.querySelector('.nav-close-button__span');
    let headerRightBlock = document.querySelector('.header-right');
    let menuList = document.querySelector('.nav-list');


    burgerCloseButton.addEventListener('click', () => {
        menuList.classList.remove('visible');
        document.body.style.overflow = 'auto';
    });
    
    burgerOpenButton.addEventListener('click', () => {
        menuList.classList.add('visible');
        document.body.style.overflow = 'hidden';
    });


    /**  Show menu dropdown list starts**/
    if ($(window).width() < 993) {    // opem close nav menu on mobile devices when click (tap) on link . For destops (> 800px) used css hover property
        $(".services_link").click(function(e) {
            event.preventDefault();
            $(".dropdown-list").toggleClass('active-dropdown');
        });   
    };


    /**  close dropdown when click outside **/
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
        $('main').css('filter','blur(0px)');
        $('header').css('filter','blur(0px)');

        //Enable scroll
        let $body = $(document.body);
        $body.css("overflow", "auto");
        $body.width("auto");
        if($('.popup').hasClass('thanks-content')) {
            $('.popup').removeClass('thanks-content');
        };
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
                $('main').css('filter','blur(0px)');
                $('header').css('filter','blur(0px)');

                //Enable scroll
                let $body = $(document.body);
                $body.css("overflow", "auto");
                $body.width("auto");

                if($('.popup').hasClass('thanks-content')) {
                    $('.popup').removeClass('thanks-content');
                }
            }
        });
    }
    closeAllModals();
    /** Modal window end**/


    // show order call form
    let orderCallButton = document.querySelector('.header-right-info-order-button__button');
    let modalContentThanksMessage = document.querySelector('.modal-content-thanks');
    let modalContentCallOrder = document.querySelector('.modal-content-call-order'); 

    const showOrderCallForm = () => {
        modalContentCallOrder.style.display = 'flex';
        modalContentThanksMessage.style.display = 'none';
    };


    orderCallButton.addEventListener('click',()=> {
        showOrderCallForm();
        showModal();
    });


    //Phone enter mask 
    jQuery(document).ready(function() {
        jQuery("#phone-field").mask("+375 (99) 999-99-99");
        jQuery("#phone-field-form2").mask("+375 (99) 999-99-99");
        jQuery("#order-call-form-number").mask("+375 (99) 999-99-99");
    });


    /**Send form starts **/
    $(".form").submit(function() {
        modalContentCallOrder.style.display = 'none';
        modalContentThanksMessage.style.display = 'flex';
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $(this).find("textarea").val("");
            $(".form").trigger("reset");
            showModal();
        });
        return false;
    });


    //find-master-form
    $(".form-2").submit(function() {
        $.ajax({
            type: "POST",
            url: "mail.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $(this).find("textarea").val("");
            $(".form-2").trigger("reset");
            modalContentCallOrder.style.display = 'none';
            modalContentThanksMessage.style.display = 'flex';
            showModal();
        });
        return false;
    });


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
    /**Send form end**/



    // add orange arrow to hovered work-block
    if ($(window).width() > 767) {
        let workItem = document.querySelectorAll('.gallery-block-link');
        workItem.forEach(item => {
            item.addEventListener('mouseenter',(e)=> {
                e.target.querySelector('.work-arrow').classList.add('arrow-active');
            })
            item.addEventListener('mouseleave',(e)=> {
                e.target.querySelector('.work-arrow').classList.remove('arrow-active');
            })
        })
    };


    //Show application form when click link in the order-info-section 
    let infoLink = document.querySelector('.info-application-link');
    infoLink.addEventListener('click', () => {
        headerRightBlock.style.visibility = 'visible';
        headerRightBlock.style.top = '0px';
        $('html, body').animate({scrollTop: 0},500);
        return false;
    });


    /** specialists-section slider starts**/
    $('.owl-carousel').owlCarousel({
        loop: true,
        items: 4.6,
        margin: 20,
        nav:true,
        navText:false,
        responsive:{
            1100: {
                items:4.6
            },
            768: {
                items:3.6,
                nav:true
            },
            425: {
                items:2,
                stagePadding:40,
                nav:false
            },
            320: {
                items:1,
                stagePadding:40,
                nav:false,
            },
        }
    });


    if ($(window).width() < 600) {
        $(document).ready(function () {
            $(".main-certificates-block").css("display", "block");
            $(".certificates-section-container").css("margin-right","0px");
            $(".main-certificates-block").addClass("owl-carousel");

            $(".owl-carousel").owlCarousel({
                loop: true,
                items: 2.3,
                nav: false,
                dots:false,
                navText: "",
                margin: 20,
                responsive:{
                    425:{
                        items:2.6
                    },
                    320:{
                        margin:10,
                        items:2.6
                    }
                }
            });
        });
    };


    /**  articles-section starts **/
    //make section heights equal
    if ($(window).width() > 985) {
        $(document).ready(function () {
            let articlesBlock = document.querySelector('.articles-section__articles-block');
            let workBlockSection = document.querySelector('.articles-section-picture-section');
            articlesBlock.style.height = workBlockSection.clientHeight + 'px';
            window.addEventListener('resize', function(event){
                articlesBlock.style.height = workBlockSection.clientHeight + 'px';
            });
        });
    };


    // SimpleBar (custom scrollbar)
    if ($(window).width() > 1024) { 
        const simpleBar = new SimpleBar(document.getElementById('articles-list'), {
            scrollbarMinSize:100,
            autoHide:true
    });
    //simpleBar.getContentElement();
    simpleBar.recalculate();
    }
    /**  articles-section end **/
});