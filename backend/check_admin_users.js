const db = require('./config/db');

console.log('🔍 Checking Admin Users in Database...\n');

// Get all admin users
const adminUsers = db.prepare(`
    SELECT userid, username, full_name, companyid, yearid, role_level, status, created_date
    FROM mst_users
    WHERE username LIKE '%admin%' OR role_level = 'admin'
    ORDER BY userid DESC
    LIMIT 20
`).all();

console.log('📋 Admin Users Found:');
console.log('===================');
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

// Get company details
console.log('\n🏢 Company Details:');
console.log('==================');
const companies = db.prepare(`
    SELECT companyid, company_name
    FROM companymaster
    ORDER BY companyid
`).all();

companies.forEach(company => {
    console.log(`Company ID ${company.companyid}: ${company.company_name}`);
});

// Get year details
console.log('\n📅 Year Details:');
console.log('===============');
const years = db.prepare(`
    SELECT yearid, Year
    FROM yearmaster
    ORDER BY yearid
`).all();

years.forEach(year => {
    console.log(`Year ID ${year.yearid}: ${year.Year}`);
});

db.close();
