
import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";


export default class LoginPage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    public Elements = {

        logo: `//img[@alt='company-branding']`,
        image: `//div[@class='orangehrm-login-logo']//img[@alt='orangehrm-logo']`,
        loginText: `//h5[text()='Login']`,
        usernameField: `//label[text()='Username']`,
        passwordField: `//label[text()='Password']`,
        username: `//input[@name='TEXT']`,
        password: `//input[@name='TEXT']`,
        loginButton: `//button[normalize-space()='TEXT']`,
        linkedInIcon: `//a[@href='https://www.linkedin.com/company/orangehrm/mycompany/']`,
        facebookIcon: `//a[@href='https://www.facebook.com/OrangeHRM/']`,
        twitterIcon: `//a[@href='https://twitter.com/orangehrm?lang=en']`,
        youtubeIcon: `//a[@href='https://www.youtube.com/c/OrangeHRMInc']`


    }

    async navigateToLoginPage() {
        await this.base.goto("https://opensource-demo.orangehrmlive.com/");
        //await this.page.waitForTimeout(30000);
    }

    async validateLogoIsVisible() {
        const logo = this.page.locator(this.Elements.logo);
        await expect(logo).toBeVisible();
    }

    async validateImageIsVisible() {
        const image = this.page.locator(this.Elements.image);
        await expect(image).toBeVisible();
    }

    async validateLoginTextIsVisible(text: string) {
        const loginText = this.page.locator(this.Elements.loginText);
        await expect(loginText).toBeVisible();
    }

    async validateUsernameFieldIsVisible() {
        const usernameField = this.page.locator(this.Elements.usernameField);
        await expect(usernameField).toBeVisible();
    }

    async validatePasswordFieldIsVisible() {
        const passwordField = this.page.locator(this.Elements.passwordField);
        await expect(passwordField).toBeVisible();
    }

    async validateLoginButtonColor(buttonName:string,expectedColor: string) {
        const loginButton = this.page.locator(this.Elements.loginButton.replace("TEXT", buttonName));
        await expect(loginButton).toBeVisible();
        //await loginButton.click();
        const color = await this.page.evaluate((button) => {
            return button.ownerDocument.defaultView.getComputedStyle(button).backgroundColor;
        }, await loginButton.elementHandle());
         await expect(color).toBe(expectedColor);
    }



    async performLogin(username: string, password: string) {
        await this.page.locator(this.Elements.username.replace('TEXT', 'username')).fill(username);
        await this.page.locator(this.Elements.password.replace('TEXT', 'password')).fill(password);

    }

    async clickOnLoginButton(buttonName: string) {
        await this.page.locator(this.Elements.loginButton.replace("TEXT", buttonName)).click();
       // await this.page.pause();
    }

    async validateDashboardPageIsVisible() {
        const dashboardPage = this.page.locator(`//h6[normalize-space()='Dashboard']`);
        await expect(dashboardPage).toBeVisible();
    }



    async validateSocialMediaIconsAreVisible() {
        const linkedInIcon = this.page.locator(this.Elements.linkedInIcon);
        const facebookIcon = this.page.locator(this.Elements.facebookIcon);
        const twitterIcon = this.page.locator(this.Elements.twitterIcon);
        const youtubeIcon = this.page.locator(this.Elements.youtubeIcon);
        await expect(linkedInIcon).toBeVisible();
        await expect(facebookIcon).toBeVisible();
        await expect(twitterIcon).toBeVisible();
        await expect(youtubeIcon).toBeVisible();
    }

    async clickOnSocialMediaIcon(icon: 'LinkedIn' | 'Facebook' | 'Twitter' | 'YouTube') {
        let iconLocator;
        switch (icon) {
            case 'LinkedIn':
                iconLocator = this.page.locator(this.Elements.linkedInIcon);
                break;
            case 'Facebook':
                iconLocator = this.page.locator(this.Elements.facebookIcon);
                break;
            case 'Twitter':
                iconLocator = this.page.locator(this.Elements.twitterIcon);
                break;
            case 'YouTube':
                iconLocator = this.page.locator(this.Elements.youtubeIcon);
                break;
        }
        await iconLocator.click();
    }

    async validateNewPageUrl(expectedUrl: string) {
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.click(this.Elements.linkedInIcon)
        ]);
        await newPage.waitForLoadState();
        const url = newPage.url();
        expect(url).toContain(expectedUrl);
        await newPage.close();
    }

    
}










// function getComputedStyle(button: any) {
//     throw new Error("Function not implemented.");
// }
