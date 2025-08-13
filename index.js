const express = require("express");
const app = express();
const port = 8080;
app.use(express.urlencoded({ extended: true }));
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [{
        id: "1a",
        username: "Amrutha",
        content: "hey this is my first post"
    },
    {
        id: "2a",
        username: "Amrutha",
        content: "hey this is my first post"
    },
    {
        id: "3a",
        username: "Amrutha",
        content: "hey this is my first post"
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    posts.push({ username, content });
    res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;

    let post = posts.find((p) => (id == p.id))

    res.render("post.ejs", { post });
})
app.listen(port, (req, res) => {
    console.log(`listening at port ${port}`);
});