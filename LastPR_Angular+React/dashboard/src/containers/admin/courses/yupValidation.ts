import * as yup from 'yup';

export const CourseValidationSchema = yup.object({
    title: yup.string()
        .required("Title is required"),
    description: yup.string()
        .max(500, "Maximum characters is 500")
        .required("Description is required"),
    price: yup.number()
        .min(1, "Price must be more than 0"),
    categoryId: yup.number()
        .min(1, "Choose Category")
})