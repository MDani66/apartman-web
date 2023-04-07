
const perspective = .2;
const targets = document.getElementById("hero").querySelectorAll("[data-layer]")
for(item of targets){
    item.style.zIndex = -item.dataset.layer;
}
updateLayers();


function updateLayers(){
    for(item of targets){
        const pos = window.pageYOffset - window.pageYOffset*(1 + item.dataset.layer * (perspective * 1))

        item.style.transform = `translateY(${pos}px) scale(${1 + item.dataset.layer* (perspective * 2)})`
        }
}


window.addEventListener("scroll", updateLayers)