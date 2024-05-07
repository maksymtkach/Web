var swiper = new Swiper(".mySwiper", {
    loop: true, // Enable continuous looping
    pagination: {
      el: ".swiper-pagination",
      clickable: true, // Make dots clickable
      dynamicBullets: true, // Optional: make pagination bullets dynamic
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    autoplay: {
      delay: 4000, // Delay in ms before transitioning to the next slide
      disableOnInteraction: false, // Continue autoplay when interacting with controls
    },
    speed: 500, // Duration of transition between slides in milliseconds
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 50,
      },
    },
    on: {
      init: function() {
        console.log('swiper initialized');
      },
      slideChange: function() {
        console.log('slide changed');
      }
    }
  });

  document.querySelector('.swiper').addEventListener('mouseenter', function() {
    swiper.autoplay.stop();
    console.log('autoplay stopped');
  });

  document.querySelector('.swiper').addEventListener('mouseleave', function() {
    swiper.autoplay.start();
    console.log('autoplay started');
  });