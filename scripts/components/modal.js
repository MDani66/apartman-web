const data = [
    {
        id: 123,
        title: "Mountains travel",
        img: "/assets/img/1.jpg",
        desc: "Sample text. Click to select the text box. Click again or double click to start editing the text.",
        price: 600,
        locations: [
            {
                place: "Winterspring",
                start: "2023.03.12",
                end: "2023.03.20",
                perks: [
                    "ltrices gravida dictum fusce ut placerat. ",
                    "Morbi tincidunt ornare massa eget egestas."
                ]
            },
            {
                place: "Hillsbrad Foothills",
                start: "2023.04.30",
                end: "2023.05.04",
                perks: [
                    "Tincidunt arcu non sodales neque sodales ut etiam. ",
                    "Tincidunt lobortis feugiat vivamus at augue eget arcu. Adipiscing diam donec adipiscing tristique risus nec feugiat in. "
                ]
            }
        ]

    },
    {
        id: 234,
        title: "Forest travel",
        img: "/assets/img/3.jpg",
        desc: "Sample text. Click to select the text box. Click again or double click to start editing the text.",
        price: 800,
        locations: [
            {
                place: "Elwynn Forest",
                start: "2023.08.23",
                end: "2023.08.28",
                perks: [
                    "Elementum sagittis vitae et leo duis. ",
                    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
                ]
            },
            {
                place: "Azuremyst Isle",
                start: "2023.09.28",
                end: "2023.10.02",
                perks: [
                    "Egestas purus viverra accumsan in nisl. Pellentesque pulvinar pellentesque habitant morbi. Etiam dignissim diam quis enim lobortis scelerisque fermentum dui.",
                    " Tristique magna sit amet purus gravida quis blandit turpis cursus."
                ]
            },
            {
                place: "Elwynn Forest 2",
                start: "2023.10.04",
                end: "2023.10.10",
                perks: [
                    "Elementum sagittis vitae et leo duis.",
                    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
                ]
            },
        ]

    },
    {
        id: 345,
        title: "Ocean travel",
        img: "/assets/img/2.jpg",
        desc: "Sample text. Click to select the text box. Click again or double click to start editing the text.",
        price: 700,
        locations: [
            {
                place: "Darkshore",
                start: "2023.06.15",
                end: "2023.07.02",
                perks: [
                    "Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Mauris pharetra et ultrices neque ornare. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Sagittis eu volutpat odio facilisis mauris.",
                    "Habitant morbi tristique senectus et netus. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
                ]
            }
        ]

    }
]

//booking section buttons are bind to the data throught [data-booking-id]
//on click, set up the modal from the data array with the associated id
document
.querySelectorAll("[data-booking-id]")
.forEach(item => {
    item.addEventListener("click", (e) => {
        const id = Number(e.target.dataset.bookingId);
        const content = data.find( item => item.id === id)
        if(content !== undefined)
            setupModal(content);
    })
})

//get modal and its closing button...
const modal = document.getElementById("modal");
document.getElementById("btn-close-modal").addEventListener("click", () => {
    modal.close();//browser API
})

//generate content a legfájdalmasabb módon
function setupModal(content) {
    modal.querySelector('#modal-title').textContent = content.title;
    const body = modal.querySelector('#modal-body');
    body.innerHTML = ""; //remove previous content

    for(item of content.locations){
        const outli = document.createElement("div");
        outli.innerHTML = 
        `
        <li class="modal-item">
            <h2 class="modal-place">${item.place}</h2>
            <div class="modal-dates">${item.start} - ${item.end}</div>
            <ul>
            </ul>
            <button class="modal-button">Book now</button>
        </li>
        `
        const ineul = outli.getElementsByTagName("ul")[0];


        for(perk of item.perks){
            const ineli = document.createElement("li");
            ineli.textContent = perk;
            ineul.appendChild(ineli);
        }

        body.appendChild(outli.firstElementChild);
    }

    modal.showModal();//browser API
}

