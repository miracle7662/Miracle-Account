const db = require("../config/db");

// -------------------------------------------------------
// GET ALL PRODUCTS
// -------------------------------------------------------
exports.getProducts = (req, res) => {
  try {
    const companyid = req.companyid;
    const yearid = req.yearid;

    const stmt = db.prepare(`
      SELECT * 
      FROM products 
      WHERE companyid = ? AND yearid = ?
    `);

    const products = stmt.all(companyid, yearid);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------------------------------------------
// GET MAIN GROUPS
// -------------------------------------------------------
exports.getMainGroups = (req, res) => {
  try {
    const query = `SELECT * FROM mst_Item_Main_Group`;
    const mainGroups = db.prepare(query).all();
    res.json(mainGroups);
  } catch (error) {
    console.error("Error fetching main groups:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------------------------------------------
// GET UNITS
// -------------------------------------------------------
exports.getUnits = (req, res) => {
  try {
    const query = `SELECT * FROM mstunitmaster`;
    const units = db.prepare(query).all();
    res.json(units);
  } catch (error) {
    console.error("Error fetching units:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------------------------------------------
// ADD PRODUCT
// -------------------------------------------------------
exports.addProduct = (req, res) => {
  const {
    product_nameeg,
    product_namemg,
    item_maingroupid,
    unitid,
    hsn_code,
    gstrate,
    description,
    status,
    created_by_id,
    created_date,
    updated_by_id,
    updated_date,
    hotelid,
    companyid,
    yearid
  } = req.body;

  try {
    const stmt = db.prepare(`
      INSERT INTO products 
      (
        product_nameeg, product_namemg, item_maingroupid, unitid,
        hsn_code, gstrate, description, status,
        created_by_id, created_date, updated_by_id, updated_date, hotelid,
        companyid, yearid
      ) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      product_nameeg, product_namemg, item_maingroupid, unitid,
      hsn_code, gstrate, description, status,
      created_by_id, created_date, updated_by_id, updated_date, hotelid,
      companyid, yearid
    );

    res.json({
      product_id: result.lastInsertRowid,
      product_nameeg, product_namemg, item_maingroupid, unitid,
      hsn_code, gstrate, description, status,
      created_by_id, created_date, updated_by_id, updated_date, hotelid,
      companyid, yearid
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------------------------------------------
// UPDATE PRODUCT
// -------------------------------------------------------
exports.updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const {
      product_nameeg,
      product_namemg,
      item_maingroupid,
      unitid,
      hsn_code,
      gstrate,
      description,
      status,
      updated_by_id,
      updated_date,
      hotelid,
      companyid,
      yearid
    } = req.body;

    // Check ownership
    const exists = db.prepare(`
      SELECT product_id 
      FROM products
      WHERE product_id = ? AND companyid = ?
    `).get(id, companyid);

    if (!exists) {
      return res.status(404).json({ error: 'Product not found or access denied' });
    }

    const stmt = db.prepare(`
      UPDATE products SET
        product_nameeg = ?,
        product_namemg = ?,
        item_maingroupid = ?,
        unitid = ?,
        hsn_code = ?,
        gstrate = ?,
        description = ?,
        status = ?,
        updated_by_id = ?,
        updated_date = ?,
        hotelid = ?,
        companyid = ?,
        yearid = ?
      WHERE product_id = ? AND companyid = ?
    `);

    stmt.run(
      product_nameeg,
      product_namemg,
      item_maingroupid,
      unitid,
      hsn_code,
      gstrate,
      description,
      status,
      updated_by_id,
      updated_date,
      hotelid,
      companyid,
      yearid,
      id,
      companyid
    );

    res.json({
      product_id: id,
      product_nameeg, product_namemg, item_maingroupid, unitid,
      hsn_code, gstrate, description, status,
      updated_by_id, updated_date, hotelid,
      companyid, yearid
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// -------------------------------------------------------
// DELETE PRODUCT
// -------------------------------------------------------
exports.deleteProduct = (req, res) => {
  try {
    const { id } = req.params;
    const companyid = req.companyid;

    // Validate record
    const exists = db.prepare(`
      SELECT product_id 
      FROM products 
      WHERE product_id = ? AND companyid = ?
    `).get(id, companyid);

    if (!exists) {
      return res.status(404).json({ error: 'Product not found or access denied' });
    }

    const stmt = db.prepare("DELETE FROM products WHERE product_id = ? AND companyid = ?");
    stmt.run(id, companyid);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};