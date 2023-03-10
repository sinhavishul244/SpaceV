//variable for controling render of 3d model on screen 
let overviewpage = document.querySelector(".overview-page");
let hamburgerbtn = document.querySelector(".hamburger-btn");
let blackscreen = document.querySelector(".blackscreen");
let crossbtn = document.querySelector(".cross-btn");
let active = document.querySelector(".active-sublist-item");
const earth_life_video = document.querySelector(".earth-life-video");
let vidIsPlayable = false;



//code for pagepiling 
//#########################################################

$(document).ready(function () {
    $('#pagepiling').pagepiling({
        navigation: {
            'textColor': '#000',
            'bulletsColor': '#000',
            'position': 'right',
            'tooltips': ['Overview', 'Orbit and Rotation', 'Formation and Structure', 'Atmosphere', 'Magnetosphere', 'Surface', 'Potential for life', 'Images']
        },
        easing: 'linear',
        afterRender: function () {
            hamburgerbtn.addEventListener("click", () => {
                overviewpage.setAttribute('aria-hidden', 'false');
            })

            crossbtn.addEventListener("click", () => {
                overviewpage.setAttribute('aria-hidden', 'true');
            })

            blackscreen.addEventListener("click", () => {
                overviewpage.setAttribute('aria-hidden', 'true');
            })

            active.addEventListener("click", () => {
                overviewpage.setAttribute('aria-hidden', 'true');
            })
        },
        afterLoad: function (anchorLink, index) {
            if (index == 1) {
                overviewpage.setAttribute('aria-hidden', 'true');
                //stopping rendering while 3D model is not visible




                hamburgerbtn.addEventListener("click", () => {
                    overviewpage.setAttribute('aria-hidden', 'false');
                })

                crossbtn.addEventListener("click", () => {
                    overviewpage.setAttribute('aria-hidden', 'true');
                })

                blackscreen.addEventListener("click", () => {
                    overviewpage.setAttribute('aria-hidden', 'true');
                })

                active.addEventListener("click", () => {
                    overviewpage.setAttribute('aria-hidden', 'true');
                })
            }

        },

        onLeave: function (index, nextIndex, direction) {
            if (index == 1 && direction == 'down') {
                overviewpage.setAttribute('aria-hidden', 'false');
                hamburgerbtn.addEventListener("click", () => {
                    overviewpage.setAttribute('aria-hidden', 'false');
                })

                crossbtn.addEventListener("click", () => {
                    overviewpage.setAttribute('aria-hidden', 'false');
                })

                blackscreen.addEventListener("click", () => {
                    overviewpage.setAttribute('aria-hidden', 'false');
                })

                active.addEventListener("click", () => {
                    overviewpage.setAttribute('aria-hidden', 'false');
                })
            }


            //code for video - section 1a - potential for life
            //####################################################
            if (nextIndex == 7) {
                earth_life_video.play();
                vidIsPlayable = true;
                // console.log("video should play!")
                // earth_life_video.muted = true;
            }
            if (index == 7) {
                earth_life_video.pause();
                vidIsPlayable = false;
                // earth_life_video.muted = false;
            }

        },

    });
});

// code for hide information 
// earth potential for life
//####################################################
function life_buttoncloser() {
    let text = document.querySelector(".bbclogo-and-button button").textContent;
    // console.log(text);

    if (text === "hide information") {
        // console.log("text is hide information");
        // document.querySelector(".sec1a-text").style.transform = 'translateY(50%) scale(0.6)';
        document.querySelector(".sec1a-text").style.opacity = 0;
        document.querySelector(".bbclogo-and-button button").textContent = "show information";
        document.querySelector(".sec1a-text").style.visibility = 'hidden';
    }
    else {
        // document.querySelector(".sec1a-text").style.transform = 'translateY(0%) scale(1)';
        document.querySelector(".bbclogo-and-button button").textContent = "hide information";
        document.querySelector(".sec1a-text").style.opacity = 1;
        document.querySelector(".sec1a-text").style.visibility = 'visible';


    }
}


