import type { Page } from '@playwright/test';
export async function captureVisibleFlightPrices(page: Page): Promise<number[]> {
    const prices: number[] = [];
    const visibleFlightCards = await page.locator('[data-testid^="flight_card"]').all();
    for (const card of visibleFlightCards) {
        const priceLocator = card.locator('[data-testid="price-section"] .font-bold p');
        const rawText = await priceLocator.textContent();
        if (rawText) {
            const priceNumber = parseInt(rawText.replace('BDT', '').replace(',', '').trim(), 10);
            prices.push(priceNumber);
        }
    }
    return prices;
}
