class DemoAPIUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }
    async getToken() {
        const loginResp = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            })
        //expect(loginResp.ok).toBeTruthy();
        const loginRespJson = await loginResp.json()
        const token = loginRespJson.token
        console.log(token);
        return token;
    }
    async createOrder(orderPayload) {

        let response = {};
        response.token = await this.getToken();

        //order id exists check in history
        const orderResp = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'Authorization': response.token,
                    'content-type': 'application/json'
                },
            }
        )
        const orderRespJson = await orderResp.json();
        console.log(orderRespJson)
        const orderId = orderRespJson.orders[0];
        response.orderId = orderId;
        return response;
    }
}
module.exports = { DemoAPIUtils };