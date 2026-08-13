
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend server is running!");
});

app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    console.log("Received contact form data:");
    console.log(req.body);

    res.status(200).json({
        success: true,
        message: "Contact form submitted successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});