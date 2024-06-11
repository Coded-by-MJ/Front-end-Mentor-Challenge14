const api = `https://api.ipgeolocation.io/ipgeo?apiKey=eb2b38119acf4f01938124a819bc0779&ip=`;


const form = document.querySelector('form');
const ipAddressTxt = document.getElementById('ip-address');
const locationTxt = document.getElementById('location');
const timeZoneTxt = document.getElementById('timezone');
const ispTxt = document.getElementById('isp');
const mapWrapper = document.getElementById("map");



let map;


const getIpinfo = async (url) => {
     const res =  await fetch(url);
     const data =  await res.json();
     
      showIpinfo(data);
  };

 const createMap = (lat, lng) => {

    const latitude = parseFloat(lat);
    const longitude = parseFloat(lng);

    if(map){
        map.remove();
    }
    
     map = L.map(mapWrapper, {
        zoomControl: false,
        center: [latitude, longitude], 
        zoom: 13
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    const myIcon = L.icon({iconUrl: "images/icon-location.svg", iconSize: [30, 40]});

    L.marker([latitude, longitude], {icon: myIcon}).addTo(map);
    

 };

 const convertToUTC = (offset) => {
     const formattedHours = offset.toString().padStart(2, '0') + ":00";    
     return `UTC ${formattedHours}`;
 }






  const showIpinfo = (data) => {
     const {isp, ip, city, state_prov, zipcode, latitude, longitude} = data;
     const timezone = convertToUTC(data.time_zone.offset);
     createMap(latitude, longitude);
     
     ipAddressTxt.textContent = ip;
     locationTxt.textContent = `${city}, ${state_prov} ${zipcode}`;
     timeZoneTxt.textContent = timezone;
     ispTxt.textContent = isp;

  }



const getUserInputIP = (e) => {
    e.preventDefault();
    const userInputVal = form[0].value;
    
    if(userInputVal.length === 0) return;


     const newUrl =  api + userInputVal;
     getIpinfo(newUrl);

};




form.addEventListener("submit", getUserInputIP);



  getIpinfo(api);