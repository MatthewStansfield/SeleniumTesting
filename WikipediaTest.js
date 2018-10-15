"use strict";
exports.__esModule = true;
var fs = require("fs");
var webdriver = require("selenium-webdriver");
var chai_1 = require("chai");
chai_1.should();
var Key = webdriver.Key
describe('Wikipedia Test', function () {
    var driver;
    // time out for test execution
    this.timeout(60000);
    before(function () {
        // initializing chrome driver
        driver = new webdriver.Builder()
            .forBrowser('firefox')
            .build();
        // maximizing chrome browser
        driver.manage().window().maximize();
    });
    afterEach(function () {
        var testCaseName = this.currentTest.title;
        var testCaseStatus = this.currentTest.state;
        if (testCaseStatus === 'failed') {
            console.log("Test: " + testCaseName + ", Status: Failed!");
            // capturing screenshot if test fails
            driver.takeScreenshot().then(function (data) {
                var screenshotPath = "TestResults/Screenshots/" + testCaseName + ".png";
                console.log("Saving Screenshot as: " + screenshotPath);
                fs.writeFileSync(screenshotPath, data, 'base64');
            });
        }
        else if (testCaseStatus === 'passed') {
            console.log("Test: " + testCaseName + ", Status: Passed!");
            //Capturing a screenshit if it passes
            driver.takeScreenshot().then(function (data) {
                var screenshotPath = "TestResults/Screenshots/" + testCaseName + ".png";
                console.log("Saving Screenshot as: " + screenshotPath);
                fs.writeFileSync(screenshotPath, data, 'base64');
            });
        }
        else {
            console.log("Test: " + testCaseName + ", Status: Unknown!");
        }
    });
    it('Should open wikipedia', function () {
        var Url = "https://en.wikipedia.org";
        return driver.get(Url).then(function () {
            console.log("Page \"" + Url + "\" opened");
        }).then(function () {
            return driver.getCurrentUrl().then(function (currentUrl) {
                currentUrl.should.include("https://en.wikipedia.org", "Expected url: https://en.wikipedia.org, Actual url: " + currentUrl);
            });
        });
    });
    it('Should search for Isaac Newton on wikipedia', function () {
        //Selecting the wikipedia searchbox and entering the Isaac Newton
        var searchBox = driver.findElement(webdriver.By.name('search'));
        searchBox.sendKeys('Isaac Newton');
        return searchBox.getAttribute('value').then(function (value) {
            value.should.equal('Isaac Newton');
        });
    });
    it('Should Open the Isaac Newton wikipedia page', function() {
        var searchBox = driver.findElement(webdriver.By.name('search'));
        searchBox.sendKeys(Key.ENTER);
        return driver.getCurrentUrl().then(function(currentUrl){
            currentUrl.should.include("https://en.wikipedia.org/wiki/Isaac_Newton", "Expected url: https://en.wikipedia.org/wiki/Isaac_Newton, Actual url:" + currentUrl);
        });
    });
});
