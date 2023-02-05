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

/* Using test() method to search regexp in details
it returns boolean value*/
let isMobileDevice = regexp.test(details);

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

} else {

}