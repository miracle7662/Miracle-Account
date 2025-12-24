const db = require('../config/db');

exports.getCountries = (req, res) => {
    try {
        // Use company ID from middleware (injected by companyFilter)
        const companyid = req.companyid;
        const yearid = req.yearid;
        
        // Corrected SQL syntax from '&' to 'AND' and added yearid parameter
        const query = 'SELECT * FROM mstcountrymaster WHERE companyid = ? AND yearid = ?';
        const countries = db.prepare(query).all(companyid, yearid);
        
        res.json(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
        res.status(500).json({ message: 'Failed to fetch countries' });
    }
};

exports.addCountry = (req, res) => {
    try {
        const { country_name, country_code, country_capital, status, created_by_id, created_date } = req.body;
        
        // Use company ID and year ID from middleware
        const companyid = req.companyid;
        const yearid = req.yearid;
        
        const stmt = db.prepare('INSERT INTO mstcountrymaster (country_name, country_code, country_capital, status, created_by_id, created_date, companyid, yearid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        const result = stmt.run(country_name, country_code, country_capital, status, created_by_id, created_date, companyid, yearid);
        
        res.json({ 
            id: result.lastInsertRowid, 
            country_name, 
            country_code, 
            country_capital, 
            status, 
            created_by_id, 
            created_date, 
            companyid, 
            yearid 
        });
    } catch (error) {
        console.error('Error adding country:', error);
        res.status(500).json({ message: 'Failed to add country' });
    }
};

exports.updateCountry = (req, res) => {
    try {
        const { id } = req.params;
        const { country_name, country_code, country_capital, status, updated_by_id, updated_date } = req.body;
        
        // Use company ID and year ID from middleware
        const companyid = req.companyid;
        const yearid = req.yearid;
        
        // First verify the country belongs to this company
        const existing = db.prepare('SELECT countryid FROM mstcountrymaster WHERE countryid = ? AND companyid = ?').get(id, companyid);
        if (!existing) {
            return res.status(404).json({ message: 'Country not found or access denied' });
        }
        
        const stmt = db.prepare('UPDATE mstcountrymaster SET country_name = ?, country_code = ?, country_capital = ?, status = ?, updated_by_id = ?, updated_date = ?, companyid = ?, yearid = ? WHERE countryid = ? AND companyid = ?');
        stmt.run(country_name, country_code, country_capital, status, updated_by_id, updated_date, companyid, yearid, id, companyid);
        
        res.json({ 
            id, 
            country_name, 
            country_code, 
            country_capital, 
            status, 
            updated_by_id, 
            updated_date, 
            companyid, 
            yearid 
        });
    } catch (error) {
        console.error('Error updating country:', error);
        res.status(500).json({ message: 'Failed to update country' });
    }
};

exports.deleteCountry = (req, res) => {
    try {
        const { id } = req.params;
        const companyid = req.companyid;
        
        // First verify the country belongs to this company
        const existing = db.prepare('SELECT countryid FROM mstcountrymaster WHERE countryid = ? AND companyid = ?').get(id, companyid);
        if (!existing) {
            return res.status(404).json({ message: 'Country not found or access denied' });
        }
        
        const stmt = db.prepare('DELETE FROM mstcountrymaster WHERE countryid = ? AND companyid = ?');
        stmt.run(id, companyid);
        
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Error deleting country:', error);
        res.status(500).json({ message: 'Failed to delete country' });
    }
};
