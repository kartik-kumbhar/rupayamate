import { ZodError } from "zod";

export const validate = (schema) => async (req, res, next) => {
    try {
        req.body = await schema.parseAsync(req.body);
        next();
    } catch (error) {
        const status = 422;
        const message = "Fill the input properly";
        const extraDetail = error.issues[0].message;


        const err = {
            status,
            message,
            extraDetail
        };
        console.log(err)

        next(err);
        // if (error instanceof ZodError && Array.isArray(error.errors)) {
        //     errors: error.errors.map(e => e.message);
        //     const message = error.errors[0].message;
        //     console.error("Validation error:", message);

        //     return res.status(400).json({
        //         message: error.errors[0].message,
        //     });
        // }
       


    }
};

