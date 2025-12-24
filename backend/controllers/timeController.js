const db = require('../config/db');

exports.getStartTimes = (req, res) => {
    try {
        // Return common start times for businesses
        const startTimes = [
            { time_id: 1, time_value: '06:00', time_label: '6:00 AM' },
            { time_id: 2, time_value: '07:00', time_label: '7:00 AM' },
            { time_id: 3, time_value: '08:00', time_label: '8:00 AM' },
            { time_id: 4, time_value: '09:00', time_label: '9:00 AM' },
            { time_id: 5, time_value: '10:00', time_label: '10:00 AM' },
            { time_id: 6, time_value: '11:00', time_label: '11:00 AM' },
            { time_id: 7, time_value: '12:00', time_label: '12:00 PM' },
            { time_id: 8, time_value: '13:00', time_label: '1:00 PM' },
            { time_id: 9, time_value: '14:00', time_label: '2:00 PM' },
            { time_id: 10, time_value: '15:00', time_label: '3:00 PM' },
            { time_id: 11, time_value: '16:00', time_label: '4:00 PM' },
            { time_id: 12, time_value: '17:00', time_label: '5:00 PM' },
            { time_id: 13, time_value: '18:00', time_label: '6:00 PM' },
            { time_id: 14, time_value: '19:00', time_label: '7:00 PM' },
            { time_id: 15, time_value: '20:00', time_label: '8:00 PM' },
            { time_id: 16, time_value: '21:00', time_label: '9:00 PM' },
            { time_id: 17, time_value: '22:00', time_label: '10:00 PM' },
            { time_id: 18, time_value: '23:00', time_label: '11:00 PM' },
            { time_id: 19, time_value: '00:00', time_label: '12:00 AM' }
        ];
        
        res.json(startTimes);
    } catch (error) {
        console.error('Error fetching start times:', error);
        res.status(500).json({ error: 'Failed to fetch start times' });
    }
};

exports.getCloseTimes = (req, res) => {
    try {
        // Return common close times for businesses
        const closeTimes = [
            { time_id: 1, time_value: '18:00', time_label: '6:00 PM' },
            { time_id: 2, time_value: '19:00', time_label: '7:00 PM' },
            { time_id: 3, time_value: '20:00', time_label: '8:00 PM' },
            { time_id: 4, time_value: '21:00', time_label: '9:00 PM' },
            { time_id: 5, time_value: '22:00', time_label: '10:00 PM' },
            { time_id: 6, time_value: '23:00', time_label: '11:00 PM' },
            { time_id: 7, time_value: '00:00', time_label: '12:00 AM' },
            { time_id: 8, time_value: '01:00', time_label: '1:00 AM' },
            { time_id: 9, time_value: '02:00', time_label: '2:00 AM' },
            { time_id: 10, time_value: '03:00', time_label: '3:00 AM' },
            { time_id: 11, time_value: '04:00', time_label: '4:00 AM' },
            { time_id: 12, time_value: '05:00', time_label: '5:00 AM' },
            { time_id: 13, time_value: '06:00', time_label: '6:00 AM' },
            { time_id: 14, time_value: '07:00', time_label: '7:00 AM' },
            { time_id: 15, time_value: '08:00', time_label: '8:00 AM' },
            { time_id: 16, time_value: '09:00', time_label: '9:00 AM' },
            { time_id: 17, time_value: '10:00', time_label: '10:00 AM' },
            { time_id: 18, time_value: '11:00', time_label: '11:00 AM' },
            { time_id: 19, time_value: '12:00', time_label: '12:00 PM' }
        ];
        
        res.json(closeTimes);
    } catch (error) {
        console.error('Error fetching close times:', error);
        res.status(500).json({ error: 'Failed to fetch close times' });
    }
}; 