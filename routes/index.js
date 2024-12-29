const express=require("express");
const router=express.Router();
//const isloggedin=require("../middlewares/isLoggedIn");
//const productModel = require("../models/product-model");
//const userModel = require("../models/user-model");
//const orderModel=require("../models/order-model");


router.get("/",function(req,res){
    res.send("Hello World");
})

router.post("/",function(req,res){
    //cookie check




})

module.exports=router;