// console.log("mute property : " + earth_life_video.muted);
// code for muting video 
let mutebtn = document.querySelector(".muteicon");
mutebtn.addEventListener('click', () => {
    if (!earth_life_video.muted) {
        earth_life_video.muted = true;
        mutebtn.style.opacity = "0.2"
    }
    else {
        earth_life_video.muted = false;
        mutebtn.style.opacity = "1"
    }
})


// code for images swiper - section 6 image 
//###################################################

var swiper = new Swiper(".imageSwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    loop: true,
    zoom: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        // dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,

    },
    breakpoints: {
        1000: {
            slidesPerView: 1.75,
            autoplay: {
                delay: 4000,
                disableOnInteraction: true,

            },

        },

    }
});


// code for image information in mobile devices 
//###########################################################################

function moreinfromation() {
    swiper.autoplay.stop();
    let button_text = document.querySelector(".mobile-info-btn").textContent;
    // console.log(button_text);
    if (button_text === "show information") {
        document.querySelector(".mobile-info-btn").textContent = "hide information";
        document.querySelector(".swiper-slide p").style.transform = "translateY(0%)";
        document.querySelector(".swiper-slide-active p").style.transform = "translateY(0%)";
    }
    else {
        swiper.autoplay.start();
        document.querySelector(".mobile-info-btn").textContent = "show information";
        document.querySelector(".swiper-slide-active p").style.transform = "translateY(100%)";
        document.querySelector(".swiper-slide p").style.transform = "translateY(100%)";

    }
}


swiper.on('realIndexChange', () => {
    let button_text = document.querySelector(".mobile-info-btn").textContent;

    if (button_text == "hide information") {
        document.querySelector(".mobile-info-btn").textContent = "show information";
        document.querySelector(".swiper-slide-active p").style.transform = "translateY(100%)";
        document.querySelector(".swiper-slide p").style.transform = "translateY(100%)";
        swiper.autoplay.start();
    }
    // else if (button_text == "show information") {
    //     document.querySelector(".mobile-info-btn").textContent = "hide information";
    //     document.querySelector(".swiper-slide p").style.transform = "translateY(0%)";
    //     document.querySelector(".swiper-slide-active p").style.transform = "translateY(0%)";
    // }
});




// code for side menu 
//#####################################################################################

function buttonopener() {
    var sidenav = document.querySelector(".sidenav");
    var btnstatus = sidenav.getAttribute("aria-checked");
    if (vidIsPlayable == true)
        earth_life_video.pause();

    // console.log("checking");
    if (btnstatus === 'false') {
        sidenav.setAttribute('aria-checked', 'true');

        let q1 = window.matchMedia("(max-width : 682px)");
        if (q1.matches) {
            // console.log("hello there");
        }
        else {
            document.querySelector(".blackscreen").style.visibility = "visible";
            document.querySelector(".blackscreen").style.opacity = "0.98";
            // document.querySelector(".section").style.opacity = "0.2";
            // document.querySelector(".topnav").style.filter = "blur(10px)";
            // document.querySelector(".topnav").style.opacity = "0.2";
            // to close the sidemenu when button is clicked 
            document.querySelector(".blackscreen").onclick = buttoncloser;

            // disabling the navbar anchor links 
            // document.querySelector(".home").style.pointerEvents = "none";
            // document.querySelector(".destinations").style.pointerEvents = "none";

            // document.querySelector(".home").onclick = buttoncloser;
            // document.querySelector(".destinations").onclick = buttoncloser;

            $.fn.pagepiling.setAllowScrolling(false);
            $.fn.pagepiling.setKeyboardScrolling(false);



        }
        document.getElementById('pp-nav').style.display = 'none';
    }


}


