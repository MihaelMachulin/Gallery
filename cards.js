

loadJSON()
let photoURLs = []
async function loadJSON() {

    let url = 'https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=c47768039c97a22d4f13d932ef4cf41d&gallery_id=72157719972297558&format=json&nojsoncallback=1'
    let response = await fetch(url)
    let data = await response.json()
    photos = data.photos.photo
    for (let pht of photos) {

        let phtUrl = 'https://farm' + pht.farm + '.staticflickr.com/' + pht.server + '/' + pht.id + '_' + pht.secret + '_c.jpg'
        photoURLs.push(phtUrl)
    }
    // console.log(photoURLs)
    return photoURLs
}

let num = 0;

(async function placeDiv() {
    photoURLs = await loadJSON()
    placeDiv2 (6, 0)
})().then(() => slidesPlugin(0))

function placeDiv2 (times, num) {
    for (let i=0; i < times; i++) {
        document.querySelector('.container').insertAdjacentHTML('beforeend',
            `<div class="slide"
                style="background-image: url(${photoURLs[num]});">
                <h3>555</h3>
             </div>`)
    num++
    }
}

num=6
function slidesPlugin(activeSlide=0){
    let container = document.getElementById('container')
    let slides = container.childNodes
    slides[activeSlide].classList.add('active')

    function clearActiveClasses(){
        slides.forEach((slide) => {
            slide.classList.remove('active')
        })}

    addEvents ()
    function addEvents (){
        for (let i = 0; i < slides.length; i++ ) {
            slides[i].addEventListener('click', midSlideEvent)
        }                }
            function midSlideEvent() {
                clearActiveClasses()
                this.classList.add('active')
            }


    addEventLast ()
    function addEventLast (){
        container.lastChild.addEventListener('click', lastSlideEvent)
    }
        function lastSlideEvent(){
            container.appendChild(this.cloneNode(true))
            container.removeChild(container.firstChild)
            this.removeEventListener('click', lastSlideEvent)

            let newLast = container.querySelector('div:last-child')
                newLast.classList.remove('active')
                //newLast.classList.add('loaded')
                newLast.style.backgroundImage = `url(${photoURLs[num]})`
                // newLast.style.flex = '1'
                if (num == photoURLs.length) num = 0; num++

            addEventLast (this); addEvents (this)
            addEventFirst (container.firstChild)
        }


    addEventFirst ()
    function addEventFirst (){
        container.firstChild.addEventListener('click', firstSlideEvent)
    }
        function firstSlideEvent(){
            container.insertBefore(this.cloneNode(true), this)
            container.removeChild(container.lastChild)
            this.removeEventListener('click', firstSlideEvent)

            let newFirst = container.querySelector('div:first-child')
                newFirst.classList.remove('active')
                newFirst.style.backgroundImage = `url(${photoURLs[num]})`
                    if (num == 0) num = photoURLs.length; num--

            addEventFirst (this); addEvents (this)
            addEventLast  (container.lastChild)
        }


}










