

//////////////////////////////FEATURE DETECTION: PASSIVE EVENTS//////////////////////////////
let passiveSupported = false;

try {
    const options = {
        get passive() {
            passiveSupported = true;
        }
    };

    window.addEventListener("test", null, options);
    window.removeEventListener("test", null, options);
} catch (err) {
    passiveSupported = false;
}


//////////////////////////////SET UP CAROUSEL (get data, generate item, generate csíkok)//////////////////////////////

function getData() {

    const url = "http://localhost:3000/blogs"
    const fetchOptions = {
        method: "GET",
        header: {
            contentType: "application/json"
        }
    }
    return fetch(url, fetchOptions)
        .then(resp => {
            return resp.json()
        })
}

function carouselGenerator() {
    return new Promise((resolve) => {
        getData()
            .then(result => {
                const carouselCards = [];

                const template = document.getElementById('itemTemplate');
                const carouselList = document.getElementById('carouselList');
                result.forEach(item => {
                    const container = template.content.cloneNode(true).firstElementChild;
                    container.querySelector('#imageGen').setAttribute("src", item.imageurl);
                    container.querySelector('#imageGen').setAttribute("alt", item.imagealt);
                    container.querySelector('#imageGen').setAttribute("loading", "lazy");
                    container.querySelector('#nameGen').textContent = item.name;
                    container.querySelector('#mottoGen').textContent = item.motto;
                    carouselList.appendChild(container);

                    carouselCards.push(container);
                });

                template.parentElement.removeChild(template);

                resolve(carouselCards)
            }
            );
    });
}



const containerCsikok = document.getElementById('csíkok')

carouselGenerator()
    .then((cards) => {
        cards[0].dataset.active = true;

        const childrenNum = cards.length//document.querySelector('[data-slides]').children.length
        for (let i = 0; i < childrenNum; i++) {
            const element = document.createElement('div');
            element.classList.add('csik');
            if (i === 0) {
                element.dataset.active = true
            }
            containerCsikok.appendChild(element)

        }

    })

//////////////////////////////CAROUSEL INTERACTIVE STUFF//////////////////////////////


//setup buttons, on click call carousel mechanic handler function with the respective value (determined from [data-carousel-button])
const buttons = document.querySelectorAll('[data-carousel-button]')
buttons.forEach(item => {
    item.addEventListener('click', () => {
        const offset = (item.dataset.carouselButton === 'left') ? -1 : 1;
        doit(offset)
    })

});

//setup container, on touch events (inside) call carousel mechanic handler function with the respective value (calculated from coordinates)
const container = document.querySelector('[data-carousel-container');

let first;
let last;

container.addEventListener('touchstart', e => {
    first = e.touches[0].clientX;
},
    passiveSupported ? { passive: true } : false)


container.addEventListener('touchmove', e => {
    last = e.touches[0].clientX;
},
    passiveSupported ? { passive: true } : false)


container.addEventListener('touchend', e => {

    if (Math.abs(last - first) > 100) {
        const offset = Math.sign(first - last)
        doit(offset)

    }
},
    passiveSupported ? { passive: true } : false)



//get items in the form of array to determine what the "next" element means and set the [data-]-s accordingly
function doit(offset) {
    const slides = document.querySelector('[data-slides]');

    const currentSlide = slides.querySelector('[data-active]');

    let indexofNextSlide = [...slides.children].indexOf(currentSlide) + offset;
    if (indexofNextSlide < 0) {
        indexofNextSlide = slides.children.length - 1
    }
    if (indexofNextSlide > slides.children.length - 1) {
        indexofNextSlide = 0
    }

    [...slides.children].forEach((item, index) => {
        if (index < indexofNextSlide)
            item.dataset.direction = "to-left";
        else if (index > indexofNextSlide)
            item.dataset.direction = "to-right";
    })
    delete slides.children[indexofNextSlide].dataset.direction


    slides.children[indexofNextSlide].dataset.active = true
    delete currentSlide.dataset.active

    const activeCsik = containerCsikok.querySelector('[data-active]');
    containerCsikok.children[indexofNextSlide].dataset.active = true
    delete activeCsik.dataset.active

}

