import z from "zod";

export const signupInputs = z.object({
    username: z.string().min(3, { message: "Username must be more than 3 charter long"}).max(30, { message: "Username must be less than 30 charter long"}),
    email: z.string().email({ message: "Invalid email address"}),
    password: z.string().min(6, { message: "Password must be 6 charter long"}),
    profilePicture: z.string().optional()
});

export const signinInputs = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min( 6, { message: "Password must be 6 charter long" })
});