const db = require('../config/db');

exports.getItemMainGroup = (req, res) => {
    const { companyid } = req.query;
    let query = 'SELECT * FROM mst_Item_Main_Group';
    let params = [];

    if (companyid) {
        query += ' WHERE companyid = ?';
        params.push(companyid);
    }

    const Item_Main_Group = db.prepare(query).all(...params);
    res.json(Item_Main_Group);
};

exports.addItemMainGroup = (req, res) => {
    const { item_group_name, status,created_by_id,created_date ,hotelid,marketid, companyid, yearid} = req.body;
    const stmt = db.prepare('INSERT INTO mst_Item_Main_Group (item_group_name, status, created_by_id, created_date ,hotelid,marketid, companyid, yearid) VALUES (?, ?,?,? ,?,?, ?, ?)');
    const result = stmt.run(item_group_name, status,created_by_id,created_date,hotelid,marketid, companyid, yearid);
    res.json({ id: result.lastInsertRowid, item_group_name, status ,created_by_id, created_date ,hotelid,marketid, companyid, yearid});
};

exports.updateItemMainGroup = (req, res) => {
    const { id } = req.params;
    const { item_group_name, status,updated_by_id,updated_date, companyid, yearid } = req.body;
    const stmt = db.prepare('UPDATE mst_Item_Main_Group SET item_group_name = ?, status = ?, updated_by_id=?,updated_date=?, companyid = ?, yearid = ? WHERE item_maingroupid = ?');
    stmt.run(item_group_name, status,updated_by_id,updated_date, companyid, yearid, id);
    res.json({ id, item_group_name, status,updated_by_id,updated_date, companyid, yearid });
};

exports.deleteItemMainGroup = (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM mst_Item_Main_Group WHERE item_maingroupid = ?');
    stmt.run(id);
    res.json({ message: 'Deleted' });
};