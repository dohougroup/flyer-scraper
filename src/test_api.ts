import axios from 'axios';

async function testApi() {
    const postalCode = 'M5V2T6';
    const partnerId = '2120'; // From Save.ca HTML

    const endpoints = [
        `https://backflipp.wishabi.com/flipp/flyers?postal_code=${postalCode}`,
        `https://backflipp.wishabi.com/flipp/flyers?postal_code=${postalCode}&key=${partnerId}`,
        `https://gateflipp.flippback.com/flyers?postal_code=${postalCode}&partner_id=${partnerId}`,
        `https://html-service.flipp.com/flyers?postal_code=${postalCode}&partner_id=${partnerId}`
    ];

    for (const url of endpoints) {
        try {
            console.log(`Testing ${url}...`);
            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });
            console.log(`Success! Status: ${response.status}`);
            console.log('Data snippet:', JSON.stringify(response.data).substring(0, 200));
            return; // Stop if we find a working one
        } catch (error: any) {
            console.log(`Failed: ${error.message}`);
        }
    }
}

testApi();
