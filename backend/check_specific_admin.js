const db = require('./config/db');

console.log('🔍 Checking Specific Admin Users...\n');

// Check for Admin users with specific company IDs
const adminUsers = db.prepare(`
    SELECT userid, username, full_name, companyid, yearid, role_level, status, created_date
    FROM mst_users
    WHERE username = 'Admin' AND status = 1
    ORDER BY userid DESC
`).all();

console.log('📋 Admin Users with username "Admin":');
console.log('=====================================');
adminUsers.forEach(user => {
    console.log(`ID: ${user.userid}`);
    console.log(`Username: ${user.username}`);
    console.log(`Full Name: ${user.full_name}`);
    console.log(`Company ID: ${user.companyid}`);
    console.log(`Year ID: ${user.yearid}`);
    console.log(`Role: ${user.role_level}`);
    console.log(`Status: ${user.status}`);
    console.log(`Created: ${user.created_date}`);
    console.log('---');
});

// Check what happens with the login query for Admin/company 2/year 1
console.log('\n🔐 Testing Login Query for Admin/Company 2/Year 1:');
console.log('===================================================');
const loginResult = db.prepare(`
    SELECT u.*
    FROM mst_users u
    WHERE u.companyid = ? AND u.username = ? AND u.yearid = ? AND u.status = 1
`).get(2, 'Admin', 1);

if (loginResult) {
    console.log('✅ User found:', {
        id: loginResult.userid,
        username: loginResult.username,
        companyid: loginResult.companyid,
        yearid: loginResult.yearid
    });
} else {
    console.log('❌ No user found with companyid=2, username=Admin, yearid=1');
}

// Check if there are any users with companyid=2 and username=Admin
console.log('\n🔍 Users with companyid=2 and username=Admin:');
console.log('===============================================');
const company2Admin = db.prepare(`
    SELECT userid, username, companyid, yearid, status
    FROM mst_users
    WHERE companyid = 2 AND username = 'Admin' AND status = 1
`).all();

if (company2Admin.length > 0) {
    company2Admin.forEach(user => {
        console.log(`ID: ${user.userid}, Year ID: ${user.yearid}`);
    });
} else {
    console.log('❌ No Admin user found for company 2');
}

db.close();
