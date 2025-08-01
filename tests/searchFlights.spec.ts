import {test, expect} from '@playwright/test';
import FlightPage from '../pages/flight_page';

test('air fare comparison', async ({page, baseURL}) => {
    const flightPage = new FlightPage(page);
    await test.step('Navigate to the flight search page', async () => {
        await page.goto(baseURL);
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

});
