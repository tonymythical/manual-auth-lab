import express from "express";
import authCtl from "../controllers/auth.controller.js";
import pageCtl from "../controllers/page.controller.js";

const router = express.Router();

router.get("/", pageCtl.homePage);

router.get("/login", authCtl.loginPage);
router.post("/login", authCtl.login);

router.get("/register", authCtl.registerPage);
router.post("/register", authCtl.register);

router.get('/dashboard', (req, res) => {
    console.log("--- Request User Object ---");
    console.log(req.user); 
    console.log("----------------------------");

    if (!req.user) {
        return res.redirect('/login'); 
    }

    res.render('dashboard', { 
        title: 'Dashboard',
        user: req.user 
    });
});

router.get("/admin", pageCtl.adminPage);

export default router;