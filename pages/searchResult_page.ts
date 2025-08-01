// pages/searchResult_page.ts

import {expect, Locator, Page, BrowserContext} from "@playwright/test";
import {captureVisibleFlightPrices} from '../util/price-helper';

export default class SearchResultPage {
    readonly page: Page;
    readonly flightCards: Locator;
    readonly airlineFilterList: Locator;
    readonly filterSelected: Locator;

    constructor(page: Page) {
        this.page = page;
        this.flightCards = this.page.locator('[data-testid^="flight_card"]');
        this.airlineFilterList = this.page.getByTestId('airline-filter-list');
        this.filterSelected = this.page.getByText('1 selected');
    }

    async clickAirlineFilter(airlineName: string) {
        await this.airlineFilterList.getByText(airlineName).click();
    }

    async deselectAirlineFilter(airlineName: string) {
        await this.airlineFilterList.getByText(airlineName).click();
    }

    async verifyFilterSelected() {
        await expect(this.filterSelected).toBeVisible();
    }

    async captureFlightPrices(){
        await expect(this.flightCards.first()).toBeVisible({ timeout: 10000 });
        return await captureVisibleFlightPrices(this.page);
    }

    async handleSignInAndClose(context: BrowserContext) {
        const pagePromise = context.waitForEvent('page');
        await this.flightCards.last().getByRole('button', { name: 'Select' }).click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        await expect(newPage.getByRole('heading', { name: 'Sign In' })).toBeVisible();
        await newPage.close();
    }

    async compareFlightPrices(usBanglaPrices: number[], novoAirPrices: number[]) {
        expect(usBanglaPrices).not.toEqual(novoAirPrices);
    }
}
