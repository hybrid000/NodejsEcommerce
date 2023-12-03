const express=require("express");
const router=express.Router();

router.get("/",(req, res)=>{
    res.render("index", { activePage: "Home"})
});

router.get("/seller", (req, res)=>{
    res.render("seller", { activePage: "Seller" })
});

router.get("/support", (req, res)=>{
    res.render("support", { activePage: "Support" })
});


module.exports=router;

