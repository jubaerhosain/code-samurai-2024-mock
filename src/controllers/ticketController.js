import { Joi } from "../utils/Joi.js";
import { models, Sequelize } from "../configs/mysql.js";

async function findPath(station_from, station_to, time_after) {
    const stops = await models.Stop.findAll({
        raw: true
    });

    console.log(stops);

    const cost = 0, paths = []
    return {cost, paths}
}

async function purchaseTicket(req, res) {
    const dto = req.body;

    const schema = Joi.object({
        wallet_id: Joi.number().integer().required(),
        time_after: Joi.string().required(),
        station_from: Joi.number().integer().positive().required(),
        station_to: Joi.number().integer().positive().required()
    });

    const { error } = schema.validate(dto);
    if (error) return res.status(400).json(error.details);

    const wallet = await models.User.findByPk(dto.wallet_id);
    if (!wallet) {
        return res.status(404).json({ message: `wallet with id: ${dto.wallet_id} was not found` });
    }

    const {cost, path} = await findPath(dto.station_from, dto.station_to, dto.time_after);

    if(false) {
        return res.status(402).json({message: "recharge amount: {shortage_amount} to purchase the thicket"});
    }

    if(true) {
        return res.status(403).json({message: "no ticket available for station: {station_from} to station: {station_to}"})
    }

    res.status(201).json({
        ticket_id: 1,
        wallet_id: dto.wallet_id,
        balance: 99, // remaiinig balance
        stations: []
    });
}

export default { purchaseTicket }
