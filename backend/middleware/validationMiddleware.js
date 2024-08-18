const { z } = require('zod');

const validateRegistration = (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    try {
        const signupSchema = z.object({
            username: z.string().min(2).regex(/^[a-zA-Z]+$/, { message: 'Name must contain only letters.' }),
            email: z.string().email({ message: 'Invalid email format.' }),
            password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
            confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
        });

        const validationResult = signupSchema.safeParse({ username, email, password, confirmPassword });

        if (!validationResult.success) {
            throw new Error(validationResult.error.errors[0].message);
        }

        next(); // Proceed if validation passes

    } catch (error) {
        console.log("VALIDATE ERROR MESSAGE", error.message)
        res.status(400).json({ error: error.message });
    }
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    try {

        const loginSchema = z.Schema({
            email: z.string().email({ message: "Invalid email format" }),
        })
        const validationResult = loginSchema.safeParse({ username });

        if (!validationResult.success) {
            throw new Error(validationResult.error.errors[0].message);
        }

        next(); // Proceed if validation passes


    }
    catch (error) {
        console.log("VALIDATE ERROR MESSAGE", error.message);
        res.status(400).json({ error: error.message });
    }


}

const validateAddress = (req, res, next) => {
    const addressData = req.body.address;
    try {

        const addressSchema = z.Schema({
            streetOne: z.string().min(6).regex(/^[a-zA-Z]+$/, { message: 'Password must be at least 6 characters long.' }),
            streetTwo: z.string().min(6).regex(/^[a-zA-Z]+$/, { message: 'Password must be at least 6 characters long.' }),
            city: z.string({ message: 'Password must be at least 6 characters long.' }),
            pincode: z.number({ message: 'Password must be at least 6 characters long.' }),
            contactNumber: z.number({ message: "Enter a number" }),
            altContactNumber: z.number({ message: "Enter a number" })


        });

        const validationResult = addressSchema.safeParse(
            addressData.streetOne,
            addressData.streetTwo,
            addressData.city,
            addressData.pincode,
            addressData.contactNumber, 
            addressData.altContactNumber
        );
        if (!validationResult.success) 
        {
            throw new Error(validationResult.error.errors[0].message);
        }

        next();
    }
    catch (error) {

        console.log("VALIDATE ERROR MESSAGE", error.message);
        res.status(400).json({ error: error.message });
    }

}




module.exports = { validateRegistration, validateLogin, validateAddress };
