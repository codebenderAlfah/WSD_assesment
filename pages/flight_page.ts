import {expect, Locator, Page} from "@playwright/test";

export default class FlightPage {
    readonly page: Page;
    readonly fromInput: Locator;
    readonly toInput: Locator;
    readonly fromSelector: Locator;
    readonly toSelector: Locator;
    readonly departureDateSelector: Locator;
    readonly nextMonthButton: Locator;
    readonly monthName: Locator;
    readonly date: Locator;
    readonly travellerSelector: Locator;
    readonly travellerAddButton: Locator;
    readonly cabinClassSelector: Locator;
    readonly selectedCabinClass: Locator;
    readonly searchFlightButton: Locator;
    readonly searchResults: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fromInput = this.page.getByTestId('departure-airport-input-form-1');
        this.toInput = this.page.getByTestId('destination-airport-input-form-1');
        this.fromSelector = this.page.getByText('Chattogram, Bangladesh');
        this.toSelector = this.page.getByText('Dhaka, Bangladesh');
        this.departureDateSelector = this.page.getByTestId('departure-date-input-form-1').locator('button');
        this.nextMonthButton = this.page.getByLabel('Next Month');
        this.monthName = this.page.locator('//div[@class=\'react-datepicker__current-month\']');
        this.date = this.page.getByLabel('Choose Tuesday, September 23rd,');
        this.travellerSelector = this.page.getByText('1 Traveller');
        this.travellerAddButton = this.page.getByTestId('adult-number-add-button');
        this.cabinClassSelector = this.page.getByAltText('cabin_class_radio_1');
        this.selectedCabinClass = this.page.locator('//p[@class=\'truncate text-sm text-brand-7\']');
        this.searchFlightButton = this.page.getByTestId('search-flight-button');
        this.searchResults = this.page.getByTestId('flight_card_1');
    }

    async clickFromInput() {
        await this.fromInput.click();
    }
    async selectFromInput() {
        await this.fromSelector.click();
    }
    async clickToInput() {
        await this.toInput.click();
    }
    async selectToInput() {
        await this.toSelector.click();
    }
    async enterDestination() {
        await this.clickFromInput()
        await this.selectFromInput();
        await this.clickToInput();
        await this.selectToInput();
    }

    async verifyFromLocation() {
        await expect(this.fromInput).toHaveValue('CGP');
    }

    async verifyToLocation() {
        await expect(this.toInput).toHaveValue('DAC');
    }

    async clickDepartureDate() {
        await this.departureDateSelector.click();
    }

    async clickNextMonthButton() {
        await this.nextMonthButton.click();
    }
    async clickDate() {
        await this.date.click();
    }

    async selectDepartureDate() {
        await this.clickDepartureDate();

        let value = await this.monthName.innerText();
        if (value !== 'September 2025') {
            await this.clickNextMonthButton();
        }
        await this.clickDate();
    }

    async verifyDepartureDate() {
        await expect(this.page.getByText('23 Sep, 2025')).toBeVisible();
    }

    async clickTravellerSelector() {
        await this.travellerSelector.click();
    }
    async clickTravellerAddButton() {
        await this.travellerAddButton.click();
    }

    async selectTraveller() {
        await this.clickTravellerSelector();
        let count = await this.travellerAddButton.locator('xpath=./preceding-sibling::p[1]').textContent();
        if( count !== '2') {
            await this.clickTravellerAddButton();
        }
    }
    async verifyTravellerCount() {
        await expect(this.page.getByText('2 Travellers')).toBeVisible();
    }

    async clickCabinClassSelector() {
        await this.cabinClassSelector.click();
    }
    async selectCabinClass() {
        await this.clickCabinClassSelector();
    }

    async verifyCabinClass() {
        await expect(this.selectedCabinClass).toHaveText('Economy/Premium Economy');
    }

    async clickSearchFlightButton() {
        await this.searchFlightButton.click();
    }

    async searchFlights() {
        await this.clickSearchFlightButton();
    }

    async verifySearchResults() {
    await this.searchResults.waitFor({ state: 'visible' });
    await expect(this.searchResults).toBeVisible();
    }
}
