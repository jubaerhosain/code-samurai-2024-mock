import { models } from "../configs/mysql.js";



async function getWalletBalance(req, res) {
    try {
        const walletId = req.params.wallet_id;

        // Check if the wallet ID exists
        const user = await models.User.findOne({ where: { user_id: walletId } });

        if (!user) {
            return res.status(404).json({ error: `wallet with id: ${walletId} was not found` });
        }

        // Construct the response object
        const response = {
            wallet_id: user.user_id,
            balance: user.balance,
            wallet_user: {
                user_id: user.user_id,
                user_name: user.user_name
            }
        };

        // Send the response
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error getting wallet balance:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


async function addWalletBalance(req, res) {
    try {

        const walletId = req.params.wallet_id;
        const { recharge } = req.body;

        // Find the user by wallet ID
        const user = await models.User.findOne({ where: { user_id: walletId } });

        if (!user) {
            return res.status(404).json({ error: `wallet with id: ${walletId} was not found` });
        }

        
        // Check if recharge value is within range
        if (recharge < 100 || recharge > 10000) {
            return res.status(400).json({ error: `invalid amount: ${recharge}` });
        }


        // Update wallet balance
        const newBalance = user.balance + recharge;
        await user.update({ balance: newBalance });

        // Construct the response object
        const response = {
            wallet_id: user.user_id,
            balance: user.balance,
            wallet_user: {
                user_id: user.user_id,
                user_name: user.user_name
            }
        };

        // Send the response
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error adding wallet balance:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


export default { getWalletBalance, addWalletBalance }
