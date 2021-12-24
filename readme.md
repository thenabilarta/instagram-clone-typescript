# Instagram Clone

#### Node JS - React - MySQL

Backend Installation

```
Npm install
Create database and run instagram_clone.sql on mysql.
Add .env for stored image url
Node index.js
```

Frontend Installation

```
Npm install
Insert backend url on .env file. Ex: http://localhost:5000
Npm start
```

Production Installation

```
Client directory, run: Npm run build
Uncomment code
// app.use(express.static(path.join(__dirname, "/client/build")));
// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "/client/build/index.html"))
// );
If using pm2 on linux, run pm2 start index.js
```
