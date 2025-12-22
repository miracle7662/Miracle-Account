const db = require("../config/db");

// Helper function to generate next SoudaNo like "S-001", "S-002"
function getNextSoudaNo(companyid, yearid) {
    // Get last SoudaNo ordered by SoudaID desc for specific company/year
    const row = db.prepare('SELECT SoudaNo FROM soudaheader WHERE companyid = ? AND yearid = ? ORDER BY SoudaID DESC LIMIT 1').get(companyid, yearid);
    console.log("getNextSoudaNo - last row from soudaheader:", row);
    if (!row || !row.SoudaNo) {
        console.warn('getNextSoudaNo - No existing SoudaNo found, returning default "S-001"');
        return 'S-001';
    }
    const lastNo = row.SoudaNo;
    const match = lastNo.match(/S-(\d+)/);
    let nextNum = 1;
    if (match && match[1]) {
        nextNum = parseInt(match[1], 10) + 1;
    }
    const nextSoudaNo = `S-${String(nextNum).padStart(3, '0')}`;
    if (!nextSoudaNo) {
        console.error('getNextSoudaNo - Generated SoudaNo is invalid, falling back to "S-001"');
        return 'S-001';
    }
    console.log('getNextSoudaNo - Generated SoudaNo:', nextSoudaNo);
    return nextSoudaNo;
}

