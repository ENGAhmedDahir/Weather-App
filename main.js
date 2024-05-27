const API_KEY = 'qi170PH4Oy8oAGV6ohArMjvZwG5hjx4t';

const ListCard = document.querySelector('.list-card');
const list = document.querySelector('.list');
const searchCity = document.querySelector('#searchCity');
const cityName = document.querySelector('#city-name');
const weatherText = document.querySelector('#weather-text');
const Degree = document.querySelector('#degree');
const imageTime = document.querySelector('#imageTime');

const getCityName = async (city)=>{
    const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${ API_KEY}&q=${city}`;
    
    const response = await fetch (url );
    const data = await response.json();
    return data;


}

searchCity.addEventListener('keyup', (e)=>{

    if(e.target.value.length===0){
        ListCard.classList.add('d-none')
    }else{
        list.innerHTML = '';
   
    getCityName (e.target.value.trim().toLowerCase())
        .then(data=>{
           
            data.forEach(cites=>{
               
                list.innerHTML +=`<h4 class='target-class'> ${cites.LocalizedName}</h4>`
                ListCard.classList.remove('d-none')
               
            })
        })
    }
    

})
const getCityCode = async (city)=>{
    const request = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${ API_KEY}&q=${city}`;
    
    const response = await fetch (request);
    const data = await response.json();
    return data[0];


}


const updateTheUI = (city)=>{
    getCityCode (city)
    .then(data=>{
        
        cityName.innerHTML =`${data.LocalizedName}, ${data.Country.EnglishName}`
        searchCity.value =''
        return getWeatherInfo (data.Key)
       

    }).then(data=>{
        weatherText.innerHTML =`${data.WeatherText}`
        Degree.innerHTML =`${data.Temperature.Metric.Value}  &deg;C`;
        
        if(data.IsDayTime){
            imageTime.setAttribute('src', "images/night.jpg")
        }else{
            imageTime.setAttribute('src', "images/ni.jpg")
        }
        localStorage.setItem('city', city)
    })
    ListCard.classList.add('d-none')
    

}

list.addEventListener('click', (e)=>{
    updateTheUI(e.target.innerText.toLowerCase())
})

const getWeatherInfo = async (cityCode)=>{
    const request = `http://dataservice.accuweather.com/currentconditions/v1/${cityCode}?apikey=${ API_KEY}`;
    
    const response = await fetch (request);
    const data = await response.json();

    return data[0];
   

}
if(localStorage.getItem('city').length>0){
    updateTheUI(localStorage.getItem('city'))
}

