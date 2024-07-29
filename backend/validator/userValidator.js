import z from "zod";

export const signupInputs = z.object({
    username: z.string().min(3, { message: "Username must be more than 3 character long"}).max(30, { message: "Username must be less than 30 character long"}),
    email: z.string().email({ message: "Invalid email address"}),
    password: z.string().min(6, { message: "Password must be 6 character long"}),
    profilePicture: z.string().optional()
});

export const signinInputs = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min( 6, { message: "Password must be 6 character long" })
});

export const updateEmail = z.object({
    email: z.string().email({ message: "Invalid email address" })
});

export const updatePassword = z.object({
    password: z.string().min( 6, { message: "Password must be 6 character long"})
});

export const updateUserIcon = z.object({
    profilePicture: z.string()
});