// -------------------------------
// Create Souda (Header + Items)
// -------------------------------
exports.createSouda = (req, res) => {
    try {
        const body = req.body;

        if (!body.items || body.items.length === 0) {
            res.status(400).json({ message: "No items provided" });
            return;
        }

        const companyid = req.companyid;
        const yearid = req.yearid;

        // Validation of FarmerNo in mandiledger
        const farmerExists = db.prepare('SELECT 1 FROM mandiledger WHERE FarmerNo = ? AND companyid = ? AND yearid = ?').get(body.FarmerNo, companyid, yearid);
        if (!farmerExists) {
            res.status(400).json({ message: `FarmerNo ${body.FarmerNo} does not exist in mandiledger.` });
            return;
        }

        // Validation of each item FarmerNo and CustomerNo
        for (const item of body.items) {
            if (item.FarmerNo) {
                const farmerItemExists = db.prepare('SELECT 1 FROM mandiledger WHERE FarmerNo = ? AND companyid = ? AND yearid = ?').get(item.FarmerNo, companyid, yearid);
                if (!farmerItemExists) {
                    res.status(400).json({ message: `Item FarmerNo ${item.FarmerNo} does not exist in mandiledger.` });
                    return;
                }
            }

            if (item.CustomerNo) {
                const customerExists = db.prepare('SELECT 1 FROM mandiledger WHERE CustomerNo = ? AND companyid = ? AND yearid = ?').get(item.CustomerNo, companyid, yearid);
                if (!customerExists) {
                    res.status(400).json({ message: `Item CustomerNo ${item.CustomerNo} does not exist in mandiledger.` });
                    return;
                }
            }
        }

        const transaction = db.transaction(() => {
            const totals = {
                items: body.items.reduce((sum, item) => sum + item.Quantity, 0),
                farmer: 0,
                customer: 0,
                katala: 0
            };

            body.items.forEach(i => {
                totals.farmer += i.FarmerAmount * i.Quantity;
                totals.customer += i.CustomerAmount * i.Quantity;
                totals.katala += (i.Katala || 0) ;
            });

            // Generate the next SoudaNo
            let nextSoudaNo = getNextSoudaNo(companyid, yearid);
            if (!nextSoudaNo) {
                console.error('createSouda - nextSoudaNo is null or undefined, using fallback "S-001"');
                nextSoudaNo = 'S-001';
            }

            // Insert Header
            const stmtHeader = db.prepare(`
                INSERT INTO soudaheader
                (SoudaNo, FarmerNo, SoudaDate, TotalItems, TotalFarmerAmt, TotalCustomerAmt, TotalKatala, Created_by_id, companyid, yearid)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            const headerResult = stmtHeader.run(
                nextSoudaNo,
                body.FarmerNo,
                body.SoudaDate,
                totals.items,
                totals.farmer,
                totals.customer,
                totals.katala,
                body.created_by_id || req.userid || 1,
                companyid,
                yearid
            );

            const SoudaID = headerResult.lastInsertRowid;

            // Insert Items
            const stmtItem = db.prepare(`
                INSERT INTO soudaitemsdetails
                (SoudaID, FarmerNo, CustomerNo, ItemName, Quantity, FarmerAmount, CustomerAmount, Katala, CustomerName, companyid, yearid)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            body.items.forEach(item => {
                stmtItem.run(
                    SoudaID,
                    item.FarmerNo,
                    item.CustomerNo,
                    item.ItemName,
                    item.Quantity,
                    item.FarmerAmount,
                    item.CustomerAmount,
                    item.Katala || 0,
                    item.CustomerName || "",
                    companyid,
                    yearid
                );
            });

            return { SoudaID, SoudaNo: nextSoudaNo };
        });

        const result = transaction();
        res.json({ message: "Souda created successfully", SoudaID: result.SoudaID, SoudaNo: result.SoudaNo });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal error", error: error.message });
    }
};

// -------------------------------
// GET ALL Souda
// -------------------------------
exports.getAllSouda = (req, res) => {
    try {
        console.log('getAllSouda called');
        const companyid = req.companyid;
        const yearid = req.yearid;

        const rows = db.prepare(`
             SELECT
                sh.SoudaID,
                sh.SoudaNo,
                sh.FarmerNo,
                sh.SoudaDate AS SoudaDate,
                sh.TotalItems,
                sh.TotalFarmerAmt,
                sh.TotalCustomerAmt,
                sh.TotalKatala,
                sh.companyid,
                sh.yearid,
                ml.Name AS FarmerName,
                GROUP_CONCAT(
                    CONCAT(mlc.Name, ' (', sid.Quantity, ') (F-', sid.FarmerAmount,') (C-', sid.CustomerAmount,')')
                ) AS customerName
            FROM soudaheader sh
            INNER JOIN soudaitemsdetails sid
                ON sid.SoudaID = sh.SoudaID
            LEFT JOIN mandiledger ml
                ON sh.FarmerNo = ml.FarmerNo AND ml.companyid = sh.companyid AND ml.yearid = sh.yearid
            LEFT JOIN mandiledger mlc
                ON mlc.CustomerNo = sid.CustomerNo AND mlc.companyid = sh.companyid AND mlc.yearid = sh.yearid
            WHERE sh.companyid = ? AND sh.yearid = ?
            GROUP BY
                sh.SoudaID,
                sh.SoudaNo,
                sh.FarmerNo,
                sh.SoudaDate,
                sh.TotalItems,
                sh.TotalFarmerAmt,
                sh.TotalCustomerAmt,
                sh.TotalKatala,
                sh.companyid,
                sh.yearid,
                ml.Name
        `).all(companyid, yearid);

        console.log('getAllSouda rows:', rows);

        // Calculate totals
        const totals = rows.reduce((acc, souda) => {
            acc.totalItems += souda.TotalItems || 0;
            acc.totalFarmerAmt += souda.TotalFarmerAmt || 0;
            acc.totalCustomerAmt += souda.TotalCustomerAmt || 0;
            acc.totalKatala += souda.TotalKatala || 0;
            return acc;
        }, { totalItems: 0, totalFarmerAmt: 0, totalCustomerAmt: 0, totalKatala: 0 });

        res.json({ data: rows, totals });

    } catch (error) {
        console.error('getAllSouda error:', error);
        res.status(500).json({ message: error.message });
    }
};

// -------------------------------
// GET Souda Items by FarmerNo
// -------------------------------
exports.getSoudaItemsByFarmer = (req, res) => {
    try {
        const farmerNo = Number(req.params.farmerNo);
        const companyid = req.companyid;
        const yearid = req.yearid;

        const items = db.prepare(`
            SELECT sid.*, sh.SoudaDate AS SoudaDate, sh.SoudaNo, ml.Name as CustomerName
            FROM soudaitemsdetails sid
            JOIN soudaheader sh ON sid.SoudaID = sh.SoudaID AND sh.companyid = ? AND sh.yearid = ?
            LEFT JOIN mandiledger ml ON sid.CustomerNo = ml.LedgerId AND ml.companyid = ? AND ml.yearid = ?
            WHERE sid.FarmerNo = ?
            -- TODO: Uncomment the line below after adding the 'IsBilledToFarmer' column to the 'soudaitemsdetails' table.
            -- AND sid.IsBilledToFarmer = 0
            ORDER BY sid.ItemID ASC
        `).all(companyid, yearid, companyid, yearid, farmerNo);

        res.json(items);

    } catch (error) {
        console.error("Error in getSoudaItemsByFarmer:", error);
        res.status(500).json({ message: error.message });
    }
};

// -------------------------------
// GET Souda by ID
// -------------------------------
exports.getSoudaById = (req, res) => {
    try {
        const id = Number(req.params.id);
        const companyid = req.companyid;
        const yearid = req.yearid;

        const header = db.prepare(`
            SELECT SoudaID, SoudaNo, FarmerNo, SoudaDate AS SoudaDate, TotalItems, TotalFarmerAmt, TotalCustomerAmt, TotalKatala, Created_by_id, companyid, yearid, Updated_date 
            FROM soudaheader 
            WHERE SoudaID = ? AND companyid = ? AND yearid = ?
        `).get(id, companyid, yearid);

        if (!header) {
            res.status(404).json({ message: "Not found" });
            return;
        }

        const items = db.prepare(`
            SELECT * FROM soudaitemsdetails WHERE SoudaID = ? AND companyid = ? AND yearid = ?
        `).all(id, companyid, yearid);

        res.json({ ...header, items });

    } catch (error) {
        console.error("Error in getSoudaById:", error);
        res.status(500).json({ message: error.message });
    }
};

// -------------------------------
// UPDATE Souda
// -------------------------------
exports.updateSouda = (req, res) => {
    try {
        const id = Number(req.params.id);
        const body = req.body;
        const companyid = req.companyid;
        const yearid = req.yearid;

        if (!body.items || body.items.length === 0) {
            res.status(400).json({ message: "No items provided" });
            return;
        }

        // Validation of FarmerNo in mandiledger
        const farmerExists = db.prepare('SELECT 1 FROM mandiledger WHERE FarmerNo = ? AND companyid = ? AND yearid = ?').get(body.FarmerNo, companyid, yearid);
        if (!farmerExists) {
            res.status(400).json({ message: `FarmerNo ${body.FarmerNo} does not exist in mandiledger.` });
            return;
        }

        // Validation of each item FarmerNo and CustomerNo
        for (const item of body.items) {
            if (item.FarmerNo) {
                const farmerItemExists = db.prepare('SELECT 1 FROM mandiledger WHERE FarmerNo = ? AND companyid = ? AND yearid = ?').get(item.FarmerNo, companyid, yearid);
                if (!farmerItemExists) {
                    res.status(400).json({ message: `Item FarmerNo ${item.FarmerNo} does not exist in mandiledger.` });
                    return;
                }
            }

            if (item.CustomerNo) {
                const customerExists = db.prepare('SELECT 1 FROM mandiledger WHERE CustomerNo = ? AND companyid = ? AND yearid = ?').get(item.CustomerNo, companyid, yearid);
                if (!customerExists) {
                    res.status(400).json({ message: `Item CustomerNo ${item.CustomerNo} does not exist in mandiledger.` });
                    return;
                }
            }
        }

        const transaction = db.transaction(() => {
            // Delete old items
            db.prepare(`DELETE FROM soudaitemsdetails WHERE SoudaID = ? AND companyid = ? AND yearid = ?`).run(id, companyid, yearid);

            const totals = {
                items: body.items.reduce((sum, item) => sum + item.Quantity, 0),
                farmer: 0,
                customer: 0,
                katala: 0
            };

            body.items.forEach(i => {
                totals.farmer += i.FarmerAmount * i.Quantity;
                totals.customer += i.CustomerAmount * i.Quantity;
                totals.katala += (i.Katala || 0) ;
            });

            // Update header
            db.prepare(`
                UPDATE soudaheader SET
                    SoudaNo = ?, FarmerNo = ?, SoudaDate = ?, companyid = ?, yearid = ?,
                    TotalItems = ?, TotalFarmerAmt = ?, TotalCustomerAmt = ?, TotalKatala = ?,
                    Updated_date = CURRENT_TIMESTAMP
                WHERE SoudaID = ? AND companyid = ? AND yearid = ?
            `).run(
                body.SoudaNo,
                body.FarmerNo,
                body.SoudaDate,
                companyid,
                yearid,
                totals.items,
                totals.farmer,
                totals.customer,
                totals.katala,
                id,
                companyid,
                yearid
            );

            // Insert new items
            const stmt = db.prepare(`
                INSERT INTO soudaitemsdetails
                (SoudaID, FarmerNo, CustomerNo, ItemName, Quantity, FarmerAmount, CustomerAmount, Katala, CustomerName, companyid, yearid)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            body.items.forEach(item => {
                stmt.run(
                    id,
                    item.FarmerNo,
                    item.CustomerNo,
                    item.ItemName,
                    item.Quantity,
                    item.FarmerAmount,
                    item.CustomerAmount,
                    item.Katala || 0,
                    item.CustomerName || "",
                    companyid,
                    yearid
                );
            });
        });

        transaction();

        res.json({ message: "Souda updated successfully" });

    } catch (error) {
        console.error("Error in updateSouda:", error);
        res.status(500).json({ message: error.message });
    }
};

// -------------------------------
// DELETE Souda
// -------------------------------
exports.deleteSouda = (req, res) => {
    try {
        const id = Number(req.params.id);
        const companyid = req.companyid;
        const yearid = req.yearid;

        // Verify ownership
        const headerExists = db.prepare('SELECT SoudaID FROM soudaheader WHERE SoudaID = ? AND companyid = ? AND yearid = ?').get(id, companyid, yearid);
        if (!headerExists) {
            return res.status(404).json({ message: 'Souda not found or access denied' });
        }

        db.transaction(() => {
            db.prepare(`DELETE FROM soudaitemsdetails WHERE SoudaID = ? AND companyid = ? AND yearid = ?`).run(id, companyid, yearid);
            db.prepare(`DELETE FROM soudaheader WHERE SoudaID = ? AND companyid = ? AND yearid = ?`).run(id, companyid, yearid);
        })();

        res.json({ message: "Souda deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// New handler to get next SoudaNo for frontend use
exports.getNextSoudaNoHandler = (req, res) => {
    try {
        const companyid = req.companyid;
        const yearid = req.yearid;
        const nextSoudaNo = getNextSoudaNo(companyid, yearid);
        res.json({ nextSoudaNo });
    } catch (error) {
        console.error("Error in getNextSoudaNoHandler:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// -------------------------------
// GET Souda Items by CustomerNo
// -------------------------------
exports.getSoudaItemsByCustomer = (req, res) => {
    try {
        const customerNo = Number(req.params.customerNo);
        const date = req.params.date;
        const companyid = req.companyid;
        const yearid = req.yearid;

        const items = db.prepare(`
            SELECT sid.*, sh.SoudaDate, ml.Name AS FarmerName
            FROM soudaitemsdetails sid
            left JOIN soudaheader sh ON sid.SoudaID = sh.SoudaID AND sh.companyid = ? AND sh.yearid = ?
            LEFT JOIN mandiledger ml ON sid.FarmerNo = ml.FarmerNo AND ml.companyid = ? AND ml.yearid = ?
            WHERE sid.CustomerNo = ?
            AND (sid.IsBilled = 0 OR sid.IsBilled IS NULL)
            AND DATE(sh.SoudaDate) =?
            ORDER BY sid.ItemID ASC
        `).all(companyid, yearid, companyid, yearid, customerNo, date);

        res.json(items);

    } catch (error) {
        console.error("Error in getSoudaItemsByCustomer:", error);
        res.status(500).json({ message: error.message });
    }
};

// -------------------------------
// GET FIRST SOUDA DATE FOR CUSTOMER
// -------------------------------
exports.getFirstSoudaDateForCustomer = (req, res) => {
    try {
        const customerNo = Number(req.params.customerNo);
        const companyid = req.companyid;
        const yearid = req.yearid;

        const row = db.prepare(`
            SELECT MIN(sh.SoudaDate) AS firstSoudaDate
            FROM soudaitemsdetails sid
            JOIN soudaheader sh ON sid.SoudaID = sh.SoudaID AND sh.companyid = ? AND sh.yearid = ?
            WHERE sid.CustomerNo = ?
        `).get(companyid, yearid, customerNo);

        if (row && row.firstSoudaDate) {
            res.json({ firstSoudaDate: row.firstSoudaDate });
        } else {
            res.json({ firstSoudaDate: null });
        }

    } catch (error) {
        console.error("Error in getFirstSoudaDateForCustomer:", error);
        res.status(500).json({ message: error.message });
    }
};

// -------------------------------
// GENERATE BILL DATA
// -------------------------------
exports.generateBillData = (req, res) => {
    try {
        const companyid = req.companyid;
        const yearid = req.yearid;
        const customerNo = req.query.customerNo ? Number(req.query.customerNo) : null;
        const date = req.query.date || null;

        const items = db.prepare(`
            SELECT
                sid.*,
                cbh.custBillDate,
                sh.soudadate AS soudadate,
                ml.Name AS FarmerName
            FROM soudaitemsdetails sid
            LEFT JOIN soudaheader sh
                ON sh.SoudaID = sid.SoudaID AND sh.companyid = ? AND sh.yearid = ?
            LEFT JOIN mandiledger ml
                ON sid.FarmerNo = ml.FarmerNo AND ml.companyid = ? AND ml.yearid = ?
            LEFT JOIN customerbillheader cbh
                ON cbh.CustomerID = sid.FarmerNo
                AND DATE(cbh.custBillDate) = DATE(sh.soudadate)
            WHERE
                sid.CustomerNo = ?
                AND DATE(sh.soudadate) = ?
                AND sid.companyid = ? AND sid.yearid = ?;
        `).all(companyid, yearid, companyid, yearid, customerNo, date, companyid, yearid);

        res.json(items);

    } catch (error) {
        console.error("Error in generateBillData:", error);
        res.status(500).json({ message: error.message });
    }

    
};