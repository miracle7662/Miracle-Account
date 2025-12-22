const axios = require('axios');

async function testAPI() {
    try {
        console.log('Testing outlet API with hotel_admin parameters...');
        
        // Test with user "ads" parameters
        const params = {
            role_level: 'hotel_admin',
            brand_id: 3,
            created_by_id: 2
        };
        
        console.log('Sending parameters:', params);
        
        const response = await axios.get('http://localhost:3001/api/outlets', { params });
        
        console.log('API Response:');
        console.log('Status:', response.status);
        console.log('Data:', response.data);
        console.log('Number of outlets returned:', response.data.length);
        
    } catch (error) {
        console.error('API Error:', error.response?.data || error.message);
    }
}

testAPI(); 