function buttoncloser() {
    var sidenav = document.querySelector(".sidenav");
    var btnstatus = sidenav.getAttribute("aria-checked");
    if (vidIsPlayable)
        earth_life_video.play();


    if (btnstatus === 'true') {
        let q1 = window.matchMedia("(max-width : 682px)");
        if (q1.matches) {
            // console.log("hello there");
        }
        else {
            // document.querySelector(".section").style.filter = "blur(0px)";
            document.querySelector(".blackscreen").style.visibility = "hidden";
            document.querySelector(".blackscreen").style.opacity = "0";
            // document.querySelector(".section").style.opacity = "1";
            // document.querySelector(".topnav").style.filter = "blur(0px)";
            // document.querySelector(".topnav").style.opacity = "1";

            // document.querySelector(".home").style.pointerEvents = "auto";
            // document.querySelector(".destinations").style.pointerEvents = "auto";


            $.fn.pagepiling.setAllowScrolling(true);
            $.fn.pagepiling.setKeyboardScrolling(true);
        }

        sidenav.setAttribute('aria-checked', 'false');
        document.getElementById('pp-nav').style.display = 'block';
    }

}


let hamburger = document.querySelector(".hamburger-btn");
hamburger.onclick = buttonopener;
let cross = document.querySelector(".cross-btn");
cross.onclick = buttoncloser;




// code for animating the hero element
//#####################################################################################
// document.addEventListener('DOMContentLoaded', starter);
// function starter() {
//     let q = window.matchMedia("(max-width : 682px)");
//     if (q.matches) {
//         // console.log("hello there");
//     }
//     else {
//         window.addEventListener('load', () => {
//             let ov1 = document.querySelector('.hero1');
//             ov1.style.transform = 'translate(-50%,-50%)'
//             ov1.style.opacity = 1;
//         })
//     }
// }

// code for back button
// ##############################################
// window.onpopstate = function (event) {
//     if (event.state !== null) {
//         console.log('Back button pressed');
//         let url = new URL(window.location.href);
//         alert("back button pressed")

//         // Add a new parameter to the URL
//         url.searchParams.append('slide', '3');

//         // Redirect the browser to the new URL
//         window.location.href = url.href;
//     }
// };

// window.onpopstate = function () {
//     alert("Back/Forward clicked!");
// }

// jQuery(document).ready(function ($) {

//     if (window.history && window.history.pushState) {

//         window.history.pushState('forward', null, './#forward');

//         $(window).on('popstate', function () {
//             alert('Back button was pressed.');
//         });

//     }
// });

// animation for aurora
let aurora = document.getElementById('aurora');
aurora.addEventListener('mouseover', () => {
    document.querySelector('.sec4a-alternate-image').style.opacity = 1;
    document.querySelector('.sec4a-alternate-image').style.visibility = 'visible';
    document.querySelector('.sec4a-image').style.opacity = 0;
    document.querySelector('.sec4a-image').style.visibility = 'hidden';

})
aurora.addEventListener('mouseout', () => {
    document.querySelector('.sec4a-alternate-image').style.opacity = 0;
    document.querySelector('.sec4a-alternate-image').style.visibility = 'hidden';
    document.querySelector('.sec4a-image').style.opacity = 1;
    document.querySelector('.sec4a-image').style.visibility = 'visible';

})

let solarwind = document.getElementById('solarwind');
solarwind.addEventListener('mouseover', () => {
    document.querySelector('.sec4a-solar-wind-image').style.opacity = 1;
    document.querySelector('.sec4a-solar-wind-image').style.visibility = 'visible';
    document.querySelector('.sec4a-image').style.opacity = 0;
    document.querySelector('.sec4a-image').style.visibility = 'hidden';

})
solarwind.addEventListener('mouseout', () => {
    document.querySelector('.sec4a-solar-wind-image').style.opacity = 0;
    document.querySelector('.sec4a-solar-wind-image').style.visibility = 'hidden';
    document.querySelector('.sec4a-image').style.opacity = 1;
    document.querySelector('.sec4a-image').style.visibility = 'visible';

})
