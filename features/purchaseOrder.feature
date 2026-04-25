Feature: E-commerce Order Placement

  Scenario: Place order using valid user details
    Given user launches the application
    When user logs in with email "jijuabutelin@gmail.com" and password "Jone@1234"
    And user adds product "ADIDAS ORIGINAL" to cart
    And user navigates to cart page
    Then product should be visible in cart
    # When user proceeds to checkout
    # And user selects country "India"
    # And user places the order
    # Then user should see success message "Thankyou for the order."
    # And user should capture the order id
    # When user navigates to orders page
    # Then user should verify the order id in orders history