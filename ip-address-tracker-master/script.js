import { API_KEY } from "./secret.js";
import { InvalidIPError } from "./errorHandler.js";
import { APIError } from "./errorHandler.js";

const ipInput = document.getElementById("ip-input");
const searchBtn = document.getElementById("search-btn");

const ip = document.getElementById("ip");
const location = document.getElementById("location");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");
const input = document.getElementById("input");
const searchForm = document.getElementById("search-form");

//Map Initialization with Custom Icon
let customIcon = L.icon({
  iconUrl: "./images/icon-location.svg",
  iconSize: [40, 40], // Width and height in pixels
  iconAnchor: [20, 40], //The tip of the pin (half-width, full-height)
});

//Map intialization  setup
const map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// let marker = L.marker([51.5, -0.09]).addTo(map);
let marker = L.marker([51.5, -0.09], { icon: customIcon }).addTo(map);
// .bindPopup("A pretty CSS popup.<br> Easily customizable.")
// .openPopup();

//Fetch api info
async function getIPData(targetIP = "") {
  try {
    const response = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${targetIP}`,
    );
    const data = await response.json();
    console.log(data);

    if (data.code) {
      throw new InvalidIPError("Invalid IP A ddress");
    }

    renderUI(data);
    updateMapPosition(data.location.lat, data.location.lng);
  } catch (error) {
    if (error instanceof InvalidIPError) alert("Invalid IP!");
    else if (error instanceof APIError) alert("API error: " + error.message);
    else alert("Unknown error occurred!");
  } finally {
    input.textContent = "";
  }
}
//Render page info
function renderUI(data) {
  ip.textContent = data.ip;
  location.textContent = `${data.location.city},${data.location.region}`;
  timezone.textContent = `UTC${data.location.timezone}`;
  isp.textContent = data.isp;
}

//Update map
function updateMapPosition(lat, lng) {
  // Center the map on new coordinates
  map.setView([lat, lng], 13);

  // Update the existing marker's position instead of creating a new one
  marker.setLatLng([lat, lng]);
}

// IP Validation
function ipAddressValidation() {
  const ipRegex =
    /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
  const value = ipInput.value.trim();
  if (ipInput.validity.typeMismatch) {
    ipInput.setCustomValidity("Please enter a valid IP Addresss");
  } else if (ipInput.validity.valueMissing) {
    ipInput.setCustomValidity("enter the valid Ip Address");
  } else if (!ipRegex.test(value)) {
    ipInput.setCustomValidity(
      "Please enter a valid IP address (e.g. 192.168.1.1)",
    );
  } else {
    ipInput.setCustomValidity(""); // Clear custom error if valid
  }
  // Display the custom message or clear it
  input.textContent = ipInput.validationMessage;
} //Event listner to validate ip address input
ipInput.addEventListener("input", ipAddressValidation);

//
searchForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop the default form submission
  ipAddressValidation();
  if (!ipInput.checkValidity()) return;

  getIPData(ipInput.value);
  searchForm.reset();
});
