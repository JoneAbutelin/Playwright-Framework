const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testDataForOrder: {
        email: "jijuabutelin@gmail.com",
        password: "Jone@1234",
        prodName: "ADIDAS ORIGINAL",
        countryName: " India"
    }
}
);