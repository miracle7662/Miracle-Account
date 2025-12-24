const db = require('../config/db');

exports.getunitmaster = (req, res) => {
    const unitmaster = db.prepare('SELECT * FROM mstunitmaster').all();
    res.json(unitmaster);
};

exports.addunitmaster = (req, res) => {
    const { unit_name, status,created_by_id,created_date,hotelid,client_code} = req.body;
    const stmt = db.prepare('INSERT INTO mstunitmaster (unit_name, status, created_by_id, created_date,hotelid,client_code) VALUES (?, ?,?,?,?,?)');
    const result = stmt.run(unit_name, status,created_by_id,created_date,hotelid,client_code);
    res.json({ id: result.lastInsertRowid, unit_name, status ,created_by_id, created_date,hotelid,client_code});
};

exports.updateunitmaster= (req, res) => {
    const { id } = req.params;
    const { unit_name, status,updated_by_id,updated_date,hotelid,client_code } = req.body;
    const stmt = db.prepare('UPDATE mstunitmaster SET unit_name = ?, status = ?, updated_by_id=?,updated_date=?,hotelid=?,client_code=? WHERE unitid = ?');
    stmt.run(unit_name, status,updated_by_id,updated_date,hotelid,client_code, id);
    res.json({ id, unit_name, status,updated_by_id,updated_date ,hotelid,client_code});
};

exports.deleteunitmaster = (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM mstunitmaster WHERE unitid = ?');
    stmt.run(id);
    res.json({ message: 'Deleted' });
};