import express from "express";
import authCtl from "../controllers/auth.controller.js";
import pageCtl from "../controllers/page.controller.js";
import { isLoggedIn, hasRole } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/", pageCtl.homePage);

router.get("/login", authCtl.loginPage);
router.post("/login", authCtl.login);

router.get("/register", authCtl.registerPage);
router.post("/register", authCtl.register);

router.get('/dashboard', (req, res) => {
    // 1. Check your terminal for this!
    console.log("--- Request User Object ---");
    console.log(req.user); 
    console.log("----------------------------");

    // 2. Check if user is logged in
    if (!req.user) {
        return res.redirect('/login'); 
    }

    // 3. Render the dashboard view
    res.render('dashboard', { 
        title: 'Dashboard',
        user: req.user 
    });
});

router.get("/admin", isLoggedIn, hasRole("admin"), pageCtl.adminPage);

export default router;