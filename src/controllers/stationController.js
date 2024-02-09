import { Joi } from "../utils/Joi.js";
import { models } from "../configs/mysql.js";

async function addStation(req, res) {
    const stationDto = req.body;
    const stationSchema = 
        Joi.object({
            station_id: Joi.number().integer().required(),
            station_name: Joi.string().required(),
            longitude: Joi.number().required(),
            latitude: Joi.number().required()
        }).required();

    const { error } = stationSchema.validate(stationDto);
    if (error) return res.status(400).json(error.details);

    if (stationDto.station_id) {
        const existed = await models.Station.findByPk(stationDto.station_id);
        if (existed) return res.status(409).json({ message: `station with id: ${stationDto.station_id} already exists` });
    }

    const station = await models.Station.create(stationDto);

    res.status(201).json(station);
}

async function getAllStations(req, res) {
}

async function getAllTrains(req, res) {
}

export default { addStation, getAllStations, getAllTrains}