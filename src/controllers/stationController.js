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
    const stations = await models.Station.findAll({
        order: [
            ['station_id', 'ASC']
        ]
    });

    res.status(200).json({ stations });
}

async function getAllTrains(req, res) {
    const station_id = req.params.station_id;
   
    const existed = await models.Station.findByPk(station_id);
    if (!existed) return res.status(404).json({ message: `station with id: ${station_id} was not found` });

    const stopTrains = await models.Stoppage.findAll({
        where: { station_id },
        order: [
            ['departure_time', 'ASC']
        ],
        raw: true, 
        attributes: ["train_id", "arrival_time", "departure_time"]
        
    });

    res.status(200).json({
        station_id,
        trains: stopTrains
    });
    

}

export default { addStation, getAllStations, getAllTrains}