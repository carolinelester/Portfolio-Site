/*!
 * Author: Theme designed and developed by Michael Palmer, MP Web.
 * Website: https://www.michaelpalmerwebdesign.com.
 * Copyright MP Web 2018.
 * Template website: https://www.brutalist.design.
 */
(function () {

  //dom loaded
  $(function () {



    //Styles toggle - live only
    $('div.style-toggle span').click(function(){

      var stylesheet = $('#main-css'),
      active_style = stylesheet.attr('href'),
      title = $('strong.style-toggle-title'),
      active_title = title.text();

      stylesheet.attr('href', stylesheet.data('mode'));
      stylesheet.data('mode', active_style);

      console.log('active_title: ', active_title);
      console.log('data title: ', title.data('title'));

      title.text(title.data('title'));
      title.data('title', active_title);


    });
    //Styles toggle - live only


    //Cache jQuery objects for reuse
    var ui_elem = {
      'gallery_carousel': $('#gallery-carousel'),
      'video': $('#video .owl-carousel'),
      'team_carousel': $(".team-carousel.owl-carousel"),
      'products_carousel_wrap': $(".products-carousel.owl-carousel"),
      'products_carousel': null,
      'product': $('.product-wrap'),
      'price': $('.prices-right > div'),
      'form': $('.sub-form, .contact-form'),
      'form_email': {
        'sub_email': $('input#email'),
        'contact_email': $('input#contact-email')
      },
      'form_name': {
        'sub_name': $('input#name'),
        'contact_name': $('input#contact-name'),
      },
      'form_message': $('textarea#message'),
      'countdown_timer': $('.timer-wrap'),
      'video_play': $('#video-wrap').children('p'),
      'mobile_nav_btn': $('#mobile-nav'),
      'mobile_nav': $('div.navigation'),
      'template_title': $('h1 a'),
    };


    //run preloader
    run_preloader();

    //gallery carousel
    if (ui_elem.gallery_carousel.length) {
      ui_elem.gallery_carousel.owlCarousel({
        items: 1,
        nav:true,
        dots:false,
        loop: true
      });
    }


    //Video carousel
    if (ui_elem.video.length) {
    ui_elem.video.owlCarousel({
        items: 1,
        nav: true,
        dots: false,
        video:true,
        lazyLoad:false,
        autoHeight: true
      });
    }//Video carousel


    //Team carousel
    if (ui_elem.team_carousel.length) {
      ui_elem.team_carousel.owlCarousel({
        items: 3,
        nav: true,
        navText: ['<span>PREV</span>', '<span>NEXT</span>'],
        dots: false,
        loop: true,
        lazyLoad: true,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1
          },
          768: {
            items: 2
          },
          1024: {
            items: 3
          }
        }
      });
    }//end team carousel


    //products carousel
    if (ui_elem.products_carousel_wrap.length) {
      ui_elem.products_carousel = ui_elem.products_carousel_wrap.owlCarousel({
        items: 1,
        nav: true,
        navText: ['<span>&larr;</span>', '<span>&rarr;</span>'],
        dots: false,
        loop: true,
        lazyLoad: true,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1
          },
          768: {
            items: 2
          },
          1024: {
            items: 1
          }
        },
        onInitialize : function(){
          //Remove the title slide from the carousel on mobile
          if ($(window).width() <= 768) {
            $('div.products-title-carousel').remove();
          }
        },
        onInitialized: function(){
          setProductClick();
        }
      });
    }//end products carousel


    /**
     * Click on product to view
     */
    function setProductClick () {
      ui_elem.product.on('click', function(){
        var pid = $(this).data('product-id');
        ui_elem.products_carousel.trigger("to.owl.carousel", [pid, 1, true])
      });
    }//end product click


    //Prices click
    if (ui_elem.price.length) {
      ui_elem.price.on('click', function(){
        var $this = $(this),
        close_all = function () {
          ui_elem.price.each(function(){
            if ($(this).hasClass('active')) {
              ui_elem.price.removeClass('active');
              setTimeout(function () {
                ui_elem.price.css('z-index', 1);
              }, 200);
            }
          });
        };

        if ($this.hasClass('active')) {
          close_all();
        } else {
          close_all();
          setTimeout(function () {
            $this.css('z-index', 2);
            $this.addClass('active');
          }, 201);
        }
      });
    }//end prices click


    //YT video play - hide placeholder img
    ui_elem.video_play.on('click', function(){
      $(this).hide().next('img').hide();
      $(".active .owl-video-play-icon").trigger("click");
    });//end video play on click


    //nav style 2 mobile menu
    ui_elem.mobile_nav_btn.on('click', function(){
      ui_elem.mobile_nav.toggle();
    });


    //Nav click for template style 2. Jump to section with offset for fixed menu
    $(document).on('click', 'nav.nav-fs li.anchor > a[href^="#"]', function (event) {
      event.preventDefault();
      $('html, body').scrollTop($($.attr(this, 'href')).offset().top - $('nav').outerHeight());
    });//end template style 2 nav click


    //Contact and Subscribe form submit
    if (ui_elem.form.length) {
      ui_elem.form.submit(function (e) {
        var $form = $(this);
        e.preventDefault();

        var input_name, name, input_email, email;
        if ($form.hasClass('sub-form')) {
          input_name = ui_elem.form_name.sub_name;
          name = input_name.val();

          input_email = ui_elem.form_email.sub_email;
          email = input_email.val();
        } else {
          input_name = ui_elem.form_name.contact_name;
          name = input_name.val();

          input_email = ui_elem.form_email.contact_email;
          email = input_email.val();
        }

        $form.addClass('active-sending');
        if (email.length > 0) {
          $.ajax({
            url: $form.attr('action'),
            type: $form.attr('method'),
            data: $form.serialize(),
            success: function (response) {
              setTimeout(function () {
                $form.removeClass('active-sending').addClass('active-sent');
                input_email.val('');
                if (ui_elem.form_message.length) ui_elem.form_message.val('');
                input_name.val('');
              }, 3000);

              setTimeout(function () {
                $form.removeClass('active-sent');
              }, 5000);
            }//end ajax success
          });
        }
        return false;
      });
    }//end AJAX form submit



    //Coming soon countdown timer
    if (ui_elem.countdown_timer.length) {
      var elem = ui_elem.countdown_timer,
        st = elem.data('start-time'),
        days = elem.data('lng-days'),
        hrs = elem.data('lng-hours'),
        mins = elem.data('lng-mins'),
        secs = elem.data('lng-secs');

      elem.countdown(st, function (event) {
        $(this).html(event.strftime(
          '<span>' +
          '<span class="time">%D</span>' +
          '<br/>' +
          days +
          '</span><!--' +
          '--><span class="sep">:</span><!--' +
          '--><span>' +
          '<span class="time">%H</span>' +
          '<br/>' +
          hrs +
          '</span><!--' +
          '--><span class="sep">:</span><!--' +
          '--><span>' +
          '<span class="time">%M</span>' +
          '<br/>' +
          mins +
          '</span><!--' +
          '--><span class="sep">:</span><!--' +
          '--><span>' +
          '<span class="time">%S</span>' +
          '<br/>' +
          secs +
          '</span>'
        ));
      });
    }//end countdown timer


  });//end dom loaded


  /**
   * Run the preloader:
   *
   * 1: Output the loading text, each letter of the loading text is output in 500ms increments
   * 2: Once the loading text is completed check if the youtube video has loaded
   * 3: When the youtube video is loaded remove the preloader   *
   *
   * @type {null}
   */
  var interval = null, inc = 350;
  function run_preloader () {

    var p = $('p.loading-text'),
        preloader = $('.preloader');

    interval = setInterval(function(){
      var len = p.children('span').length, i = 0;
      for (i; i < len; i++) {
        if (!$(p.children('span')[i]).hasClass('load-letter')) {
          $(p.children('span')[i]).addClass('load-letter');
          return false;
        }
      }

      if ($('.load-letter').length === p.children('span').length) {

        setTimeout(function () {
          p.next('p').addClass('is-loaded');
        }, (inc));


        //set fs height
        set_fs_height();

        setTimeout(function () {
          clearInterval(interval);
          interval = null;
          $('body').removeClass('of-hidden');

          $('.stretch-text').each(function(){
            if (!$(this).hasClass('ls-set')) {
              $(this).addClass('ls-set');
              $(this).stretch_text();
            }
          });

          preloader.fadeOut('slow', function(){
            $(this).remove();
          });
        }, (inc*4));
      }
    }, inc);
  }//end fn run_preloader



  function set_fs_height () {
    var body = $('body');
    if (body.hasClass('coming-soon') && $(window).width() <= 736) {
      if ($(window).height() < body.height()) {
        body.css('height', 'auto');
      } else {
        body.css('height', '100vh');
      }
    }
  }//end fn set_fs_height



  //Stretch title text to fit parent
  $.fn.stretch_text = function () {
    var elmt = $(this),
      cont_width = elmt.width(),
      txt = elmt.html();

    if (elmt.find('.stretch_it').length > 0) {
      txt = elmt.find('.stretch_it').html();
      elmt.html(txt);
    }

    var one_line = $('<span class="stretch_it">' + txt + '</span>'),
      nb_char = elmt.text().length,
      spacing = cont_width / nb_char,
      txt_width;

    elmt.html(one_line);
    txt_width = one_line.width();

    var char_width = txt_width / nb_char,
        ltr_spacing = spacing - char_width + (spacing - char_width) / nb_char;

    if (ltr_spacing < 0) {
      ltr_spacing = 0;
    }

    one_line.css({'letter-spacing': ltr_spacing});
  };

})($);