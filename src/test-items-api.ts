import axios from 'axios';

async function testFlyerAPI() {
    const postalCode = 'M5V2T6';

    // Get flyers
    const flyersUrl = `https://backflipp.wishabi.com/flipp/flyers?postal_code=${postalCode}`;
    console.log(`Fetching flyers from ${flyersUrl}...`);

    const flyersResponse = await axios.get(flyersUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    });

    const flyers = flyersResponse.data;
    console.log(`\nFound ${flyers.length} flyers`);

    if (flyers.length > 0) {
        const firstFlyer = flyers[0];
        console.log('\n=== FIRST FLYER DETAILS ===');
        console.log(JSON.stringify(firstFlyer, null, 2));

        // Try to get items from this flyer
        const flyerId = firstFlyer.id;
        const itemsUrl = `https://backflipp.wishabi.com/flipp/items/search?flyer_ids=${flyerId}&postal_code=${postalCode}`;

        console.log(`\n\nFetching items from ${itemsUrl}...`);

        try {
            const itemsResponse = await axios.get(itemsUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });

            const items = itemsResponse.data;
            console.log(`\nFound ${items.length || items.items?.length || 0} items`);

            if (items.items && items.items.length > 0) {
                console.log('\n=== FIRST ITEM DETAILS ===');
                console.log(JSON.stringify(items.items[0], null, 2));
            } else if (Array.isArray(items) && items.length > 0) {
                console.log('\n=== FIRST ITEM DETAILS ===');
                console.log(JSON.stringify(items[0], null, 2));
            }
        } catch (error) {
            console.error('Error fetching items:', error.message);
        }
    }
}

testFlyerAPI();
