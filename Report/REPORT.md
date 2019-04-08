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

[](images/Wireframe_01.jpg)

[](images/Wireframe_02.jpg)

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
<Route path="/create-comment/:id" component={Authentication(CreateComment)}/>

```



### 🌈 Description

#### ⚡️ Create, Read Update and Delete 'Comments' ⚡️

Following an example on the IADT AdvancedJS GitHub example  with users, I was able to create a ``` <Comment/>``` component that allowed the user to create a bid on a property, edit and delete, and view the other bids associated with that property.

Connecting the application to a cloud Database using Mongo Atlas, I created collections within my MonogDB that contained sample information of comments.
These comments had key value pairs as follows :
```js
 { _id: ObjectID ("5ca88ce4ac6a9b0fcf641598")
  comment: "600,000"
  property_id: ObjectID ("5ca224a9e066e40322145fea")
}```

The Property ID was associated with each specific property in the property list, behaving as a foreign key in the comment component. It was accessed through Express URL Parameters, in the axios request that populates the comment list.   ```
  axios.get(`api/properties/${this.props.match.params.id}/comments`)
  ```
#### ⚡️ Authentication ⚡️

Using an example also found on the IADT AdvancedJS website, I implemented a Register / Log in function using JSON web tokens, Bcrypt to hash the passwords stored in the Database to create a user interface in the application.

#### ⚡️ One - Many DB Structure  ⚡️



#### ⚡️ URL Parameters  ⚡️




#### ⚡️ Styling  ⚡️




#### ⚡️ Deployment  ⚡️


### 🌈 Reflection
