// Updated stateController.js
// Changes:
// - Added explicit checks for companyid and yearid with defaults for dev (as before).
// - Ensured all queries include yearid in WHERE clauses for consistency (already mostly there).
// - In update and delete, verify with yearid.
// - In add/update, optionally fallback to body if middleware misses (but prefer middleware).
// - Added logging for debugging.

const db = require('../config/db');

exports.getStates = (req, res) => {
    try {
        // TODO: Remove hardcoded values in production; rely on middleware
        const companyid = req.companyid || 1;  // Default for dev/testing
        const yearid = req.yearid || 1;        // Default for dev/testing
        
        if (!companyid || !yearid) {
            return res.status(401).json({ message: 'Missing company or year context (check authentication)' });
        }
        
        // Join with country table and filter both by company ID and year ID
        const query = `
            SELECT 
                S.stateid, 
                S.state_name,
                S.state_code,
                S.state_capital,
                S.countryid,
                C.country_name,
                S.status, 
                S.created_by_id,
                S.created_date,
                S.updated_by_id,
                S.updated_date,
                S.companyid,
                S.yearid
            FROM mststatemaster S 
            INNER JOIN mstcountrymaster C ON C.countryid = S.countryid AND C.companyid = S.companyid AND C.yearid = S.yearid
            WHERE S.companyid = ? AND S.yearid = ?
        `;
        
        const states = db.prepare(query).all(companyid, yearid);
        console.log(`Fetched ${states.length} states for company ${companyid}, year ${yearid}`); // Debug log
        res.json(states);
    } catch (error) {
        console.error('Error fetching states:', error);
        res.status(500).json({ message: 'Failed to fetch states' });
    }
};

exports.addState = (req, res) => {
    try {
        const { state_name, state_code, state_capital, countryid, status, created_by_id, created_date, companyid: bodyCompanyId, yearid: bodyYearId } = req.body;
        
        // Prefer middleware, fallback to body for flexibility
        const companyid = req.companyid || bodyCompanyId || 1;
        const yearid = req.yearid || bodyYearId || 1;
        
        if (!companyid || !yearid) {
            return res.status(401).json({ message: 'Missing company or year context (check authentication)' });
        }
        
        // Verify the country belongs to this company
        const country = db.prepare('SELECT countryid FROM mstcountrymaster WHERE countryid = ? AND companyid = ? AND yearid = ?').get(countryid, companyid, yearid);
        if (!country) {
            return res.status(400).json({ message: 'Invalid country or country does not belong to your company' });
        }
        
        const stmt = db.prepare('INSERT INTO mststatemaster (state_name, state_code, state_capital, countryid, status, created_by_id, created_date, companyid, yearid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
        const result = stmt.run(state_name, state_code, state_capital, countryid, status, created_by_id, created_date, companyid, yearid);
        
        console.log(`Added state ${result.lastInsertRowid} for company ${companyid}, year ${yearid}`); // Debug log
        
        res.json({ 
            id: result.lastInsertRowid, 
            state_name, 
            state_code, 
            state_capital, 
            countryid, 
            status, 
            created_by_id, 
            created_date, 
            companyid, 
            yearid 
        });
    } catch (error) {
        console.error('Error adding state:', error);
        res.status(500).json({ message: 'Failed to add state' });
    }
};

exports.updateState = (req, res) => {
    try {
        const { id } = req.params;
        const { state_name, state_code, state_capital, countryid, status, updated_by_id, updated_date, companyid: bodyCompanyId, yearid: bodyYearId } = req.body;
        
        // Prefer middleware, fallback to body
        const companyid = req.companyid || bodyCompanyId || 1;
        const yearid = req.yearid || bodyYearId || 1;
        
        if (!companyid || !yearid) {
            return res.status(401).json({ message: 'Missing company or year context (check authentication)' });
        }
        
        // First verify the state belongs to this company
        const existing = db.prepare('SELECT stateid FROM mststatemaster WHERE stateid = ? AND companyid = ? AND yearid = ?').get(id, companyid, yearid);
        if (!existing) {
            return res.status(404).json({ message: 'State not found or access denied' });
        }
        
        // Verify the country belongs to this company
        const country = db.prepare('SELECT countryid FROM mstcountrymaster WHERE countryid = ? AND companyid = ? AND yearid = ?').get(countryid, companyid, yearid);
        if (!country) {
            return res.status(400).json({ message: 'Invalid country or country does not belong to your company' });
        }
        
        const stmt = db.prepare('UPDATE mststatemaster SET state_name = ?, state_code = ?, state_capital = ?, countryid = ?, status = ?, updated_by_id = ?, updated_date = ?, companyid = ?, yearid = ? WHERE stateid = ? AND companyid = ? AND yearid = ?');
        const changes = stmt.run(state_name, state_code, state_capital, countryid, status, updated_by_id, updated_date, companyid, yearid, id, companyid, yearid);
        
        if (changes.changes === 0) {
            return res.status(404).json({ message: 'No changes made or state not found' });
        }
        
        console.log(`Updated state ${id} for company ${companyid}, year ${yearid}`); // Debug log
        
        res.json({ 
            id, 
            state_name, 
            state_code, 
            state_capital, 
            countryid, 
            status, 
            updated_by_id, 
            updated_date, 
            companyid, 
            yearid 
        });
    } catch (error) {
        console.error('Error updating state:', error);
        res.status(500).json({ message: 'Failed to update state' });
    }
};

exports.deleteState = (req, res) => {
    try {
        const { id } = req.params;
        
        // Prefer middleware, fallback to body (though delete has no body)
        const companyid = req.companyid || 1;
        const yearid = req.yearid || 1;
        
        if (!companyid || !yearid) {
            return res.status(401).json({ message: 'Missing company or year context (check authentication)' });
        }
        
        // First verify the state belongs to this company
        const existing = db.prepare('SELECT stateid FROM mststatemaster WHERE stateid = ? AND companyid = ? AND yearid = ?').get(id, companyid, yearid);
        if (!existing) {
            return res.status(404).json({ message: 'State not found or access denied' });
        }
        
        const stmt = db.prepare('DELETE FROM mststatemaster WHERE stateid = ? AND companyid = ? AND yearid = ?');
        const changes = stmt.run(id, companyid, yearid);
        
        if (changes.changes === 0) {
            return res.status(404).json({ message: 'No changes made or state not found' });
        }
        
        console.log(`Deleted state ${id} for company ${companyid}, year ${yearid}`); // Debug log
        
        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        console.error('Error deleting state:', error);
        res.status(500).json({ message: 'Failed to delete state' });
    }
};