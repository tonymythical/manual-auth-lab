import { createUser, findUserByUsername } from "../services/user.service.js";
import bcrypt from 'bcrypt';

const loginPage = (req, res) => {
    res.render("login", {
        title: "Login",
        errors: req.query.errors || null
    });
};

const registerPage = (req, res) => {
    res.render("register", {
        title: "Register",
        errors: req.query.errors || null
    });
};

const register = async (req, res) => {
    const { username, password, confirm, role } = req.body;

    if (!username || !password ||!confirm) {
        return res.redirect("/register?errors=All fields required");
    }

    if (password !== confirm) {
        return res.redirect("/register?errors=Passwords do not match");
    }

    if (role !== "user" && role != "admin") {
        return res.redirect("/register?errors=Invalid role");
    }

    await createUser(username, password, role);
    res.redirect("/login");
};


const login = async (req, res) => {
    const { username, password } = req.body;

    const isMatch = await bcrypt.compare(req.body.password, user.password_hash);
    if (!isMatch) return res.status(401).send("Invalid credentials");

    const user = await findUserByUsername(username);

    if (!user || user.password !== password) {
        return res.redirect("/login?errors=Invalid credentials");
    }

    res.redirect("/dashboard");
};

export default { loginPage, registerPage, register, login };