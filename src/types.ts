export interface Item {
    id: string;
    name: string;
    description?: string;
    brand?: string;
    salePrice?: string;
    regularPrice?: string;
    unitSize?: string;
    validUnit?: string;
    imageUrl?: string;
    category?: string;
}

export interface Store {
    name: string;
    address?: string;
    city?: string;
    province?: string;
    postalCode?: string;
}

export interface Flyer {
    id: string;
    storeName: string;
    storeAddress?: string;
    title: string;
    validFrom: string;
    validTo: string;
    postalCode: string;
    sourceUrl: string;
}

export interface ProductDetail {
    flyerId: string;
    storeName: string;
    storeAddress: string;
    productName: string;
    brand: string;
    salePrice: string;
    regularPrice: string;
    unitSize: string;
    validUnit: string;
    imageUrl: string;
    validFrom: string;
    validTo: string;
    category: string;
    postalCode: string;
}

export interface Scraper {
    scrape(postalCode: string): Promise<Flyer[]>;
    scrapeProducts(postalCode: string): Promise<ProductDetail[]>;
}
