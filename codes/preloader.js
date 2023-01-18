var loader = document.getElementById("preloader");

const loading_func = () => {
    loader.style.display = "none";
}

const temp = () => { setTimeout(loading_func, 500); }

window.addEventListener("load", temp);