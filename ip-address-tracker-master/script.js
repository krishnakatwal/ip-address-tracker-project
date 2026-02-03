import { API_KEY } from "./secret.js";

const ipInput = document.getElementById("ip-input");
const searchBtn = document.getElementById("search-btn");

const ip = document.getElementById("ip");
const location = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

//map intialization  setup
const map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([51.5, -0.09])
  .addTo(map)
  .bindPopup("A pretty CSS popup.<br> Easily customizable.")
  .openPopup();

// searchBtn.addEventListener("click", () => {
//   const ip = ipInput.value.trim();
//   if (!ip) {
//     alert("please enter an valid ip address");
//     return;
//   }
//   fetch;
// });

//fetch api info
async function getIPData(targetIP = "") {
  try {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${targetIP}`,
    );
    const data = await response.json();
    console.log(data);

    if (data.code) {
      alert("Invalid Ip ");
      return;
    }

    renderUI(data);
  } catch (error) {
    alert("Error fetching api data");
    console.error(error);
  }
}
//render page info
function renderUI(data) {
  ip.textContent = data.ip;
  location.textContent = `${data.location.city},${data.location.region}`;
  timezone.textContent = `${data.location.timezone}`;
  isp.textContent = data.isp;
}

//event listner
searchBtn.addEventListener("click", () => {
  const ip = ipInput.value.trim();
  getIPData(ip);
  console.log(getIPData(ip));
});
//fetch IP on the page load
getIPData();
