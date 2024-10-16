import { Router } from 'express';
const router = Router();
import historyService from '../../service/historyService.js';
import weatherService from '../../service/weatherService.js';
// POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    try {
        const { city } = req.body;
        if (!city) {
            return res.status(400).json({ message: 'City is required' });
        }
        // GET weather data from city name
        const weatherData = await weatherService.getWeatherForCity(city);
        if (!weatherData) {
            return res.status(404).json({ message: 'Weather Data not Found.' });
        }
        // Save city to search history
        await historyService.addCity(city);
        return res.status(200).json(weatherData);
    }
    catch (error) {
        console.error('Error in getting weather data:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
// GET search history
router.get('/history', async (_req, res) => {
    try {
        const searchHistory = await historyService.getCities();
        res.status(200).json(searchHistory);
    }
    catch (error) {
        console.error('Error in getting search history:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// BONUS: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await historyService.removeCity(id);
        res.status(200).json({ message: 'City deleted from search history' });
    }
    catch (error) {
        console.error('Error in deleting city:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
export default router;
