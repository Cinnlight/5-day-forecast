import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';
// TODO: Define a class for the Weather object
class Weather {
    constructor(temperature, description, humidity, windSpeed) {
        this.temperature = temperature;
        this.description = description;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
    }
}
// TODO: Complete the WeatherService class
class WeatherService {
    constructor() {
        this.baseURL = 'https://api.openweathermap.org/data/2.5';
        this.apiKey = process.env.API_KEY || '6f13319c07e1f1a34cc394ce21e8c643';
    }
    // TODO: Create fetchLocationData method
    async fetchLocationData(query) {
        const url = `${this.baseURL}/weather?q=${query}&appid=${this.apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch location data');
        }
        return response.json();
    }
    // TODO: Create destructureLocationData method
    destructureLocationData(locationData) {
        const { coord } = locationData;
        return { lat: coord.lat, lon: coord.lon };
    }
    // TODO: Create buildGeocodeQuery method
    // private buildGeocodeQuery(): string {
    //   return `${this.cityName}&appid=${this.apiKey}`;
    // }
    // TODO: Create buildWeatherQuery method
    buildWeatherQuery(coordinates) {
        return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
    }
    // TODO: Create fetchAndDestructureLocationData method
    async fetchAndDestructureLocationData(query) {
        const locationData = await this.fetchLocationData(query);
        return this.destructureLocationData(locationData);
    }
    // TODO: Create fetchWeatherData method
    async fetchWeatherData(coordinates) {
        const url = this.buildWeatherQuery(coordinates);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return response.json();
    }
    // TODO: Build parseCurrentWeather method
    parseCurrentWeather(response) {
        const { main, weather, wind } = response;
        return new Weather(main.temp, weather[0].description, main.humidity, wind.speed);
    }
    // TODO: Complete buildForecastArray method
    // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    //   return weatherData.map(data => new Weather(
    //     data.main.temp,
    //     data.weather[0].description,
    //     data.main.humidity,
    //     data.wind.speed
    //   ));
    // }
    // TODO: Complete getWeatherForCity method
    async getWeatherForCity(city) {
        try {
            const coordinates = await this.fetchAndDestructureLocationData(city);
            const weatherData = await this.fetchWeatherData(coordinates);
            return this.parseCurrentWeather(weatherData);
        }
        catch (error) {
            console.error('Error in getting weather data:', error);
            throw error;
        }
    }
}
export default new WeatherService();
