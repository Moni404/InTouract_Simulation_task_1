import { useState } from "react";

function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            setResponseMessage(data.message);

            if (response.ok) {
                setFormData({
                    name: "",
                    email: "",
                    message: ""
                });
            }

        } catch (error) {
            setResponseMessage("Unable to connect to the server.");
        }
    };

    return (
        <div className="contact-container">

            <h1>Contact Us</h1>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />
                </div>

                <div className="form-group">
                    <label>Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Enter your message"
                        rows="6"
                    />
                </div>

                <button
                    type="submit"
                    className="submit-button"
                >
                    Submit
                </button>

            </form>

            {responseMessage && (
                <p className="response-message">
                    {responseMessage}
                </p>
            )}

        </div>
    );
}

export default ContactForm;