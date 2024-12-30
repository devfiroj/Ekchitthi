const express=require("express");
const router=express.Router();
const userModel = require("../models/user-model");


router.get("/", async function (req, res) {
    const userId = req.cookies.userId;

    try {
        if (!userId) {
            // Render the index page for a new user (no messages)
            res.render("index", {
                messages: [],
                link: null, // No link yet
            });
        } else {
            // Fetch user details and messages from the database
            const user = await userModel.findById(userId);

            if (!user) {
                // Handle case where userId cookie exists but user not found in DB
                res.clearCookie("userId"); // Clear the invalid cookie
                return res.render("index", {
                    messages: [],
                    link: null,
                });
            }

            // Render the index page with messages and generated link
            const uniqueLink = `${req.protocol}://${req.get("host")}/messages/${user._id}`;
            res.render("index", {
                messages: user.letters, // Pass user's messages to the template
                link: uniqueLink,
            });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send("An error occurred. Please try again later.");
    }
});

router.post("/generatelink", async (req, res) => {
    const { fullname } = req.body;
    if (!fullname || fullname.trim() === "") {
        return res.status(400).send("Name is required.");
    }

    try {
        // Create a new user in the database
        const newUser = await userModel.create({ fullname: fullname });

        // Set a cookie with the MongoDB `_id`
        res.cookie("userId", newUser._id,{
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.redirect("/");
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("An error occurred. Please try again later.");
    }
});

router.get("/messages/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by ID
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        // Render the message form
        res.render("message1", {
            recipientName: user.fullname,
            userId: user._id,
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send("An error occurred. Please try again later.");
    }
});

router.post("/messages/:userId/send", async (req, res) => {
    const { userId } = req.params;
    const { sender, msg } = req.body;

    if (!msg || msg.trim() === "") {
        return res.status(400).send("Message cannot be empty.");
    }

    try {
        // Find the user by ID
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).send("User not found.");
        }

        // Add the new message to the user's letters array
        user.letters.push({ msg: msg.trim(), sender: sender || "Someone" });
        await user.save();

        // Redirect back to a success page or the recipient's messages
        return res.status(200).send("ok");
        //res.redirect(`/`);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).send("An error occurred. Please try again later.");
    }
});


module.exports=router;