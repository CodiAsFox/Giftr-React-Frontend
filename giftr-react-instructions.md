# Full Stack React App

## Front End 9022 instructions

### ToDos

- [x] set up git w/ branch rules for main
- [x] set up Netlify
- [x] choose UI kit or create/style with styled components - CHAKRA
- [x] make schedule/pair programming plan
- [ ] decide on who does what

### Project Summary

You are building a React-based version of the Giftr App. However, instead of saving the data as JSON files in the Cache you will be saving data in your API that you are building in the [Server-Side course.](https://mad9124.github.io/w2023/deliverables/final.html)

### Components and Layout

The React App is a Single Page App with **Routes** to show different components.

- [ ] login/logout
- [ ] home (people list)
- [x] add/ [] edit person
- [x] gift list for one person
- [ ] add/edit gift idea

#### Login Route

- [ ] "/" route
- [ ] Login button if the user is not logged in
- [ ] message plus a logout button if the user is logged in (*message greeting the user, telling them what to do*)

#### Home Route/People List Component

- [x] "/" route (once authenticated)
- [x] show a list of names and dates of birth for people that have been saved through the API
- [ ] each person show the name plus the month and day of birth
- [ ] sorted by month, then day (the same way dates would appear on the calendar each year)
- [x] Each person item needs an **EDIT** button plus a **GIFT** button to navigate to the gift list
- [ ] If the list is empty, show a _message_ about how to add a person
- [ ] add person button in header

#### Add/Edit Person

- [ ] "/person"
- [ ] "/person/:id"
- [ ] used for adding a new person or editing an existing one

- [ ] Pass in a user object as a prop to **ADD** or **EDIT**
- [ ] **ADD** the id will be null
- [ ] **EDIT** have person id

- [x] input for name
- [x] input for the date

- [ ] **ADD** or **EDIT** => **_SAVE_** button
- [ ] **EDIT** => **_DELETE_** button should also be shown

#### Gift List

- [x] "person/:id/gifts"
- [x] show all the gifts for the selected person
- [ ] name of the person should appear on the screen with list
- [ ] If list === empty, show a _message_ about how to add a gift
- [ ] **EDIT** & **_DELETE_** button on each gift list item

#### Add/Edit Gift

- [ ] "person/:id/gifts/add"
- [ ] "person/:id/gifts/:giftId"

-[ ] used for adding a new gift or editing an existing one -[ ] Pass in a gift object as a prop

- [ ] input for name
- [ ] input for store name
- [ ] input for url
- [ ] **EDIT** & **_DELETE_** button

### Navigation

- [x] use **BrowserRouter**

#### Login

- [x] OAuth authenticates then redirect to "/"
- [x] on successful navigation:
- [x] save JWT token in SessionStorage
- [x] programmatically navigate to the person list route

#### Header

- [ ] In the fixed header bar at the top of the screen:

- [ ] show a back button if the user is on:
- [ ] ADD/EDIT PERSON route
- [ ] GIFT LIST route
- [ ] ADD/EDIT GIFT route

- [ ] show LOGOUT if on PERSON LIST route

- [ ] show an ADD icon button on PERSON/GIFT LIST

- [ ] On each item in the **_PERSON LIST_** there will be two icon buttons:
- [ ] one to go to the **_EDIT_** person route
- [ ] one to go to the **_GIFT_** LIST route

- [ ] **EDIT** & **_DELETE_** button on each gift list item

### Functionality

- [ ] URL for a gift - check if the user wrote 'https://' at the start; add it if needed

- [x] LOGIN function work by using /auth/ endpoints in your API
- [x] login will return a JWT string that you save in sessionStorage
- [x] logout, you only need to delete the token from storage

#### OAuth redirect w/ JWT Token

- [ ] When a user clicks the login button, navigate to {render url}/auth/google?redirect_url={netlify}/login/success which will trigger the OAuth login
- [ ] when successful, will redirect to http://localhost:3000/login/success?token=eyt198nefo018e.1feef1ef1 with the jwt token in the querystring
- [ ] send the url route, that you want to use to handle the login, in the querystring with the param name redirect_url
- [ ] JWT string will be returned in the querystring with the param name token
- [ ] The token string to be saved in sessionStorage
- [ ] added to any request headers with: Bearer: { Authorization: Bearer ${token}}

#### Utility function in useEffect hook to check Authorization

- [ ] All components that require someone to be logged in (everything but the login screen) should have a common utility function that is called from inside a useEffect hook
- [ ] if user is NOT logged in (there is no token in sessionStorage), programmatically redirect them back to the LOGIN route

#### Fetch calls w/ Header Bearer

- [ ] fetch calls to your API should be made inside of a useEffect hook
- [ ] should all include the header Bearer: { Authorization: Bearer ${token}} where the token is coming from sessionStorage

#### Custom Session Storage hook

- [ ] create a custom sessionStorage hook and put that inside a Context Provider (just like the Context API assignment)

#### Delete method w/ confirmation

- [ ] delete of anything must have a confirmation dialog
- [ ] can be done with an HTML modal dialog, a UI Kit modal dialog, or the browser JavaScript native confirm() method

### Design

- [ ] UI Kit Chakra integration

### Hosting/Routing

- [ ] GitHub repo
- [ ] connected to Netlify
- [ ] BrowserRouter

