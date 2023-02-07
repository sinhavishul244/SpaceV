var loader = document.getElementById("preloader");

const loading_func = () => {
    loader.style.display = "none";
}

const temp = () => { setTimeout(loading_func, 500); }

window.addEventListener("load", temp);



//adding code for rotation in mobile devices only
// #####################################################################

/* Storing user's device details in a variable*/
let details = navigator.userAgent;

/* Creating a regular expression
containing some mobile devices keywords
to search it in details string*/
let regexp = /android|iphone|kindle|ipad/i;
let regexp_ipad = /ipad|iPad/i;

/* Using test() method to search regexp in details
it returns boolean value*/
// console.log(details);
let isMobileDevice = regexp.test(details);
let isIPad = regexp_ipad.test(details);

if (isMobileDevice) {
    // Get HTML head element
    var head = document.getElementsByTagName('HEAD')[0];

    // Create new link Element
    var link = document.createElement('link');

    // set the attributes for link element
    link.rel = 'stylesheet';

    link.type = 'text/css';

    link.href = '../rotate-device-mobile.css';

    // Append link element to HTML head
    head.appendChild(link);

    document.querySelector(".sun_3d_model").addEventListener("touchstart", () => {
        // console.log("touching sun of phone");
        $.fn.pagepiling.setAllowScrolling(false);
        $.fn.pagepiling.setKeyboardScrolling(false);
    });

    document.querySelector(".sun_3d_model").addEventListener("touchend", () => {

        $.fn.pagepiling.setAllowScrolling(true);
        $.fn.pagepiling.setKeyboardScrolling(true);
    });

} else {

}

// fixing the website for ipad 
//################################################################

if (isIPad) {
    // console.log(details);
    // console.log("the device is i pad : " + isIPad);
    var head = document.getElementsByTagName('HEAD')[0];

    // Create new link Element
    var link = document.createElement('link');

    // set the attributes for link element
    link.rel = 'stylesheet';

    link.type = 'text/css';

    link.href = '../ipad.css';

    // Append link element to HTML head
    head.appendChild(link);
}

//adding code for active list item is sidenav
let active_li = document.querySelector(".active-sublist-item");
active_li.addEventListener("click", () => {
    setTimeout(buttoncloser, 100);
})