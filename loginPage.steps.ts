import { Given, Then, When } from "@cucumber/cucumber";
import LoginPage from "../../pages/loginPage2";
import { fixture } from "../../hooks/pageFixture";

let loginPage: LoginPage;
Given('user is on the login page', async function () {
    loginPage = new LoginPage(fixture.page);
    await loginPage.navigateToLoginPage();
});

Then('the logo should be visible', async function () {

    await loginPage.validateLogoIsVisible();
});

Then('the images should be visible', async function () {
    await loginPage.validateImageIsVisible();
});

Then('the text {string} should be visible', async function (text: string) {
    await loginPage.validateLoginTextIsVisible(text);
});

Then('the username field should be visible', async function () {
    await loginPage.validateUsernameFieldIsVisible();
});

Then('the password field should be visible', async function () {
    await loginPage.validatePasswordFieldIsVisible();
});

Then('the {string} button should be visible and have color {string}', async function (buttonName:string,expectedColor: string) {
    await loginPage.validateLoginButtonColor(buttonName,expectedColor);
});




When('user enters {string} and {string}', async function (username: string, password: string) {
    await loginPage.performLogin(username, password);

});

When('clicks on the {string} button', async function (buttonName: string) {
    await loginPage.clickOnLoginButton(buttonName);

});

Then('user should be navigated to the dashboard page', async function () {

    await loginPage.validateDashboardPageIsVisible();
});




Then('the social media icons should be visible', async function () {
    await loginPage.validateSocialMediaIconsAreVisible();
});

When('user clicks on the social media icon with text {string}', async function (iconText: string) {
    await loginPage.clickOnSocialMediaIcon(iconText as 'LinkedIn' | 'Facebook' | 'Twitter' | 'YouTube');
});

Then('a new page should open with URL containing {string}', async function (expectedUrl: string) {
    await loginPage.validateNewPageUrl(expectedUrl);
});