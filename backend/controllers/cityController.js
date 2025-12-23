

const db = require('../config/db');

exports.getCities = (req, res) => {
    try {
        // TODO: Remove hardcoded values in production; rely on middleware
        const companyid = req.companyid || 1;  // Default for dev/testing
        const yearid = req.yearid || 1;        // Default for dev/testing
        
        if (!companyid || !yearid) {
            return res.status(401).json({ message: 'Missing company or year context (check authentication)' });
        }
        
        // Join with state and country tables to get complete information
        const query = `
            SELECT 
                C.cityid,
                C.city_name,
                C.city_Code,
                C.stateId,
                S.state_name,
                S.countryid,
                CO.country_name,
                C.iscoastal,
                C.status,
                C.created_by_id,
                C.created_date,
                C.updated_by_id,
                C.updated_date,
                C.companyid,
                C.yearid
            FROM mstcitymaster C
            INNER JOIN mststatemaster S ON S.stateid = C.stateId AND S.companyid = C.companyid AND S.yearid = C.yearid
            INNER JOIN mstcountrymaster CO ON CO.countryid = S.countryid AND CO.companyid = C.companyid AND CO.yearid = C.yearid
            WHERE C.companyid = ? AND C.yearid = ?
        `;
        
        const cities = db.prepare(query).all(companyid, yearid);
        console.log(`Fetched ${cities.length} cities for company ${companyid}, year ${yearid}`); // Debug log
        res.json(cities);
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).json({ message: 'Failed to fetch cities' });
    }
};

exports.addCity = (req, res) => {
    try {
        const { city_name, city_Code, stateId, iscoastal, status, created_by_id, created_date, companyid: bodyCompanyId, yearid: bodyYearId } = req.body;
        
        // Prefer middleware, fallback to body for flexibility
        const companyid = req.companyid || bodyCompanyId || 1;
        const yearid = req.yearid || bodyYearId || 1;
        
        if (!companyid || !yearid) {
            return res.status(401).json({ message: 'Missing company or year context (check authentication)' });
        }
        
        // Verify the state belongs to this company
        const state = db.prepare('SELECT stateid FROM mststatemaster WHERE stateid = ? AND companyid = ? AND yearid = ?').get(stateId, companyid, yearid);
        if (!state) {
            return res.status(400).json({ message: 'Invalid state or state does not belong to your company' });
        }
        
        const stmt = db.prepare('INSERT INTO mstcitymaster (city_name, city_Code, stateId, iscoastal, status, created_by_id, created_date, companyid, yearid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
        const result = stmt.run(city_name, city_Code, stateId, iscoastal, status, created_by_id, created_date, companyid, yearid);
        
        console.log(`Added city ${result.lastInsertRowid} for company ${companyid}, year ${yearid}`); // Debug log
        
        res.json({ 
            id: result.lastInsertRowid, 
            city_name, 
            city_Code, 
            stateId, 
            iscoastal, 
            status, 
            created_by_id, 
            created_date, 
            companyid, 
            yearid 
        });
    } catch (error) {
        console.error('Error adding city:', error);
        res.status(500).json({ message: 'Failed to add city' });
    }
};

exports.updateCity = (req, res) => {
    try {
        const { id } = req.params;
        const { city_name, city_Code, stateId, iscoastal, status, updated_by_id, updated_date, companyid: bodyCompanyId, yearid: bodyYearId } = req.body;
        
        // Prefer middleware, fallback to body
        const companyid = req.companyid || bodyCompanyId || 1;
        const yearid = req.yearid || bodyYearId || 1;
        
        if (!companyid || !yearid) {
            return res.status(401).json({ message: 'Missing company or year context (check authentication)' });
        }
        
        // First verify the city belongs to this company
        const existing = db.prepare('SELECT cityid FROM mstcitymaster WHERE cityid = ? AND companyid = ? AND yearid = ?').get(id, companyid, yearid);
        if (!existing) {
            return res.status(404).json({ message: 'City not found or access denied' });
        }
        
        // Verify the state belongs to this company
        const state = db.prepare('SELECT stateid FROM mststatemaster WHERE stateid = ? AND companyid = ? AND yearid = ?').get(stateId, companyid, yearid);
        if (!state) {
            return res.status(400).json({ message: 'Invalid state or state does not belong to your company' });
        }
        
        const stmt = db.prepare('UPDATE mstcitymaster SET city_name = ?, city_Code = ?, stateId = ?, iscoastal = ?, status = ?, updated_by_id = ?, updated_date = ?, companyid = ?, yearid = ? WHERE cityid = ? AND companyid = ? AND yearid = ?');
        const changes = stmt.run(city_name, city_Code, stateId, iscoastal, status, updated_by_id, updated_date, companyid, yearid, id, companyid, yearid);
        
        if (changes.changes === 0) {
            return res.status(404).json({ message: 'No changes made or city not found' });
        }
        
        console.log(`Updated city ${id} for company ${companyid}, year ${yearid}`); // Debug log
        
        res.json({ 
            id, 
            city_name, 
            city_Code, 
            stateId, 
            iscoastal, 
            status, 
            updated_by_id, 
            updated_date, 
            companyid, 
            yearid 
        });
    } catch (error) {
        console.error('Error updating city:', error);
        res.status(500).json({ message: 'Failed to update city' });
    }
};

exports.deleteCity = (req, res) => {
    try {
        const { id } = req.params;
        
        // Prefer middleware, fallback (though delete has no body)
        const companyid = req.companyid || 1;
        const yearid = req.yearid || 1;
        
        if (!companyid || !yearid) {
            return res.status(401).json({ message: 'Missing company or year context (check authentication)' });
        }
        
        // First verify the city belongs to this company
        const existing = db.prepare('SELECT cityid FROM mstcitymaster WHERE cityid = ? AND companyid = ? AND yearid = ?').get(id, companyid, yearid);
        if (!existing) {
            return res.status(404).json({ message: 'City not found or access denied' });
        }
        
        const stmt = db.prepare('DELETE FROM mstcitymaster WHERE cityid = ? AND companyid = ? AND yearid = ?');
        const changes = stmt.run(id, companyid, yearid);
        
        if (changes.changes === 0) {
            return res.status(404).json({ message: 'No changes made or city not found' });
        }
        
        console.log(`Deleted city ${id} for company ${companyid}, year ${yearid}`); // Debug log
        
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Error deleting city:', error);
        res.status(500).json({ message: 'Failed to delete city' });
    }
};

// Get cities by state (filtered by company)
exports.getCitiesByState = (req, res) => {
    try {
        const { stateId } = req.params;
        
        // Prefer middleware, fallback
        const companyid = req.companyid || 1;
        const yearid = req.yearid || 1;
        
        if (!companyid || !yearid) {
            return res.status(401).json({ message: 'Missing company or year context (check authentication)' });
        }
        
        // Verify the state belongs to this company
        const state = db.prepare('SELECT stateid FROM mststatemaster WHERE stateid = ? AND companyid = ? AND yearid = ?').get(stateId, companyid, yearid);
        if (!state) {
            return res.status(400).json({ message: 'Invalid state or state does not belong to your company' });
        }
        
        const cities = db.prepare('SELECT * FROM mstcitymaster WHERE stateId = ? AND companyid = ? AND yearid = ?').all(stateId, companyid, yearid);
        console.log(`Fetched ${cities.length} cities for state ${stateId}, company ${companyid}, year ${yearid}`); // Debug log
        res.json(cities);
    } catch (error) {
        console.error('Error fetching cities by state:', error);
        res.status(500).json({ message: 'Failed to fetch cities' });
    }
};