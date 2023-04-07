
const promo = document.getElementById("promo");
const paths = [];
const targetPercentage = 0.5 //teljes megjelenés ha az elem az ablak 50%-hoz ér (alulról, a teteje) => 0.5


for(item of promo.querySelectorAll("path")){
    const path = {
        element: item,
        pathLength: item.getTotalLength(),
    };

    path.element.style.strokeDasharray = path.pathLength +" "+ path.pathLength
    path.element.style.strokeDashoffset = path.pathLength

    paths.push(path)
}
updatePaths()


function updatePaths(){
    for(path of paths){
        const pageBottom = document.documentElement.scrollHeight
        const windowHeight = document.documentElement.clientHeight
        const pathRect = path.element.getBoundingClientRect()
        
        let scrollPercentage = 1;
        if(pageBottom-windowHeight*targetPercentage > pathRect.y){//nincs az oldal alján, szóval szabad rajzolni

            scrollPercentage = (windowHeight - pathRect.bottom) / (windowHeight*targetPercentage - pathRect.height)
            scrollPercentage = Math.min(1, Math.max(0, scrollPercentage))  
            
        }

        drawLength = path.pathLength * interpolate(0, 0.5, scrollPercentage)//0 = 0%, 0.5= 100% kirajzolva, szóval muszáj belenyomorgatni a % értékeket
        path.element.style.strokeDashoffset = path.pathLength - drawLength
    }
}
function interpolate(start, end, num){

    //a scroll szerinti rajzolás induljon lassabban => linearis viszony átalakítása exponenciálissá
    //[0,1] => [0,1]
    num = Math.pow(num, 3)
    //[0,1] => [start, end]
    return (end - start) * num  + start
}


window.addEventListener("resize", () => {
    updatePaths()
});
window.addEventListener("scroll", ()=> {
    updatePaths()
})

