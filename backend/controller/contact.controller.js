
import { z } from 'zod';
import Contact from '../model/contact.model.js';

const contactSchema = z.object({
    name: z.string().trim().regex(/^[a-zA-Z\s]+$/, { message: "Username can only contain letters" }).min(3, { message: "Name must contain 3 letters" }),
    email: z.email({ message: "Invalid email address" }),
    message: z.string().trim().regex(/^[a-zA-Z\s]+$/, { message: "Feedback should be valid" }).min(20, { message: "Atleast 20letter for feedback" })
})

export const feedback = async (req, res) => {

    const { name, email, message } = req.body;

    try {
        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const safeSchema = contactSchema.safeParse({name, email, message});
        if (!safeSchema.success) {
            const errorMessages = safeSchema.error.issues.map(err => err.message);
            return res.status(400).json({ errors: errorMessages });
        }
        const newContact = new Contact({
            name,
            email,
            message
        })
        await newContact.save();

        return res.status(200).json({
            message:"Feedback submitted successfully",
        });

    }
    catch (error) {
        console.log(error);
    }
}