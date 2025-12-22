const db = require('../config/db');

exports.getwarehouse = (req, res) => {
    const { companyid } = req.query;
    let query = 'SELECT * FROM mstwarehouse';
    let params = [];

    if (companyid) {
        query += ' WHERE companyid = ?';
        params.push(companyid);
    }

    const warehouse = db.prepare(query).all(...params);
    res.json(warehouse);
};

exports.addwarehouse = (req, res) => {
    const { warehouse_name, location, status, created_by_id, created_date, hotelid, client_code, marketid } = req.body;
    const stmt = db.prepare('INSERT INTO mstwarehouse (warehouse_name, location, total_items, status, created_by_id, created_date, hotelid, client_code, marketid) VALUES (?, ?, 0, ?, ?, ?, ?, ?, ?)');
    const result = stmt.run(warehouse_name, location, status, created_by_id, created_date, hotelid, client_code, marketid);
    res.json({ id: result.lastInsertRowid, warehouse_name, location, status, created_by_id, created_date, hotelid, client_code, marketid });
};

exports.updatewarehouse = (req, res) => {
    const { id } = req.params;
    const { warehouse_name, location, status, updated_by_id, updated_date, hotelid, client_code, marketid } = req.body;
    const stmt = db.prepare('UPDATE mstwarehouse SET warehouse_name = ?, location = ?, status = ?, updated_by_id = ?, updated_date = ?, hotelid = ?, client_code = ?, marketid = ? WHERE warehouseid = ?');
    stmt.run(warehouse_name, location, status, updated_by_id, updated_date, hotelid, client_code, marketid, id);
    res.json({ id, warehouse_name, location, status, updated_by_id, updated_date, hotelid, client_code, marketid });
};

exports.deletewarehouse = (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM mstwarehouse WHERE warehouseid = ?');
    stmt.run(id);
    res.json({ message: 'Deleted' });
};