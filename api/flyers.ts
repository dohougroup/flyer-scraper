import { SaveCaScraper } from './scrapers/saveca';

export default async function handler(req: any, res: any) {
    // Enable CORS for your app to call this API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { postal_code } = req.query;

    if (!postal_code) {
        return res.status(400).json({
            error: 'Missing postal_code parameter',
            usage: '/api/flyers?postal_code=M5V2T6'
        });
    }

    try {
        const scraper = new SaveCaScraper();
        const flyers = await scraper.scrape(postal_code as string);

        return res.status(200).json({
            postal_code,
            count: flyers.length,
            flyers,
            cached_at: new Date().toISOString()
        });
    } catch (error: any) {
        return res.status(500).json({
            error: 'Failed to fetch flyers',
            message: error.message
        });
    }
}
