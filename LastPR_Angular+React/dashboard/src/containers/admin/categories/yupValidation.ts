import * as yup from 'yup';

export const CategoryValidationSchema = yup.object({
    name: yup.string()
        .required("Name is required"),
    description: yup.string()
        .max(500, "Maximum characters is 500")
})