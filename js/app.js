

 
 var swiper = new Swiper(".swiper", {
   effect: "cube",
   grabCursor: true,
   autoplay:{
        delay:3000
   },
   loop:true,
   cubeEffect: {
     shadow: true,
     slideShadows: true,
     shadowOffset: 20,
     shadowScale: .9,
   },
   pagination: {
     el: ".swiper-pagination",
   },
 });
