const db = require('../../config/postgres/db');

const getFinancialData = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM financial_info');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getFinancialData,
};
