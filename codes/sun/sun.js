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


document.addEventListener('DOMContentLoaded', starter);
function starter() {
    let q = window.matchMedia("(max-width : 682px)");
    if (q.matches) {
        console.log("hello there");
    }
    else {
        window.addEventListener('load', () => {
            let ov1 = document.querySelector('.hero1');
            ov1.style.transform = 'translate(-50%,-50%)'
            ov1.style.opacity = 1;
        })
    }
}

