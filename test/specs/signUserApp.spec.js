/**
 * This file contains an automation test for the login flow in 3 it blocks:
 * 1. Automate the userApp login flow.
 * 2. Automate the PHR edit flow.
 * 3. Call a function to hit the API and check that the PHR data changed.
 */

import {fetchPHRdata} from "../apis_helper/fetchPHRdata.js";

describe('Automate userApp login, then edit PHR' , ()=>{

    it('UserApp log in' , async ()=>{

        await $('//android.view.ViewGroup[@content-desc="JO"]').click();
        await driver.pause(4000);

        await ($(`~registerBtnText`).click());

        await driver.pause(1000);

        const phoneField = await $('~email_login_user_txt');
        await phoneField.click();
        await phoneField.setValue("962798365448");

        await $('~email_login_pass_txt').waitForDisplayed();
        await $('~email_login_pass_txt').addValue("123123");

        await driver.hideKeyboard();

        await $('~btn_emailLoginActionBtn').click();

        console.log("LOG IN!!!");
        await driver.pause(2000);

        // Assertion
        await expect($('~helpingQuestion')).toBeExisting();

    });

    it('Edit PHR' , async ()=>{

        await $('//android.view.ViewGroup[@content-desc="tabbaritem_4"]').click();

        await $('//com.horcrux.svg.UseView').click();

        await $('//android.view.ViewGroup[@content-desc="Phr"]').click();

        await $('//*[@resource-id="phr_profile_personalInfo"]').click();

        await driver.pause(2000);


        await $('~height_txt').addValue("120");

        await $('~weight_txt').addValue("110");

        await $('~blood_type_txt').click();
        await $('~alert_action_0').click();

        await $('~btn_profile_save_btn').click();
        await $('~alert_action_0').click();

        // Assertion
        await expect($('~phrBannerTitle')).toBeExisting();
        console.log("The PHR is edited");
        await driver.pause(2000);

    });

    it('Fetch and log PHR data', async () => {

        const data = await fetchPHRdata();
        expect(data.height).toEqual(120);
        expect(data.weight).toEqual(110);
        expect(data.blood_type).toEqual('A+');

    });

});