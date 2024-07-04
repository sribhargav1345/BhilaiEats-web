# BhilaiEats-web

There are 3 types of Users, who can access to this website.
1. **User**, who can order their Items
2. **Admin**, who is the owner of shop/Restaurant
3. **SuperAdmin**, who can add/Remove shops at IIT Bhilai

Live experience of User: https://bhilaieats-web.vercel.app/ 

Live experience of Admin: https://bhilaieats-web-admin.vercel.app/ 

Test credentials for User:

    Email: sribhargav@gmail.com     
    Password: 12345678

Test credentials for Admin:

    Email: john@gmail.com     
    Password: 12345678

**Key Points:**
1. Users can order their required items from the shops present at IIT Bhilai
2. New shops have to contact SuperAdmin first, for the purpose of Adding their shops, SuperAdmin will provide a code with which, Admins can signup
3. Admins can Add/Remove/Edit the Items present in the shop.
4. For seamless User experience, I have used Fuse.js for Searching Items, users can also filter items by provided categories.
5. User can place the order, which Admin should accept it, inorder to confirm the order

**Technical Terms:**
* I have used ReactJS, Bootstrap for Frontend and NodeJs,MongoDB,ExpressJs for Backend purpose
* For Add to Cart purpose, I have used React-Redux for state management.
* I have used Socket.IO for real-time connections between the User and Admin. This ensures that order status notifications are delivered quickly and efficiently to both clients.
