import { Joi } from "../utils/Joi.js";
import { models, sequelize } from "../configs/mysql.js";

function getTimeKey(start, end) {
    const a = start ? start : "null";
    const b = end ? end   : "null";
    return `${a}::${b}`;
}

function findStartEndTime(stops) {
    let startTime = null
    let endTime = null;

    stops.forEach(stop => {
        if (stop.departure_time == null) 
            endTime = stop.arrival_time;
        
        if (stop.arrival_time == null) 
            startTime = stop.departure_time;
            
    });

    return { startTime, endTime };
}

async function addTrain(req, res) {
    const trainDto = req.body;
    const stopSchema = Joi.object({
        station_id: Joi.number().integer().required(),
        arrival_time: Joi.string().allow(null),
        departure_time: Joi.string().allow(null),
        fare: Joi.number().integer().required()
    });
    
    const trainSchema = Joi.object({
        train_id: Joi.number().integer().required(),
        train_name: Joi.string().required(),
        capacity: Joi.number().integer().required(),
        stops: Joi.array().items(stopSchema).required()
    });
    
    const { error } = trainSchema.validate(trainDto);
    if (error) return res.status(400).json(error.details);

    const transaction =  await sequelize.transaction();
    try {        

        // Create the station record within the transaction
        const train = await models.Train.create(trainDto, { transaction });

        const stops = trainDto.stops;
        for (let i = 0; i < stops.length; i++) {
            stops[i].train_id = train.train_id;
            stops[i].time_key = getTimeKey(stops[i].arrival_time, stops[i].departure_time)
        }

        const createdStops = await models.Stoppage.bulkCreate(stops, { transaction });

        await transaction.commit();

        const trainResponse = trainDto;
        delete trainResponse.stops;

        const { startTime, endTime } = findStartEndTime(stops);

        trainResponse.service_start = startTime;
        trainResponse.service_ends = endTime;
        trainResponse.num_stations = stops.length;
        

        res.status(201).json(trainResponse);
    } catch (error) {
        await transaction.rollback();
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}

export default { addTrain }