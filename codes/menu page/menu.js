document.addEventListener('DOMContentLoaded', starter);


function starter() {
    let details = navigator.userAgent;
    let regexp = /android|iphone|kindle|ipad/i;
    let isMobileDevice = regexp.test(details);


    if (isMobileDevice) {
        document.querySelector(".canvascontainer").innerHTML = " ";
        // console.log(details);
    }
    else {
        const canvas = document.querySelector('canvas')
        const c = canvas.getContext('2d')

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        const mouse = {
            x: innerWidth / 2,
            y: innerHeight / 2
        }

        const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

        // let button = document.querySelector(".anchor");


        let mouseIn = false
        // button.addEventListener('mouseover', () => {
        //     mouseIn = true
        // })

        // addEventListener('mouseout', () => {
        //     mouseIn = false
        // })

        addEventListener('resize', () => {
            canvas.width = innerWidth
            canvas.height = innerHeight

            init()
        })

        // Objects
        class Particle {
            constructor(x, y, radius, color) {
                this.x = x
                this.y = y
                this.radius = radius
                this.color = color
            }

            draw() {
                c.beginPath()
                c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
                c.shadowColor = this.color
                c.shadowBlur = 15
                c.fillStyle = this.color
                c.fill()
                c.closePath()
            }

            update() {
                this.draw()
            }
        }

        // Implementation
        let particles
        function init() {
            particles = []

            for (let i = 0; i < 50; i++) {
                const canvasWidth = canvas.width + 1000
                const canvasHeight = canvas.height + 2000

                const x = Math.random() * canvasWidth - canvasWidth / 2
                const y = Math.random() * canvasHeight - canvasHeight / 2
                const radius = 2 * Math.random()

                const color = colors[Math.floor(Math.random() * colors.length)]
                particles.push(new Particle(x, y, radius, color))
            }
        }

        // Animation Loop
        let radians = 0
        let alpha = 1
        function animate() {
            requestAnimationFrame(animate)
            c.fillStyle = `rgba(10, 10, 10, ${alpha})`
            c.fillRect(0, 0, canvas.width, canvas.height)

            c.save()
            c.translate(canvas.width / 2, canvas.height / 2)
            c.rotate(radians)
            particles.forEach((particle) => {
                particle.update()
            })
            c.restore()

            radians += 0.003

            if (mouseIn && alpha >= 0.03) {
                alpha -= 0.01
            } else if (!mouseIn && alpha < 1) {
                alpha += 0.01
            }
        }

        init()
        animate()
    }
}


// script for swiper
var swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: false,
    centeredSlides: true,
    slidesPerView: "auto",
    mousewheel: true,
    speed: 600,
    // preventInteractionOnTransition: true,
    // autoHeight: true,
    preloadImages: true,
    // Enable lazy loading
    lazy: false,
    keyboard: {
        enabled: true,
    },
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 3,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});


// code for pressing of enter key to select the given site
// let active_planet = document.querySelector(".swiper-slide-active")
window.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        console.log("enter is pressed");
        event.preventDefault();

        this.document.querySelector(".swiper-slide-active .anchor").click();

    }
})