import User from "../models/User.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import pkg from 'bcryptjs';
const { hashSync } = pkg;

//registration
export const signup = async (req, res) => {
    const { name, password, hated } = req.body;

    if (!name || !password || !hated) {
        return res.status(422).json({ error: "empty fields!" });
    }

    try {
        const userExists = await User.findOne({ name: name });
        if (userExists) {
            return res.status(422).json({ error: "User already exists!" });
        }

        const hashedPassword = pkg.hashSync(password);
        const user = new User({ name, password: hashedPassword, hated });
        const userRegister = await user.save();

        if (userRegister) {
            res.status(201).json({ message: "user registered successfully!" });
        } else {
            res.status(422).json({ error: "Registration failed" });
        }
    } catch (err) {
        console.log(err);
    }
};

//login
export const login = async (req, res) => {
    try {
        const { name, password } = req.body;

        if (!password || !name) {
            res.status(400).json({ message: "fields empty!" });
        }

        const userLogin = await User.findOne({ name: name }) //has entire document

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            if (isMatch) {

                console.log(userLogin);

                const token = await userLogin.generateAuthToken();
                console.log(token);
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });
                //   res.cookie("test", 'val');
                res.status(201).json({ message: "logged in!", userId: userLogin._id, token: token });
            }
            else {
                res.status(400).json({ message: "pwd incorrect!" });
            }
        }
        else {
            return res.status(400).json({ message: "user does not exist !" });
        }

    } catch (err) {
        console.log(err);
    }
}

//logout
export const logout = async (req, res) => {
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).json({ message: "user logged out" });
}

//getUserDetails
// export const callUserDetails = async (req, res) => {
//     res.send(req.rootUser);
// }

