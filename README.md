Weather-App Docker (Aplikasi Web Backend + Frontend, API by https://openweathermap.org/)
!! Pastikan Ubuntu memiliki Docker !!

1.) Upgrade & Update Ubuntu
sudo apt update
sudo apt upgrade

2.) Make Folder for the services
mkdir weather-app && cd weather-app

3.) initialization Node.js
sudo apt install npm
npm init -y
npm install express axios dotenv cors

4.) Create file .env for saving API key OpenWeather
!! Use your API key from OpenWeather !!
look at file .env above

5.) Create file server.js for handling backend n frontend
look at file server.js above

6.) Create Frontend
mkdir public
cd public
sudo nano index.html
look at file index.html above

7.) Create Dockerfile
look at file Dockerfile above

8.) Run the Docker
docker build -t weather-app .
docker run -p 3000:3000 --env-file .env weather-app

9.) Access the Apps
http://localhost:3000
