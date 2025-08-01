// tests/priceCompare.spec.ts

import {test, expect} from '@playwright/test';
import FlightPage from "../pages/flight_page";
import SearchResultPage from "../pages/searchResult_page";

test('priceCompare', async ({page, context, baseURL}) => { // We need context for new tabs
    const flightPage = new FlightPage(page);
    const searchResultPage = new SearchResultPage(page);
    let usBanglaPrices: number[];
    let novoAirPrices: number[];

    await test.step('Navigate to the flight search page', async () => {
        await page.goto(baseURL as string);
    });

    await test.step('Enter departure and destination airports', async () => {
        await flightPage.enterDestination();
        await flightPage.verifyFromLocation();
        await  flightPage.verifyToLocation();
    });

    await test.step('Select departure date', async () => {
        await flightPage.selectDepartureDate();
        await flightPage.verifyDepartureDate();
    });

    await test.step('Select number of travellers', async () => {
        await flightPage.selectTraveller();
        await flightPage.verifyTravellerCount();
    });

    await test.step('Select cabin class', async () => {
        await flightPage.selectCabinClass();
        await flightPage.verifyCabinClass();
    });

    await test.step('Search for flights', async () => {
        await flightPage.searchFlights();
        await flightPage.verifySearchResults();
    });

    await test.step('Filter US Bangla Airlines Flights', async () => {
        await searchResultPage.clickAirlineFilter('US Bangla Airlines');
        await searchResultPage.verifyFilterSelected();
    });

    await test.step('Capture US Bangla Airlines Prices', async () => {
        usBanglaPrices = await searchResultPage.captureFlightPrices();
        expect(usBanglaPrices.length).toBeGreaterThan(0);
    });

    await test.step('Handle Sign In Popup', async () => {
        await searchResultPage.handleSignInAndClose(context);
    });

    await test.step('Deselect US Bangla Airlines filter', async () => {
        await searchResultPage.deselectAirlineFilter('US Bangla Airlines');
        await expect(searchResultPage.filterSelected).toBeHidden();
    });

    await test.step('Select Novo Air filter', async () => {
        await searchResultPage.clickAirlineFilter('Novo Air');
        await searchResultPage.verifyFilterSelected();
    });

    await test.step('Capture Novo Air Prices', async () => {
        novoAirPrices = await searchResultPage.captureFlightPrices();
        expect(novoAirPrices.length).toBeGreaterThan(0);
    });

    await test.step('Compare US Bangla and Novo Air Prices', async () => {
        await searchResultPage.compareFlightPrices(usBanglaPrices, novoAirPrices);
    });
});
