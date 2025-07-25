import {test, expect} from '@playwright/test';
import HomePage from '../pages/home_page';

test('air fare comparison', async ({page, baseURL}) => {
    const homePage = new HomePage(page);
    await test.step('Navigate to the flight search page', async () => {
        await page.goto(baseURL);
    });
    await test.step('Enter departure and destination airports', async () => {
        await homePage.enterDestination();
        await homePage.verifyFromLocation();
        await  homePage.verifyToLocation();
    });
    await test.step('Select departure date', async () => {
        await homePage.departureDateSelector.click();
        await homePage.nextMonthButton.click();
        await homePage.nextMonthButton.click();
        await homePage.date.click();
    });
    await test.step('Select number of travellers', async () => {
        await homePage.selectTraveller();
    });
    await test.step('Select cabin class', async () => {
        await homePage.selectCabinClass();
    });
    await test.step('Search for flights', async () => {
        await homePage.searchFlights();
        await homePage.verifySearchResults();
    });
});