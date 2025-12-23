const db = require('../config/db');

exports.getTimezones = (req, res) => {
    try {
        const { country_code } = req.query;
        
        // Define timezones by country
        const timezoneMap = {
            'IN': [ // India
                { timezone_id: 1, timezone_name: 'IST', timezone_offset: '+05:30', description: 'India Standard Time' }
            ],
            'US': [ // United States
                { timezone_id: 2, timezone_name: 'EST', timezone_offset: '-05:00', description: 'Eastern Standard Time' },
                { timezone_id: 3, timezone_name: 'CST', timezone_offset: '-06:00', description: 'Central Standard Time' },
                { timezone_id: 4, timezone_name: 'MST', timezone_offset: '-07:00', description: 'Mountain Standard Time' },
                { timezone_id: 5, timezone_name: 'PST', timezone_offset: '-08:00', description: 'Pacific Standard Time' },
                { timezone_id: 6, timezone_name: 'AKST', timezone_offset: '-09:00', description: 'Alaska Standard Time' },
                { timezone_id: 7, timezone_name: 'HST', timezone_offset: '-10:00', description: 'Hawaii Standard Time' }
            ],
            'GB': [ // United Kingdom
                { timezone_id: 8, timezone_name: 'GMT', timezone_offset: '+00:00', description: 'Greenwich Mean Time' },
                { timezone_id: 9, timezone_name: 'BST', timezone_offset: '+01:00', description: 'British Summer Time' }
            ],
            'CA': [ // Canada
                { timezone_id: 10, timezone_name: 'EST', timezone_offset: '-05:00', description: 'Eastern Standard Time' },
                { timezone_id: 11, timezone_name: 'CST', timezone_offset: '-06:00', description: 'Central Standard Time' },
                { timezone_id: 12, timezone_name: 'MST', timezone_offset: '-07:00', description: 'Mountain Standard Time' },
                { timezone_id: 13, timezone_name: 'PST', timezone_offset: '-08:00', description: 'Pacific Standard Time' },
                { timezone_id: 14, timezone_name: 'NST', timezone_offset: '-03:30', description: 'Newfoundland Standard Time' }
            ],
            'AU': [ // Australia
                { timezone_id: 15, timezone_name: 'AEST', timezone_offset: '+10:00', description: 'Australian Eastern Standard Time' },
                { timezone_id: 16, timezone_name: 'ACST', timezone_offset: '+09:30', description: 'Australian Central Standard Time' },
                { timezone_id: 17, timezone_name: 'AWST', timezone_offset: '+08:00', description: 'Australian Western Standard Time' }
            ],
            'DE': [ // Germany
                { timezone_id: 18, timezone_name: 'CET', timezone_offset: '+01:00', description: 'Central European Time' },
                { timezone_id: 19, timezone_name: 'CEST', timezone_offset: '+02:00', description: 'Central European Summer Time' }
            ],
            'FR': [ // France
                { timezone_id: 20, timezone_name: 'CET', timezone_offset: '+01:00', description: 'Central European Time' },
                { timezone_id: 21, timezone_name: 'CEST', timezone_offset: '+02:00', description: 'Central European Summer Time' }
            ],
            'JP': [ // Japan
                { timezone_id: 22, timezone_name: 'JST', timezone_offset: '+09:00', description: 'Japan Standard Time' }
            ],
            'CN': [ // China
                { timezone_id: 23, timezone_name: 'CST', timezone_offset: '+08:00', description: 'China Standard Time' }
            ],
            'BR': [ // Brazil
                { timezone_id: 24, timezone_name: 'BRT', timezone_offset: '-03:00', description: 'Brasília Time' },
                { timezone_id: 25, timezone_name: 'BRST', timezone_offset: '-02:00', description: 'Brasília Summer Time' }
            ],
            'SG': [ // Singapore
                { timezone_id: 26, timezone_name: 'SGT', timezone_offset: '+08:00', description: 'Singapore Time' }
            ],
            'AE': [ // United Arab Emirates
                { timezone_id: 27, timezone_name: 'GST', timezone_offset: '+04:00', description: 'Gulf Standard Time' }
            ],
            'SA': [ // Saudi Arabia
                { timezone_id: 28, timezone_name: 'AST', timezone_offset: '+03:00', description: 'Arabia Standard Time' }
            ],
            'KR': [ // South Korea
                { timezone_id: 29, timezone_name: 'KST', timezone_offset: '+09:00', description: 'Korea Standard Time' }
            ],
            'NL': [ // Netherlands
                { timezone_id: 30, timezone_name: 'CET', timezone_offset: '+01:00', description: 'Central European Time' },
                { timezone_id: 31, timezone_name: 'CEST', timezone_offset: '+02:00', description: 'Central European Summer Time' }
            ]
        };
        
        let timezones;
        if (country_code && timezoneMap[country_code]) {
            // Return timezones for specific country
            timezones = timezoneMap[country_code];
        } else {
            // Return all timezones if no country specified or country not found
            timezones = Object.values(timezoneMap).flat();
        }
        
        res.json(timezones);
    } catch (error) {
        console.error('Error fetching timezones:', error);
        res.status(500).json({ error: 'Failed to fetch timezones' });
    }
}; 