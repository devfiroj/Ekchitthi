const express=require("express")
const app=express()
const cookieParser=require("cookie-parser")
const path=require("path")
const expressSession=require("express-session");

const indexRouter=require("./routes/index");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret: "secret",
    })
);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine","ejs");

app.use("/",indexRouter);


app.listen(3000);