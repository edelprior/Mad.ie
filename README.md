# mern-full-stack-auth-state

Example application showing how to implement user authentication with a MERN stack.

This project extends the [previous project](https://github.com/IADT-AdvancedJS/mern-full-stack-auth) by storing the user's login status in state. Login+register links are displayed if the user is not logged in, whereas a logout link is rendered only if they are logged in.

The authentication system in this project is based on [Fabian Virani's article](https://medium.com/@faizanv/authentication-for-your-react-and-express-application-w-json-web-tokens-923515826e0). Please read this to get a detailed description of the code. In particular note that the authentication is based on the storage of JavaScript Web Tokens (JWTs) in browser cookies.

![Gif of app in action](https://i.imgur.com/83RSKPG.gif)
