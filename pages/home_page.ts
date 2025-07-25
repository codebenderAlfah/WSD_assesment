import {expect, Locator, Page} from "@playwright/test";

export default class HomePage {
    readonly page: Page;
    readonly fromInput: Locator;
    readonly toInput: Locator;
    readonly fromSelector;
    readonly toSelector;
    readonly departureDateSelector: Locator;
    readonly nextMonthButton: Locator;
    readonly monthName;
    readonly date: Locator;
    readonly travellerSelector;
    readonly travellerAddButton: Locator;
    readonly cabinClassSelector: Locator;
    readonly searchFlightButton: Locator;
    readonly usBangladeshAirlinesFilter;
    readonly novoaAirlinesFilter;

    constructor(page: Page) {
        this.page = page;
        this.fromInput = this.page.getByTestId('departure-airport-input-form-1');
        this.toInput = this.page.getByTestId('destination-airport-input-form-1');
        this.fromSelector = this.page.getByText('Chattogram, Bangladesh');
        this.toSelector = this.page.getByText('Dhaka, Bangladesh');
        this.departureDateSelector = this.page.getByTestId('departure-date-input-form-1').locator('button');
        this.nextMonthButton = this.page.getByLabel('Next Month');
        this.monthName = this.page.getByText('September 2025');
        this.date = this.page.getByLabel('Choose Tuesday, September 23rd,');
        this.travellerSelector = this.page.getByText('1 Traveller');
        this.travellerAddButton = this.page.getByTestId('adult-number-add-button');
        this.cabinClassSelector = this.page.getByAltText('cabin_class_radio_1');
        this.searchFlightButton = this.page.getByTestId('search-flight-button');
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
    async checkMonthName(): Promise<boolean> {
        try {
            await expect(this.monthName).toBeVisible();
            return true;
        } catch {
            return false;
        }
    }

    async selectDepartureDate() {
        await this.clickDepartureDate();

        let isSeptember = await this.checkMonthName();
        while (!isSeptember) {
            await this.clickNextMonthButton();
            isSeptember = await this.checkMonthName();
        }

        await this.clickDate();
    }

    async clickTravellerSelector() {
        await this.travellerSelector.click();
    }
    async clickTravellerAddButton() {
        await this.travellerAddButton.click();
    }

    async selectTraveller() {
        await this.clickTravellerSelector();
        await this.clickTravellerAddButton();
    }

    async clickCabinClassSelector() {
        await this.cabinClassSelector.click();
    }
    async selectCabinClass() {
        await this.clickCabinClassSelector();
    }

    async clickSearchFlightButton() {
        await this.searchFlightButton.click();
    }

    async searchFlights() {
        await this.clickSearchFlightButton();
    }

    async verifySearchResults() {
        await expect(this.searchFlightButton).toHaveValue('modify search');
    }
}