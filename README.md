                            IP ADDRESS TRACKER APP
The IP Address Tracker App is a  web application that allows users to search for any IP address or domain and instantly see detailed information about it. The app visually displays key data such as:

IP Address
Location (City, Region, Country)
Timezone
ISP (Internet Service Provider)

It also integrates an interactive map using Leaflet.js, showing the exact location of the IP address or domain in real-time.The floating API information card overlays the header and map, presenting data in a clean and organized manner. The app is fully responsive, ensuring a smooth user experience across desktop and mobile devices. Additionally, it includes error handling, alerting users if an invalid IP or domain is entered, making it user-friendly and practical.

Features of the App

-Search Functionality – Enter an IP or domain to get instant results.
Responsive Design – Works on desktop and mobile devices.
Floating Data Card – Displays IP information in a stylish card that floats over the header and map.
Clean UI – Modern design with a visually joined header background and map for seamless user experience.
Error Handling – Alerts the user when an invalid IP or domain is entered.

Built With

HTML, CSS, JavaScript
Leaflet.js for interactive maps  
Fetch API for IP/geolocation data  
Responsive design for mobile and desktop 

Setup 

clone the repository
https://github.com/krishnakatwal/ip-address-tracker-project.git

Navigate to the project folder

cd IP-Address-Tracker

Open the project in your browser

use a local server such as Live Server for live reloading.

Set up API key

create a secret.js file with your API key and import it in script.js
export const API_KEY = 'at_u1FMkECPZt61QBq1G4jqj5AQhzVKa';

Use the app

Enter an IP address or domain in the search input, and view the results in the floating API card and interactive map.


live Demo: https://ip-address-tracker-app-krishna.netlify.app/

![alt text](ip-address-tracker-master/images/Screenshot-ip-tracker.png)