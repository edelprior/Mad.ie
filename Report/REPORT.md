# Report for Mad.ie 📓

## Contents 🍩
1. User Stories
2. Wireframes
3. API End Points
4. Description
  - Create, Read Update and Delete 'Comments'
  - Authentication
  - One - Many DB structure
  - URL Parameters
  - Styling
  - Deployment
5. Reflection



### 🌈 User Stories

- As  a first time buyer, I want to see what properties are available in my area so I can compare and get what's best for me.
- As a Real Estate Agent, I want to see what types of bids my properties are getting, so I can analyse the trends in the market.
- As a home owner, I want to be able to browse the properties available in my area, so I can see what is on the market.
- As a student not yet living away from home, I want to see how details about the properties, and more information so I know what I will or will not be able to afford.

### 🌈 Wireframes

(images/Wireframe_01.jpg)
***
(images/Wireframe_02.jpg)

### 🌈 API End Ponts

The following end points are defined and accessed by the user through the home.js page, which is what the user first sees. Using the React Router, along with Express URL Parameters, I routed the user to access different components of the application, depending on whether the user was logged in or not.
There are two one - many database relationships in this project, the first is areas - properties and the second is properties - comments.

The Authentication function checks to see if there is a JSON Web Token within the browser, and if there isn't it will redirect the user to enter their credentials. The handleLogin function ensures that the user doesn't have access to the Login component whilst logged in, or the Logged out component whilst logged out.

```js
<Route path="/" exact component={Home} />
<Route path="/register" component={Register} />
<Route path="/login" render={(props) => <Login {...props} handleLogin={this.login} />} />
<Route path="/logout" render={this.logout}/>
<Route exact path="/areas" component={Authentication(AreaList)}/>
<Route path="/areas/:name/properties/:id" component={Authentication(PropertyList)}/>
<Route path="/properties/:id/comments" component ={Authentication(CommentList)} />
<Route path="/edit-comment/:id" component={Authentication(EditComment)}/>
<Route path="/create-comment/:id" component={Authentication(CreateComment)}/> ```


### 🌈 Description

### 🌈 Reflection
