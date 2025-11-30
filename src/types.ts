export interface Item {
    id: string;
    title: string;
    description?: string;
    price?: string;
    imageUrl?: string;
    validFrom?: string;
    validTo?: string;
}

export interface Flyer {
    id: string;
    storeName: string;
    title: string;
    validFrom: string;
    validTo: string;
    postalCode: string;
    items: Item[];
    sourceUrl: string;
}

export interface Scraper {
    scrape(postalCode: string): Promise<Flyer[]>;
}
