const db = require('../config/db');

exports.getHotelMasters = (req, res) => {
    const { role_level, hotelid } = req.query;
   
    let query = `
        SELECT 
            H.hotelid, H.hotel_name, H.marketid, H.short_name, H.phone, H.email, 
            H.fssai_no, H.trn_gstno, H.panno, H.website, H.address, H.stateid, H.cityid,
            H.hoteltypeid, H.Masteruserid, H.status, H.created_by_id, H.created_date, 
            H.updated_by_id, H.updated_date, M.market_name, C.city_name 
        FROM msthotelmasters H 
        LEFT JOIN mstmarkets M ON M.marketid = H.marketid 
        LEFT JOIN mstcitymaster C ON C.cityid = H.cityid
    `;
    let params = [];

    // If user is hotel_admin, only show their hotel
    // if (role_level === 'hotel_admin' && hotel_id) {
    //     query += ' WHERE H.hotelid = ?';
    //     params.push(hotel_id);
    // }

    if (role_level === 'hotel_admin' && hotelid) {
        query += ' WHERE H.hotelid = ?';
        params.push(hotelid);
    }

    // If user is superadmin, show all hotels (no additional WHERE clause)
    
    const msthotelmasters = db.prepare(query).all(...params);
    res.json(msthotelmasters);
};

exports.getHotelMastersById = (req, res) => {
    const { id } = req.params;
    const msthotelmasters = db.prepare(`
        SELECT
            H.hotelid, H.hotel_name, H.marketid, H.short_name, H.phone, H.email,
            H.fssai_no, H.trn_gstno, H.panno, H.website, H.address, H.stateid, H.cityid,
            H.hoteltypeid, H.Masteruserid, H.status, H.created_by_id, H.created_date,
            H.updated_by_id, H.updated_date, M.market_name, C.city_name, S.state_name
        FROM msthotelmasters H
        // LEFT JOIN mstmarkets M ON M.marketid = H.marketid
        LEFT JOIN mstcitymaster C ON C.cityid = H.cityid
        LEFT JOIN mststatemaster S ON S.stateid = H.stateid
        WHERE H.hotelid = ?`).get(id);
    
    if (msthotelmasters) {
        res.json(msthotelmasters);
    } else {
        res.status(404).json({ message: 'Hotel not found' });
    }
};

exports.addHotelMasters = (req, res) => {
   const {hotel_name,  marketid,  short_name, phone, email, fssai_no, trn_gstno,panno,website,address,stateid, cityid, hoteltypeid, status,created_by_id,created_date, Masteruserid} = req.body;
    const stmt = db.prepare('INSERT INTO msthotelmasters ( hotel_name,  marketid,  short_name, phone, email, fssai_no, trn_gstno, panno,website, address, stateid, cityid, hoteltypeid, status,created_by_id, created_date,  Masteruserid ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? ,?)');
    const result = stmt.run(hotel_name, marketid, short_name, phone, email, fssai_no, trn_gstno,panno,website,address,stateid, cityid, hoteltypeid,  status,created_by_id,    created_date,  Masteruserid);
    res.json({ id: result.lastInsertRowid, hotel_name,marketid,  short_name, phone, email, fssai_no, trn_gstno,panno,website,address,stateid, cityid, hoteltypeid, status, created_by_id, created_date,  Masteruserid});
};

exports.updateHotelMasters= (req, res) => {
    const { id } = req.params;
    const {hotel_name,  marketid,  short_name, phone, email, fssai_no, trn_gstno,panno,website,address,stateid, cityid, hoteltypeid, Masteruserid,status,updated_by_id,updated_date } = req.body;
    const stmt = db.prepare('UPDATE msthotelmasters SET hotel_name = ?,   marketid = ?,  short_name = ?, phone = ?,  email = ?, fssai_no = ?, trn_gstno = ?,panno= ?,website= ?,address= ?,stateid= ?, cityid = ?, hoteltypeid= ?,Masteruserid= ?, status = ?, updated_by_id = ?, updated_date = ? WHERE hotelid = ?');
    stmt.run(hotel_name,  marketid,  short_name, phone, email, fssai_no, trn_gstno, panno,website, address, stateid, cityid, hoteltypeid, Masteruserid,status, updated_by_id,updated_date, id);
    res.json({ id, hotel_name,  marketid,  short_name, phone,   email, fssai_no, trn_gstno, panno,website, address, stateid, cityid, hoteltypeid, Masteruserid,status, updated_by_id,updated_date });
};

exports.deleteHotelMasters = (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare('DELETE FROM msthotelmasters WHERE hotelid = ?');
    stmt.run(id);
    res.json({ message: 'Deleted' });
};