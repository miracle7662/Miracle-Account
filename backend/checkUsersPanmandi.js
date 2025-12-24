const Database = require('better-sqlite3');
const path = require('path');

// Connect to the database (same as db.js)
const dbPath = path.join('D:', 'Restaurant_Database', 'panmandi.db');
const db = new Database(dbPath);

console.log('🔍 Checking all users in panmandi.db...\n');

try {
    // Query all users with their details
    const users = db.prepare(`
        SELECT
            userid,
            username,
            email,
            password,
            full_name,
            role_level,
            status
        FROM mst_users
        ORDER BY userid
    `).all();

    console.log(`Found ${users.length} users:\n`);

    users.forEach((user, index) => {
        console.log(`${index + 1}. User ID: ${user.userid}`);
        console.log(`   Username: ${user.username || 'N/A'}`);
        console.log(`   Email: ${user.email || 'N/A'}`);
        console.log(`   Password: ${user.password ? '***' + user.password.slice(-4) : 'N/A'}`);
        console.log(`   Full Name: ${user.full_name || 'N/A'}`);
        console.log(`   Role: ${user.role_level || 'N/A'}`);
        console.log(`   Status: ${user.status ? 'Active' : 'Inactive'}`);
        console.log('   ---');
    });

} catch (error) {
    console.error('❌ Error checking users:', error);
} finally {
    db.close();
}
