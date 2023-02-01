$(document).ready(function () {
    $('#pagepiling').pagepiling({
        navigation: {
            'textColor': '#000',
            'bulletsColor': '#000',
            'position': 'right',
            'tooltips': ['Overview', 'Orbit and Rotation', 'section3', 'section4']
        },
        easing: 'linear',
        afterLoad: function (anchorLink, index) {
            //using index
            if (index == 1) {
                // alert("Section 3 ended loading");
            }
        },

    });
});



// code for side menu 

function buttonopener() {
    var sidenav = document.querySelector(".sidenav");
    var btnstatus = sidenav.getAttribute("aria-checked");
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
            document.querySelector(".topnav").style.filter = "blur(10px)";
            document.querySelector(".topnav").style.opacity = "0.2";
            // to close the sidemenu when button is clicked 
            document.querySelector(".blackscreen").onclick = buttoncloser;

            // disabling the navbar anchor links 
            document.querySelector(".home").style.pointerEvents = "none";
            document.querySelector(".destinations").style.pointerEvents = "none";

            document.querySelector(".home").onclick = buttoncloser;
            document.querySelector(".destinations").onclick = buttoncloser;

            $.fn.pagepiling.setAllowScrolling(false);
            $.fn.pagepiling.setKeyboardScrolling(false);



        }
        document.getElementById('pp-nav').style.display = 'none';
    }


}


function buttoncloser() {
    var sidenav = document.querySelector(".sidenav");
    var btnstatus = sidenav.getAttribute("aria-checked");

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
            document.querySelector(".topnav").style.filter = "blur(0px)";
            document.querySelector(".topnav").style.opacity = "1";

            document.querySelector(".home").style.pointerEvents = "auto";
            document.querySelector(".destinations").style.pointerEvents = "auto";


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
document.addEventListener('DOMContentLoaded', starter);
function starter() {
    let q = window.matchMedia("(max-width : 682px)");
    if (q.matches) {
        // console.log("hello there");
    }
    else {
        window.addEventListener('load', () => {
            let ov1 = document.querySelector('.hero1');
            ov1.style.transform = 'translate(-50%,-50%)'
            ov1.style.opacity = 1;
        })
    }
}

