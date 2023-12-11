/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    toLeftOf,
    below,
    link,
    text,
    into,
    textBox,
    evaluate,
    setConfig,
    waitFor,
    tableCell,toRightOf,hover,$
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless:false,
    });
    await setConfig({waitForNavigation:false});
 
});

afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};
step("Open shopping application", async function () {
    await goto("automationexercise.com");
});

step("Login as user <email> <password>", async(email,password)=>{
    await goto("automationexercise.com/login");
    await waitFor(3000);
        await write(email,into(textBox({placeholder:"Email Address"})));
    await write(password,into(textBox({placeholder:"Password"})));
    await click("Login");
});
step("Click link <linkName>", async function (linkName) {
    await click(link(linkName));
});
step("Add Product <productName>",async function (productName) {
   await hover(productName);
   await click("Add to cart");
    await click("Continue Shopping");
});
step("Verify cart for row <index> <item> <price> <quantity>",async function (index,item,price,quantity) {
    //check the item name
    await assert.ok((await tableCell({row:index, col:2}).text()).includes(item));
    //price
    await assert.ok((await tableCell({row:index, col:3}).text()).includes(price));
    //checking for the quantity
    await console.log(tableCell({row:index, col:4}).text())
        await assert.ok((await tableCell({row:index, col:4}).text()).includes(quantity));
    //checking for the total price
        await assert.ok((await tableCell({row:index, col:5}).text()).includes((price*quantity)));
        await click($(`//a[text()='Proceed To Checkout']`));
});
step("Checkout", async function () {
   
    await waitFor(2000);
    
});
step("Place order", async function () {
    await click($(`//a[text()='Place Order']`));
    await waitFor(2000);
    
});

step("Confirm order", async function () {
    await write("Kantha",into(textBox({name:"name_on_card"})));      
    await write("1234 1234 1234 1234",into(textBox({name:"card_number"})));
    await write("344",into(textBox({name:"cvc"})));
    await write("03",into(textBox({name:"expiry_month"})));
    await write("2027",into(textBox({name:"expiry_year"})));
    await click("Pay and Confirm Order");
    await assert.ok(text("ORDER PLACED").exists());

});
