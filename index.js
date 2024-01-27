const express = require("express");
const connectDB = require("./connection");
const path = require("path");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middleware/auth");

//static route to render home page
const staticRouter = require("./routes/staticRouter");
const urlRouter = require("./routes/url");
const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

connectDB("mongodb://localhost:27017/short-url")
    .then(() => console.log("MongoDB Connected!")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRouter);
app.use("/user", userRouter);
app.use("/", staticRouter);

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server started at PORT:${PORT}`);
});