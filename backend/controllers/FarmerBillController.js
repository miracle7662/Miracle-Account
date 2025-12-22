// controllers/FarmerBillController.js
const db = require("../config/db");

// =============================
// CREATE FARMER BILL (HEADER AND DETAILS)
// =============================
exports.createFarmerBill = (req, res) => {
    try {
        const data = req.body;
        const companyid = req.companyid;
        const yearid = req.yearid;

        // Validate required fields
        if (!data.FarmerID || !data.farBillDate) {
            return res.status(400).json({ error: "FarmerID and farBillDate are required" });
        }

        // Fetch previous date and balance (for reference, but use data from frontend)
        const lastBill = db.prepare(`
            SELECT farBillDate, FinalBillAmount
            FROM FarmerBill
            WHERE FarmerID = ? AND companyid = ? AND yearid = ?
            ORDER BY farBillID DESC
            LIMIT 1
        `).get(data.FarmerID, companyid, yearid);

        const previousDate = lastBill ? lastBill.farBillDate : '';
        const previousBalance = data.PreviousBalance || 0;

        // Generate BillNo if not provided
        let billNo = data.farBillNumber;

        const stmt = db.prepare(`
            INSERT INTO FarmerBill (
                farBillNumber, farfromDate, fartoDate, farBillDate,
                FarmerID, FarmerName, TotalItems, TotalAmount, PreviousBalance,
                PreviousAdvance, PreviousBalanceDate, commission, Hamali, Vatav,
                KatalaAmount, TransportCharges, Discount, TotalExpense,
                FinalBillAmount, StatusCode, Created_by_id, companyid, yearid
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const result = stmt.run(
            billNo, data.farfromDate, data.fartoDate, data.farBillDate,
            data.FarmerID, data.FarmerName, data.TotalItems, data.TotalAmount,
            previousBalance, data.PreviousAdvance, previousDate,
            data.commission, data.Hamali, data.Vatav, data.KatalaAmount,
            data.TransportCharges, data.Discount, data.TotalExpense,
            data.FinalBillAmount, 1, data.Created_by_id || 1, companyid, yearid
        );

        const farBillID = result.lastInsertRowid;

        // Insert details if items are provided
        if (data.items && data.items.length > 0) {
            const detailStmt = db.prepare(`
                INSERT INTO FarmerBillDetails (
                    farBillID, SoudaID, SoudaNo, SoudaDate, CustomerID, CustomerName,
                    ItemName, Quantity, FarmerAmount, CustomerAmount, Katala,
                    Total, StatusCode, Created_by_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            for (const item of data.items) {
                // Fetch SoudaNo and SoudaDate from soudaheader
                let soudaNo = null;
                let soudaDate = null;
                if (item.SoudaID) {
                    const soudaRow = db.prepare("SELECT SoudaNo, SoudaDate FROM soudaheader WHERE SoudaID = ? AND companyid = ? AND yearid = ?").get(item.SoudaID, companyid, yearid);
                    if (soudaRow) {
                        soudaNo = soudaRow.SoudaNo;
                        soudaDate = soudaRow.SoudaDate;
                    }
                }

                detailStmt.run(
                    farBillID, item.SoudaID, soudaNo, soudaDate, item.CustomerID, item.CustomerName,
                    item.ItemName, item.Quantity, item.FarmerAmount, item.CustomerAmount, item.Katala || 0,
                    item.Total, 1, data.Created_by_id || 1
                );
            }

            // Update IsBilled for the selected ItemIDs
            if (data.items && data.items.length > 0) {
                const itemIDs = data.items.map(item => item.ItemID).filter(id => id);
                if (itemIDs.length > 0) {
                    const placeholders = itemIDs.map(() => '?').join(',');
                    db.prepare(`UPDATE soudaitemsdetails SET IsBilled = 1 WHERE ItemID IN (${placeholders}) AND companyid = ? AND yearid = ?`).run(itemIDs, companyid, yearid);
                }
            }
        }

        res.json({
            message: "Farmer Bill created successfully",
            farBillID: farBillID,
            BillNo: billNo,
            previousDate: previousDate,
            previousBalance: previousBalance
        });
    } catch (error) {
        console.error('Error creating Farmer Bill:', error.message, error.stack);
        res.status(400).json({ error: error.message });
    }
};

// =============================
// CREATE FARMER BILL DETAILS
// =============================
exports.createFarmerBillDetail = (req, res) => {
    try {
        const data = req.body;
        const companyid = req.companyid;
        const yearid = req.yearid;

        // Verify bill belongs to company
        const bill = db.prepare("SELECT farBillID FROM FarmerBill WHERE farBillID = ? AND companyid = ? AND yearid = ?").get(data.farBillID, companyid, yearid);
        if (!bill) {
            return res.status(404).json({ message: 'Farmer Bill not found or access denied' });
        }

        // Fetch SoudaNo and SoudaDate from soudaheader
        let soudaNo = null;
        let soudaDate = null;
        if (data.SoudaID) {
            const soudaRow = db.prepare("SELECT SoudaNo, SoudaDate FROM soudaheader WHERE SoudaID = ? AND companyid = ? AND yearid = ?").get(data.SoudaID, companyid, yearid);
            if (soudaRow) {
                soudaNo = soudaRow.SoudaNo;
                soudaDate = soudaRow.SoudaDate;
            }
        }

        const stmt = db.prepare(`
            INSERT INTO FarmerBillDetails (
                farBillID, SoudaID, SoudaNo, SoudaDate, CustomerID, CustomerName,
                ItemName, Quantity, FarmerAmount, CustomerAmount, Katala,
                Total, StatusCode, Created_by_id
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        const result = stmt.run(
            data.farBillID, data.SoudaID, soudaNo, soudaDate, data.CustomerID, data.CustomerName,
            data.ItemName, data.Quantity, data.FarmerAmount, data.CustomerAmount, data.Katala || 0,
            data.Total, 1, data.Created_by_id || 1
        );

        res.json({
            message: "Farmer Bill Detail added",
            DetailID: result.lastInsertRowid
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// =============================
// GET ALL FARMER BILLS
// =============================
exports.getAllFarmerBills = (req, res) => {
    try {
        const companyid = req.companyid;
        const yearid = req.yearid;
        
        const query = "SELECT * FROM FarmerBill WHERE companyid = ? AND yearid = ? ORDER BY farBillID DESC";
        const rows = db.prepare(query).all(companyid, yearid);
        res.json(rows);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// =============================
// GET SINGLE FARMER BILL + DETAILS
// =============================
exports.getFarmerBillById = (req, res) => {
    try {
        const id = req.params.id;
        const companyid = req.companyid;
        const yearid = req.yearid;

        const bill = db.prepare("SELECT * FROM FarmerBill WHERE farBillID = ? AND companyid = ? AND yearid = ?").get(id, companyid, yearid);
        if (!bill) return res.status(404).json({ message: "Bill not found or access denied" });

        const details = db.prepare("SELECT * FROM FarmerBillDetails WHERE farBillID = ?").all(id);

        bill.details = details;
        res.json(bill);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// =============================
// UPDATE FARMER BILL
// =============================
exports.updateFarmerBill = (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const companyid = req.companyid;
        const yearid = req.yearid;

        // Verify bill belongs to company
        const existing = db.prepare('SELECT farBillID FROM FarmerBill WHERE farBillID = ? AND companyid = ? AND yearid = ?').get(id, companyid, yearid);
        if (!existing) {
            return res.status(404).json({ message: 'Farmer Bill not found or access denied' });
        }

        const stmt = db.prepare(`
            UPDATE FarmerBill
            SET FarmerName=?, TotalItems=?, TotalAmount=?, PreviousBalance=?,
                PreviousAdvance=?, commission=?, Hamali=?, Vatav=?, KatalaAmount=?,
                TransportCharges=?, Discount=?, TotalExpense=?, FinalBillAmount=?, farBillDate=?, farfromDate=?, fartoDate=?,
                Updated_date=CURRENT_TIMESTAMP, Updated_id=?, companyid=?, yearid=?
            WHERE farBillID=? AND companyid=? AND yearid=?
        `);

        const params = [
            data.FarmerName, data.TotalItems, data.TotalAmount, 
            data.PreviousBalance, data.PreviousAdvance,
            data.commission, data.Hamali, data.Vatav, data.KatalaAmount,
            data.TransportCharges, data.Discount, data.TotalExpense,
            data.FinalBillAmount, data.farBillDate, data.farfromDate, data.fartoDate,
            data.Updated_id || 1, companyid, yearid,
            id, companyid, yearid
        ];

        stmt.run(...params);

        // Delete existing details and insert new ones
        db.prepare("DELETE FROM FarmerBillDetails WHERE farBillID=?").run(id);

        if (data.items && data.items.length > 0) {
            const detailStmt = db.prepare(`
                INSERT INTO FarmerBillDetails (
                    farBillID, SoudaID, SoudaNo, SoudaDate, CustomerID, CustomerName,
                    ItemName, Quantity, FarmerAmount, CustomerAmount, Katala,
                    Total, StatusCode, Created_by_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            for (const item of data.items) {
                // Fetch SoudaNo and SoudaDate from soudaheader
                let soudaNo = null;
                let soudaDate = null;
                if (item.SoudaID) {
                    const soudaRow = db.prepare("SELECT SoudaNo, SoudaDate FROM soudaheader WHERE SoudaID = ? AND companyid = ? AND yearid = ?").get(item.SoudaID, companyid, yearid);
                    if (soudaRow) {
                        soudaNo = soudaRow.SoudaNo;
                        soudaDate = soudaRow.SoudaDate;
                    }
                }

                detailStmt.run(
                    id, item.SoudaID, soudaNo, soudaDate, item.CustomerID, item.CustomerName,
                    item.ItemName, item.Quantity, item.FarmerAmount, item.CustomerAmount, item.Katala || 0,
                    item.Total, 1, data.Updated_id || 1
                );
            }

            // Update IsBilled for the new ItemIDs
            if (data.items && data.items.length > 0) {
                const itemIDs = data.items.map(item => item.ItemID).filter(id => id);
                if (itemIDs.length > 0) {
                    const placeholders = itemIDs.map(() => '?').join(',');
                    db.prepare(`UPDATE soudaitemsdetails SET IsBilled = 1 WHERE ItemID IN (${placeholders}) AND companyid = ? AND yearid = ?`).run(itemIDs, companyid, yearid);
                }
            }
        }

        res.json({ message: "Farmer Bill updated" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// =============================
// DELETE FARMER BILL
// =============================
exports.deleteFarmerBill = (req, res) => {
    try {
        const id = req.params.id;
        const companyid = req.companyid;
        const yearid = req.yearid;

        // Verify bill belongs to company
        const existing = db.prepare('SELECT farBillID FROM FarmerBill WHERE farBillID = ? AND companyid = ? AND yearid = ?').get(id, companyid, yearid);
        if (!existing) {
            return res.status(404).json({ message: 'Farmer Bill not found or access denied' });
        }

        // First, delete related details to avoid foreign key constraint errors
        db.prepare("DELETE FROM FarmerBillDetails WHERE farBillID=?").run(id);

        // Then, delete the main bill
        db.prepare("DELETE FROM FarmerBill WHERE farBillID=? AND companyid=? AND yearid=?").run(id, companyid, yearid);

        res.json({ message: "Farmer Bill deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// =============================
// DELETE FARMER BILL DETAIL
// =============================
exports.deleteFarmerBillDetail = (req, res) => {
    try {
        const id = req.params.id;
        const companyid = req.companyid;
        const yearid = req.yearid;

        // Verify detail belongs to bill in company
        const detail = db.prepare(`
            SELECT DetailID FROM FarmerBillDetails fbd 
            INNER JOIN FarmerBill fb ON fb.farBillID = fbd.farBillID 
            WHERE fbd.DetailID = ? AND fb.companyid = ? AND fb.yearid = ?
        `).get(id, companyid, yearid);
        if (!detail) {
            return res.status(404).json({ message: 'Farmer Bill Detail not found or access denied' });
        }

        db.prepare("DELETE FROM FarmerBillDetails WHERE DetailID=?").run(id);

        res.json({ message: "Farmer Bill Detail deleted" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// =============================
// GET LAST BILL FOR FARMER
// =============================
exports.getLastBillForFarmer = (req, res) => {
    try {
        const farmerID = req.params.farmerID;
        const companyid = req.companyid;
        const yearid = req.yearid;

        // ========= 1) CALCULATE FINAL OPENING BALANCE ==========
        const openingQuery = `
            SELECT
                m.LedgerId,
                m.CustomerNo,
                m.Name,
                (
                    m.OpeningBalance

                    -- CashBook Receipts
                    + IFNULL((
                        SELECT SUM(c.Amount)
                        FROM CashBook c
                        WHERE (c.CashBankID = m.LedgerId OR c.OppBankID = m.LedgerId)
                          AND c.TransactionType = 'Receipt'
                          AND c.CompanyId = ?
                          AND c.YearId = ?
                    ), 0)

                    -- CashBook Payments
                    - IFNULL((
                        SELECT SUM(c.Amount)
                        FROM CashBook c
                        WHERE (c.CashBankID = m.LedgerId OR c.OppBankID = m.LedgerId)
                          AND c.TransactionType = 'Payment'
                          AND c.CompanyId = ?
                          AND c.YearId = ?
                    ), 0)

                    -- Farmer Bills
                    + IFNULL((
                        SELECT SUM(ch.FinalBillAmount)
                        FROM FarmerBill ch
                        WHERE ch.FarmerID = m.FarmerNo
                          AND ch.CompanyId = ?
                          AND ch.YearId = ?
                    ), 0)

                ) AS FinalOpeningBalance

            FROM mandiledger m
            WHERE m.FarmerNo = ?
              AND m.CompanyId = ?
              AND m.YearId = ?
        `;

        const openingResult = db.prepare(openingQuery).get(
            companyid, yearid,
            companyid, yearid,
            companyid, yearid,
            farmerID,
            companyid, yearid
        );

        // ========= 2) FETCH LAST BILL DATE AND CALCULATE NEW FROM DATE ===========
        const lastBill = db.prepare(`
            SELECT fartoDate, farBillDate
            FROM FarmerBill
            WHERE FarmerID = ?
              AND CompanyId = ?
              AND YearId = ?
            ORDER BY farBillID DESC
            LIMIT 1
        `).get(farmerID, companyid, yearid);

        let previousDate = "";
        let newFromDate = "";
        if (lastBill) {
            previousDate = lastBill.fartoDate; // Use fartoDate as previousDate for consistency
            // Calculate newFromDate = previousDate + 1 day
            const prevToDate = new Date(lastBill.fartoDate);
            prevToDate.setDate(prevToDate.getDate() + 1);
            newFromDate = prevToDate.toISOString().split('T')[0];
        } else {
            // No previous bill, use first souda date
            const firstSouda = db.prepare(`
                SELECT SoudaDate
                FROM soudaheader
                WHERE FarmerNo = ? AND companyid = ? AND yearid = ?
                ORDER BY SoudaDate ASC
                LIMIT 1
            `).get(farmerID, companyid, yearid);
            newFromDate = firstSouda ? new Date(firstSouda.SoudaDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
        }

        const previousBalance = openingResult ? openingResult.FinalOpeningBalance : 0;

        res.json({
            previousDate,
            previousBalance,
            newFromDate
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// =============================
// GET NEXT BILL NUMBER
// =============================
exports.getNextBillNo = (req, res) => {
    try {
        const companyid = req.companyid;
        const yearid = req.yearid;

        const row = db.prepare(`
            SELECT
                MAX(CAST(SUBSTR(farBillNumber, 3) AS INTEGER)) AS maxBillNo
            FROM FarmerBill
            WHERE companyid = ? AND yearid = ?
        `).get(companyid, yearid);

        const nextNo = (row?.maxBillNo || 0) + 1;
        const nextBillNo = `FB${nextNo.toString().padStart(4, '0')}`;

        res.json({ nextBillNo });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// =============================
// GET FARMER BILL DATE LOGIC
// =============================
exports.getFarmerBillDate = (req, res) => {
    try {
        const farmerID = Number(req.params.farmerID);
        const companyid = req.companyid;
        const yearid = req.yearid;

        // Fetch previous bill
        const lastBill = db.prepare(`
            SELECT farBillNumber, farfromDate, fartoDate
            FROM FarmerBill
            WHERE FarmerID = ? AND companyid = ? AND yearid = ?
            ORDER BY farBillID DESC
            LIMIT 1
        `).get(farmerID, companyid, yearid);

        let newFromDate;
        let previousToDate = null;
        let previousBillNo = null;
        let previousExists = false;

        if (lastBill) {
            previousExists = true;
            previousToDate = lastBill.fartoDate;
            previousBillNo = lastBill.farBillNumber;
            // Calculate newFromDate = previous toDate + 1 day
            const prevToDate = new Date(lastBill.fartoDate);
            prevToDate.setDate(prevToDate.getDate() + 1);
            newFromDate = prevToDate.toISOString().split('T')[0];
        } else {
            // No previous bill, use first souda date
            const firstSouda = db.prepare(`
                SELECT SoudaDate
                FROM soudaheader
                WHERE FarmerNo = ? AND companyid = ? AND yearid = ?
                ORDER BY SoudaDate ASC
                LIMIT 1
            `).get(farmerID, companyid, yearid);
            newFromDate = firstSouda ? new Date(firstSouda.SoudaDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
        }

        res.json({
            status: "ok",
            newFromDate: newFromDate,
            previousToDate: previousToDate,
            previousBillNo: previousBillNo,
            previousExists: previousExists
        });

    } catch (error) {
        console.error("Error in getFarmerBillDate:", error);
        res.status(500).json({ message: error.message });
    }
};

// =============================
// GENERATE FARMER BILL DATA
// =============================
exports.generateFarmerBillData = (req, res) => {
    try {
        const farmerID = Number(req.params.farmerID);
        const toDate = req.query.toDate || req.params.date;
        const fromDate = req.query.fromDate;
        const companyid = req.companyid;
        const yearid = req.yearid;

        let usedFromDate;
        let usedToDate = toDate;
        let previousDate = null;
        let autoCalculated = false;

        if (fromDate && toDate) {
            // Use provided dates
            usedFromDate = fromDate;
        } else {
            // Auto-calculate fromDate
            autoCalculated = true;
            const lastBill = db.prepare(`
                SELECT fartoDate, farBillNumber, farBillDate
                FROM FarmerBill
                WHERE FarmerID = ? AND companyid = ? AND yearid = ?
                ORDER BY farBillID DESC
                LIMIT 1
            `).get(farmerID, companyid, yearid);

            if (lastBill) {
                previousDate = lastBill.fartoDate;
                // Calculate new fromDate = previous toDate + 1 day
                const prevToDate = new Date(lastBill.fartoDate);
                prevToDate.setDate(prevToDate.getDate() + 1);
                usedFromDate = prevToDate.toISOString().split('T')[0];
            } else {
                // No previous bill, use first souda date
                const firstSouda = db.prepare(`
                    SELECT SoudaDate
                    FROM soudaheader
                    WHERE FarmerNo = ? AND companyid = ? AND yearid = ?
                    ORDER BY SoudaDate ASC
                    LIMIT 1
                `).get(farmerID, companyid, yearid);
                usedFromDate = firstSouda ? new Date(firstSouda.SoudaDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
            }
        }

        // Check if bill already generated in the date range
        const existingBill = db.prepare(`
            SELECT farBillNumber, farBillDate
            FROM FarmerBill
            WHERE FarmerID = ? AND companyid = ? AND yearid = ?
            AND (
                (farfromDate <= ? AND fartoDate >= ?) OR
                (farfromDate >= ? AND farfromDate <= ?) OR
                (fartoDate >= ? AND fartoDate <= ?)
            )
        `).get(farmerID, companyid, yearid, usedFromDate, usedToDate, usedFromDate, usedToDate, usedFromDate, usedToDate);

        if (existingBill) {
            return res.json({
                message: `Bill already exists for this farmer in this date range: ${existingBill.farBillNumber} - ${existingBill.farBillDate}`
            });
        }

        // Fetch souda records
        const soudaRecords = db.prepare(`
            SELECT
                sid.*,
                sh.SoudaDate,
                sh.SoudaNo,
                ml.Name AS CustomerName
            FROM soudaitemsdetails sid
            LEFT JOIN soudaheader sh
                ON sh.SoudaID = sid.SoudaID
            LEFT JOIN mandiledger ml
                ON sid.CustomerNo = ml.CustomerNo
            WHERE
                sid.FarmerNo = ?
                AND sh.companyid = ? AND sh.yearid = ?
                AND DATE(sh.SoudaDate) BETWEEN ? AND ?
                AND (sid.IsBilled = 0 OR sid.IsBilled IS NULL)
        `).all(farmerID, companyid, yearid, usedFromDate, usedToDate);

        // Map to expected format
        const items = soudaRecords.map(record => ({
            SoudaID: record.SoudaID,
            SoudaNo: record.SoudaNo,
            SoudaDate: record.SoudaDate,
            ItemName: record.ItemName,
            Quantity: record.Quantity,
            CustomerAmount: record.CustomerAmount,
            FarmerAmount: record.FarmerAmount,
            Katala: record.Katala || 0,
            CustomerName: record.CustomerName,
            CustomerNo: record.CustomerNo
        }));

        res.json(items);

    } catch (error) {
        console.error("Error in generateFarmerBillData:", error);
        res.status(500).json({ message: error.message });
    }
};