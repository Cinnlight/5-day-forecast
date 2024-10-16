import fs from 'fs/promises';
import path from 'path';
// TODO: Define a City class with name and id properties
class City {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
// TODO: Complete the HistoryService class
class HistoryService {
    constructor() {
        this.filePath = path.join(process.cwd(), 'db', 'searchHistory.json');
    }
    // TODO: Define a read method that reads from the searchHistory.json file
    async read() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                return []; // If file doesn't exist, return an empty array
            }
            else {
                throw error;
            }
        }
    }
    // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
    async write(cities) {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2), 'utf8');
        }
        catch (error) {
            console.error('Error writing to searchHistory.json:', error);
            throw error;
        }
    }
    // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
    async getCities() {
        const citiesData = await this.read();
        return citiesData.map((city) => new City(city.id, city.name));
    }
    // TODO Define an addCity method that adds a city to the searchHistory.json file
    async addCity(cityName) {
        const cities = await this.getCities();
        const id = Date.now().toString(); // Generate a unique ID using the current timestamp
        const newCity = new City(id, cityName);
        cities.push(newCity);
        await this.write(cities);
    }
    // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
    async removeCity(id) {
        const cities = await this.getCities();
        const updatedCities = cities.filter((city) => city.id !== id);
        await this.write(updatedCities);
    }
}
export default new HistoryService();
