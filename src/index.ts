import { SaveCaScraper } from './scrapers/saveca';

async function main() {
    const args = process.argv.slice(2);
    const postalCodeIndex = args.indexOf('--postal-code');

    if (postalCodeIndex === -1 || postalCodeIndex + 1 >= args.length) {
        console.error('Usage: npm start -- --postal-code <POSTAL_CODE>');
        process.exit(1);
    }

    const postalCode = args[postalCodeIndex + 1];
    console.log(`Scraping flyers for postal code: ${postalCode}`);

    const scraper = new SaveCaScraper();
    const flyers = await scraper.scrape(postalCode);

    console.log(JSON.stringify(flyers, null, 2));
}

main().catch(console.error);
