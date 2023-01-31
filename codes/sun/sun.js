$(document).ready(function () {
    $('#pagepiling').pagepiling({
        navigation: {
            'textColor': '#000',
            'bulletsColor': '#000',
            'position': 'right',
            'tooltips': ['Overview', 'section2', 'section3', 'section4']
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


// code for blurring 
var sidenavstatus = document.querySelector(".sidenav").getAttribute("aria-checked");
if (sidenavstatus === false) {
    document.getElementById('pagepiling').style.filter = "blur(0.5)";
}

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
            document.querySelector(".section").style.filter = "blur(10px)";
            document.querySelector(".topnav").style.filter = "blur(10px)";
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
            document.querySelector(".section").style.filter = "blur(0px)";
            document.querySelector(".topnav").style.filter = "blur(0px)";
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

