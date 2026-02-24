class GetPosition {
    app
    latitude;
    longitude;
    link;
    data;
    name
    status
    constructor(app) {
        this.app = app
        navigator.geolocation.getCurrentPosition(this.location)
    }
    location = (position) => {

        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
        this.link = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&units=metric&appid=8a490c6651725451fa03123bd0d7b472`

        this.api = new GetDataFromApi()
        this.placeInfo(this.link)


    }

    placeInfo = (link) =>{

        this.api.getData(link).then(data => {
            this.data = data
            this.name = this.data.name
            this.app.main.info.title.innerText = this.name
            if (this.name.length >= 10) {
                this.app.main.info.title.style.fontSize = "150%"
            }
            this.app.main.info.temp.innerText = Math.ceil(this.data.main.temp) + '\u00B0'
            this.status = this.data.weather[0].id
            this.app.main.info.status.innerText = this.data.weather[0].description

            this.app.main.info.minmax.innerText = "Min: " + Math.ceil(this.data.main.temp_min) + "\u00B0 |  Max: " + Math.ceil(this.data.main.temp_max) + "\u00B0 "
            this.changeimage(this.status,this.data.weather[0])
        })

    }


    changeimage = (status, icons) => {
        this.app.main.info.img.src = "https://openweathermap.org/img/wn/" + icons.icon + "@2x.png"
        if (status >= 200 && status <= 299) {
            this.app.main.body.style.backgroundImage = "linear-gradient(164deg, rgba(240,226,22,1) 3%, rgba(72,83,83,1) 42%)"
            if(this.app.dayOrNight === false){
                this.app.main.body.style.backgroundImage = "linear-gradient(166deg, rgba(57,48,83,1) 9%, rgba(76,73,86,1) 93%)"
    
            }
        } else if (status >= 300 && status <= 499) {
            this.app.main.body.style.backgroundImage = "linear-gradient(164deg, rgba(183,212,231,1) 31%, rgba(72,83,83,1) 100%)"
            if(this.app.dayOrNight === false){
                this.app.main.body.style.backgroundImage = "linear-gradient(166deg, rgba(57,48,83,1) 9%, rgba(76,73,86,1) 93%)"
    
            }
        } else if (status >= 500 && status <= 599) {
            this.app.main.body.style.backgroundImage = "linear-gradient(164deg, rgba(113,169,205,1) 31%, rgba(72,83,83,1) 100%)"
            if(this.app.dayOrNight === false){
                this.app.main.body.style.backgroundImage = "linear-gradient(166deg, rgba(57,48,83,1) 9%, rgba(76,73,86,1) 93%)"
    
            }
        } else if (status >= 600 && status <= 699) {
            this.app.main.body.style.backgroundImage = "linear-gradient(164deg, rgba(246,246,246,1) 31%, rgba(177,204,204,1) 100%)"
            if(this.app.dayOrNight === false){
                this.app.main.body.style.backgroundImage = "linear-gradient(166deg, rgba(57,48,83,1) 9%, rgba(76,73,86,1) 93%)"
    
            }

        } else if (status >= 700 && status <= 799) {
            this.app.main.body.style.backgroundImage = "linear-gradient(164deg, rgba(157,167,168,1) 6%, rgba(104,116,116,1) 100%)"
            if(this.app.dayOrNight === false){
                this.app.main.body.style.backgroundImage = "linear-gradient(166deg, rgba(57,48,83,1) 9%, rgba(76,73,86,1) 93%)"
    
            }
        } else if (status === 800) {
            this.app.main.body.style.backgroundImage = "linear-gradient(164deg, rgba(210,208,110,1) 6%, rgba(144,242,246,1) 100%)"
      
            if(this.app.dayOrNight === false){
                this.app.main.body.style.backgroundImage = "linear-gradient(166deg, rgba(57,48,83,1) 9%, rgba(76,73,86,1) 93%)"
    
            }
        }
        else if (status === 801) {
            this.app.main.body.style.backgroundImage = "linear-gradient(164deg, rgba(167,197,222,1) 14%, rgba(69,114,120,1) 100%)"
            if(this.app.dayOrNight === false){
                this.app.main.body.style.backgroundImage = "linear-gradient(166deg, rgba(57,48,83,1) 9%, rgba(76,73,86,1) 93%)"
    
            }
        }
        else if (status >= 802) {
            this.app.main.body.style.backgroundImage = "linear-gradient(164deg, rgba(155,171,184,1) 40%, rgba(69,114,120,1) 100%)"
            if(this.app.dayOrNight === false){
                this.app.main.body.style.backgroundImage = "linear-gradient(166deg, rgba(57,48,83,1) 9%, rgba(76,73,86,1) 93%)"
    
            }
        }
        

    }
}



class Main {
    htmlElement;
    body
    app;
    info;
    search;
    
    main
    constructor(app) {
        this.app = app
        this.body = document.querySelector("body")
        this.htmlElement = document.createElement("main")
        this.htmlElement.classList.add("main")
        this.app.renderer.render(this.htmlElement, this.body)
        this.info = new Info(this)
        this.search = new Search(this)
        this.footer = new Footer(this)
    }
}

class Info {
    section;
    title;
    figure;
    temp;
    status;
    img;
    minmax;

    constructor(main) {
        this.main = main
        this.section = document.createElement("section")
        this.section.classList.add("info")
        if(this.main.app.dayOrNight === false){
            this.section.classList.add("darkmode")
        }
        this.titleBox = document.createElement("div")
        this.titleBox.classList.add("info__titleBox")
        this.title = document.createElement("h1")
        this.title.classList.add("info__h1")
        this.locationIcon = document.createElement("i")
        this.locationIcon.classList.add("fa-solid" ,"fa-location-dot")
        this.locationIcon.onclick = ()=>{
            navigator.geolocation.getCurrentPosition(this.main.app.location.location)
        }
        this.figure = document.createElement("figure")
        this.figure.classList.add("info__figure")
        this.temp = document.createElement("h2")
        this.temp.classList.add("info__temp")
        this.status = document.createElement("p")
        this.status.classList.add("info__status")
        this.img = document.createElement("img")
        this.img.src = "img/icons8-rain-cloud-96.png"
        this.img.classList.add("info__img")
        this.minmax = document.createElement("p")
        this.minmax.classList.add("info__minMax")


        this.main.app.renderer.render(this.section, this.main.htmlElement)
        this.main.app.renderer.render(this.titleBox, this.section)
        this.main.app.renderer.render(this.title,this.titleBox)
        this.main.app.renderer.render(this.locationIcon, this.titleBox)

        this.main.app.renderer.render(this.figure, this.section)
        this.main.app.renderer.render(this.temp, this.figure)
        this.main.app.renderer.render(this.status, this.figure)
        this.main.app.renderer.render(this.img, this.figure)
        this.main.app.renderer.render(this.minmax, this.section)
    }
}

class Search {
    main
    divHtmlElement
    search
    searchIcon
    value
    constructor(main) {
        this.main = main
        this.divHtmlElement = document.createElement("div")
        this.divHtmlElement.classList.add("search")

        this.search = document.createElement("input")
        this.search.setAttribute("type", "text")
        this.search.placeholder = "Search City's"
        this.search.classList.add("search__field")
        this.searchIcon = document.createElement("i")
        this.searchIcon.classList.add("fa-solid")
        this.searchIcon.classList.add("fa-magnifying-glass")
        this.searchIcon.classList.add("search__icon")
        this.searchIcon.onclick = this.changeInfo

        if(this.main.app.dayOrNight === false){
            this.divHtmlElement.style.background = '#393646'
        }

        this.main.app.renderer.render(this.divHtmlElement, this.main.htmlElement)
        this.main.app.renderer.render(this.search, this.divHtmlElement)
        this.main.app.renderer.render(this.searchIcon, this.divHtmlElement)
        this.search.onfocus = ()=>{this.divHtmlElement.style.opacity= "1"}
        this.search.onblur = ()=>{this.divHtmlElement.style.opacity = ""}
        this.search.onkeyup = (event)=>{
            let key = event.key
            if(key == "Enter" || key == "enter"){
                this.value = this.search.value.toLowerCase()
                if(this.value === ''){
                    return;
                }else{
                    this.main.app.location.placeInfo("https://api.openweathermap.org/data/2.5/weather?q="+this.value+"&units=metric&appid=8a490c6651725451fa03123bd0d7b472")
                    this.search.value = ""
                    this.search.blur()
                }
            }
        }
    }

    changeInfo = () =>{
        this.value = this.search.value.toLowerCase()
        if(this.value === ''){
            return;
        }else{
            this.main.app.location.placeInfo("https://api.openweathermap.org/data/2.5/weather?q="+this.value+"&units=metric&appid=8a490c6651725451fa03123bd0d7b472")
            this.search.value = ""
        }
        
        
    }
}

class Footer{
    htmlElement
    contact
    copyRight
    constructor(main){
        this.main = main;
        this.htmlElement = document.createElement("footer")
        this.htmlElement.classList.add('footer')

        this.contact = document.createElement("a")
        this.contact.classList.add('footer__contact')
        this.contact.href = "mailto:herrebrughigor@gmail.com"
        this.contact.innerText= "Contact |"
        this.contactTooltip = document.createElement("span")
        this.contactTooltip.classList.add("footer__contactTooltip")
        this.contactTooltip.innerText = "Contact me to send tips!"

        this.copyRight = document.createElement("p")
        this.copyRight.classList.add('footer__copyright')   
        this.copyRight.innerText = "\u00A9 Igor Herrebrugh "
        if(this.main.app.dayOrNight === false){
            this.htmlElement.style.color = "#FFF4F4"
            this.contact.style.color = "#FFF4F4"
            this.contactTooltip.style.background = "#393646"
        }
        this.main.app.renderer.render(this.htmlElement, this.main.body)
        this.main.app.renderer.render(this.contact,this.htmlElement)
        this.main.app.renderer.render(this.contactTooltip,this.contact)
        this.main.app.renderer.render(this.copyRight,this.htmlElement)
    }
}

class Renderer {
    render(whatToRender, whereToRender) {
        whereToRender.appendChild(whatToRender)
    }
}

class GetDataFromApi {
    data = null;
    async getData(link) {
        await fetch(link).then(response => {
            return response.json();

        }).then(newData => {
            this.data = newData;
        })

        return this.data;


    }

}

class App {
    location
    renderer
    main
    api;
    dayOrNight
    constructor() {
        this.date = new Date()
        this.time = this.date.getHours()
        if(this.time >= 20){
            this.dayOrNight = false
            
        }else{
            this.dayOrNight = true
        }
        console.log(this.dayOrNight)
        this.location = new GetPosition(this)
        this.renderer = new Renderer()
        this.main = new Main(this)

    }





}

const app = new App()


