import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const registerSchema = z.object({
  full_name: z.string({
    required_error: "Full name is required",
  }),
  email: z.string({
    required_error: "Email is required",
  }).email("Invalid email format"),
  
  password: z.string({
    required_error: "Password is required",
  }).min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string({
    required_error: "Email is requiredfdsdfs",  
  }).email("Invalid email format"),
  
  password: z.string({
    required_error: "Password is required",
  }).min(6, "Password must be at least 6 characters"),
});

export const validateRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await registerSchema.parseAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join(".") || "unknown",
        message: err.message,
      }));
      res.status(400).json({
        status: false,
        message: "Validation error",
        errors,
      });
    } else {
      res.status(500).json({
        status: false,
        message: "Internal server error",
      });
    }
  }
};


export const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await loginSchema.parseAsync(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error.errors.map((err) => ({
        field: err.path.join(".") || "unknown",
        message: err.message,
      }));
      res.status(400).json({
        status: false,
        message: "Validation error",
        errors,
      });
    } else {
      res.status(500).json({
        status: false,
        message: "Internal server error",
      });
    }
  }
};
