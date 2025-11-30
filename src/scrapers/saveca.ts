import axios from 'axios';
import { Flyer, Scraper } from '../types';

export class SaveCaScraper implements Scraper {
    private baseUrl = 'https://backflipp.wishabi.com/flipp/flyers';

    async scrape(postalCode: string): Promise<Flyer[]> {
        try {
            const url = `${this.baseUrl}?postal_code=${postalCode}`;
            console.log(`Fetching ${url}...`);

            const response = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            });

            const data = response.data;
            // The API usually returns { flyers: [...] } or just [...]
            // Let's handle both.
            const rawFlyers = Array.isArray(data) ? data : (data.flyers || []);

            console.log(`Found ${rawFlyers.length} flyers.`);

            return rawFlyers.map((raw: any) => ({
                id: raw.id?.toString() || 'unknown',
                storeName: raw.merchant || raw.name || 'Unknown Store',
                title: raw.name || raw.title || 'No Title',
                validFrom: raw.valid_from || '',
                validTo: raw.valid_to || '',
                postalCode: postalCode,
                items: [], // Items would require a separate fetch to /items/search
                sourceUrl: `https://flipp.com/flyer/${raw.id}-${raw.flyer_run_id || ''}` // Constructing a valid URL
            }));

        } catch (error) {
            console.error('Error scraping Save.ca (Flipp API):', error);
            return [];
        }
    }
}
