# Getting Started

![alt text](/Images/2.png "Screenshot of Mern Blog")

:warning: Check out the Images Folder

### Prerequisites

_Node.JS and npm must be installed. Download and install them from [here](https://nodejs.org)._

### Description

A MERN blog, fortified with the robust combination of MongoDB, Express.js, React.js, and Node.js, is a dynamic web application tailored for a modern blogging experience. Seamlessly integrating Google authentication, this platform empowers users to effortlessly create accounts, craft and publish captivating blog posts, and actively engage with content through comments and social sharing. Harnessing the strengths of each MERN stack component, this blog promises a user-friendly and interactive environment for both writers and readers alike.

##### [How to get Google Client ID and Client Secret?](https://www.balbooa.com/gridbox-documentation/how-to-get-google-client-id-and-client-secret)

#### .env Api

```
PORT=4000

# MONGODB CONNECTION ENVIRONEMENT
MONGODB_URI=mongodb://localhost:27017/blog

# GOOGLE AUTH

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
#SECRET KEY
secret = "ur secret key";
```

#### .env Client

```
PORT=3000
REACT_APP_GOOGLE_CLIENT_ID=
```

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

Follow these steps to run this project in your local computer.

```
$ git clone https://github.com/SfAtRhl/Mern-Blog.git
$ cd mern-blog-google-auth
$ npm install --prefix --force api && npm install --prefix --force client && npm install
```

Now, to run both the server and client on port `4000` and `3000` respectively, run:

```
$ npm run dev
```

To run only the server, run:

```
$ cd api && npm run server
```

To run only the client, run:

```
$ cd client && npm run client
```
