import {z} from "zod";

const signupSchema = z.object({
    username: z
    .string({required_error: "Username is required."})
    .trim()
    .min(5, {message: "Username is alteast 5 chars."})
    .max(100, {message: "Username is not more than 100 chars."}),
    email: z
    .string({required_error: "Email is required."})
    .trim()
    .email({message: "Invalid Email Address."})
    .min(5, {message: "Email is alteast 5 chars."})
    .max(100, {message: "Email is not more than 100 chars."}),
    fullname: z
    .string({required_error: "Fullname is required."})
    .trim()
    .min(5, {message: "Fullname is alteast 5 chars."})
    .max(100, {message: "Fullname is not more than 100 chars."}),
    password: z
    .string({required_error: "Password is required."})
    .trim()
    .min(8, {message: "Password is alteast 8 chars."})
    .max(20, {message: "Password is not more than 20 chars."})
});

const signinSchema = z.object({
  email: z
  .string({required_error: "Email Address is required."})
  .trim()
  .email({message: "Invalid Email Address."})
  .min(5, {message: "Email is atleast 5 chars."})
  .max(100, {message: "Email is not more than 100 chars."}),
  password: z
  .string({required_error: "Password is required."})
  .trim()
  .min(8, {message: "Password is atleast 8 chars."})
  .max(20, {message: "Password is not more than 20 chars."})
});

export { signinSchema, signupSchema };