const { test, expect } = require("@playwright/test");

test("calendar", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")



    const date = "2027-01-14";
    const [year, month, day] = date.split("-");

    const monthMap = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    };

    const monthName = monthMap[month];

    console.log(monthName);

    await page.locator(".react-date-picker__calendar-button").click();
    await page.locator(".react-calendar__navigation__label").dblclick();
    await page.getByRole("button", { name: year }).click();
    await page.getByRole("button", { name: monthName }).click();
    await page.getByRole("button", { name: day }).click();
    await expect(page.locator("input[name='date']")).toHaveValue(date);

    // each value separate check means
    //     const inputs = page.locator('.react-date-picker__inputGroup__input')

    // for(let i =0; i<expectedList.length;i++)
    // {
    //     const value = await inputs.nth(i).inputValue();
    //     expect(value).toEqual(expectedList[i]);
    // }
})
