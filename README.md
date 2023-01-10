# The Hardware Crew

## Project Description
The Hardware Crew is a e-commerce full stack website made for practice. All products are there for web development training purposes.
It includes both user interface and admin dashboard.
<br />
<br />
The user interface shows the items available for sell and are separated based on their category. Users can browse the items in general as well as having a closer, more detailed look at a specific item.
<br />
<br />
The admin interface includes two features. The first one being "Add Product" where admins can add new products with images and new SKUs. The second feature is "Edit Product". In here admins can edit existing products by typing their SKU and changing the price or image of a product for example.
<br />
<br />
Stripe checkout was used in this app to guide customers to the final page upon product(s) purchase. Stripe is in demo mode so do not use any real credit/debit card information; check the setup below.
<br />
<br />
The database used is ElephantSQL and the backend was implemented using node and deployed using Railway. React is responsible for the front end and Netlify was used to deploy it.

## Screenshots
![Homepage](https://github.com/Khaled91Alkhatib/the-hardware-crew/blob/main/public/Screenshots/Homepage.png?raw=true)
![Collection](https://github.com/Khaled91Alkhatib/the-hardware-crew/blob/main/public/Screenshots/Collection.png?raw=true)
![Single Product](https://github.com/Khaled91Alkhatib/the-hardware-crew/blob/main/public/Screenshots/Single%20Product.png?raw=true)
![Cart](https://github.com/Khaled91Alkhatib/the-hardware-crew/blob/main/public/Screenshots/Cart.png?raw=true)
![Checkout](https://github.com/Khaled91Alkhatib/the-hardware-crew/blob/main/public/Screenshots/Checkout.png?raw=true)
![Admin Access](https://github.com/Khaled91Alkhatib/the-hardware-crew/blob/main/public/Screenshots/Admin%20access.png?raw=true)
![Add Product](https://github.com/Khaled91Alkhatib/the-hardware-crew/blob/main/public/Screenshots/Add%20product.png?raw=true)
![Edit Product](https://github.com/Khaled91Alkhatib/the-hardware-crew/blob/main/public/Screenshots/Edit%20product.png?raw=true)

## Setup
* Since the website is deployed, you can visit [https://thehardwarecrew.netlify.app/](https://thehardwarecrew.netlify.app/) to check it out.
* For admin dashboard access please click on this [link](https://thehardwarecrew.netlify.app/dashboard) and register a new user.
* For the checkout, you can use 4242 4242 4242 4242 as a payment card number and the expiration date can be any date in the future. The CVV will accept any three numbers.
* To check the github for the backend please click [Here](https://github.com/Khaled91Alkhatib/the-hardware-crew-api)

## Dependencies
* react
* react-dom
* react-toastify
* fontawesome
* react-stripe-checkout
* classnames
* axios
* sass