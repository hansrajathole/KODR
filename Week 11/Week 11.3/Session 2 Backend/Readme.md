# 🚀 Week 11 - Day 3: Backend Session 2  
## 🛠️ **Building a User Management System with Express & MongoDB**  

Today, we built a **User Management System** using **Express, MongoDB (Mongoose), and EJS**! 🎉  

---

## **📌 Steps We Followed**  

### 🔹 **Step 1: Initialize the Project**  
We started by setting up our Node.js project:  

```bash
npm init -y
npm i ejs mongoose express
```
This installs:  
- **EJS** for templating 🖼️  
- **Mongoose** for database interaction 🛢️  
- **Express** for handling routes 🚀  

---

### 🔹 **Step 2: Create a Simple User Form 📝**  
Our form collects:  
✔ **Username**  
✔ **Email**  
✔ **Bio**  
✔ **Profile Image (URL)**  

📍 **Route to Render the Form:**  
```javascript
app.get("/create", (req, res) => {
    res.render("createUser");  // Renders EJS form
});
```

📍 **EJS Form (`views/createUser.ejs`):**  
```html
<form action="/create" method="POST">
    <input type="text" name="username" placeholder="Enter Username" required />
    <input type="email" name="email" placeholder="Enter Email" required />
    <textarea name="bio" placeholder="Enter Bio"></textarea>
    <input type="text" name="profileImage" placeholder="Enter Profile Image URL" />
    <button type="submit">Create User</button>
</form>
```

---

### 🔹 **Step 3: Store User Data in MongoDB**  
We **post** the form data to **/create** and store it in our MongoDB database.  

📍 **Mongoose User Schema (`models/user.model.js`):**  
```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    bio: String,
    profileImage: String
});

const User = mongoose.model("User", userSchema);
module.exports = User;
```

📍 **Handling Form Submission in Express (`routes/userRoutes.js`)**  
```javascript
const User = require("../models/user.model");

app.post("/create", async (req, res) => {
    try {
        const { username, email, bio, profileImage } = req.body;
        await User.create({ username, email, bio, profileImage });
        res.redirect("/users");  // Redirect to users list after creation
    } catch (error) {
        res.status(500).send("Error creating user");
    }
});
```

---

### 🔹 **Step 4: Display All Users**  
We now **fetch all users** and display them as cards! 📜  

📍 **Fetching Users (`routes/userRoutes.js`)**  
```javascript
app.get("/users", async (req, res) => {
    const users = await User.find();  
    res.render("users", { users });  
});
```

📍 **EJS Template to Show Users (`views/users.ejs`)**  
```html
<% users.forEach(user => { %>
    <div class="card">
        <img src="<%= user.profileImage %>" alt="Profile" />
        <h2><%= user.username %></h2>
        <a href="/userDetails/<%= user._id %>">View Profile</a>
    </div>
<% }); %>
```

---

### 🔹 **Step 5: Show User Details**  
When clicking a user **card**, it redirects to **userDetails/:user_id** 📌  

📍 **Route for User Details (`routes/userRoutes.js`)**  
```javascript
app.get("/userDetails/:user_id", async (req, res) => {
    const user = await User.findById(req.params.user_id);
    res.render("userDetails", { user });
});
```

📍 **EJS Template for User Details (`views/userDetails.ejs`)**  
```html
<div class="profile">
    <img src="<%= user.profileImage %>" alt="Profile" />
    <h2><%= user.username %></h2>
    <p>Email: <%= user.email %></p>
    <p>Bio: <%= user.bio %></p>
</div>
```

---

## **🎯 Features Implemented Today**  
✅ **Form to Create Users**  
✅ **Store Users in MongoDB**  
✅ **Display Users as Cards**  
✅ **Click on User Card to View Full Profile**  

🚀 **Awesome Work! Keep Learning!** 💡🔥