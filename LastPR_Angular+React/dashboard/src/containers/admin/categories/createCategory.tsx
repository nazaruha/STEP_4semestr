import { FC, useState } from 'react'
import { useFormik } from 'formik';
import { CategoryValidationSchema } from './yupValidation';
import { ICategory } from './types'
import classNames from 'classnames';
import { useActions } from '../../../hooks/useActions';

const CreateCategory: FC = () => {
    const { CreateCategory } = useActions();

    const category: ICategory = {
        name: "",
        description: ""
    }

    const onFormikSubmit = async (values: ICategory) => {
        console.log("Formik data", values);
        const newCategory: ICategory = {
            id: 0,
            name: values.name,
            description: values.description
        }
        console.log("newCategory", newCategory);
        try {
            CreateCategory(values);
            values.name = "";
            values.description = "";
        } catch (err) {
            console.log("err", err);
        }
    }

    const formik = useFormik({
        initialValues: category,
        onSubmit: onFormikSubmit,
        validationSchema: CategoryValidationSchema
    });

    const { values, touched, errors, handleSubmit, handleChange, setFieldValue, setFieldError } = formik;

    return (
        <>
            <h1 className='text-center'>Create Category</h1>
            <form onSubmit={handleSubmit} className='col-md-6 offset-md-3'>
                <div className='row'>
                    <div className='col-lg-12'>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className={classNames(
                                    "form-control",
                                    { "is-invalid": errors.name && touched.name }
                                )}
                                id="name"
                                name="name"
                                value={values.name}
                                aria-describedby="name"
                                onChange={handleChange}
                            />
                            {(errors.name && touched.name) && (
                                <div id="validationCategoryNameErrorFeedback" className="invalid-feedback">
                                    <span>{errors.name}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className="form-floating">
                            <textarea
                                className={classNames(
                                    "form-control",
                                    { "is-invalid": errors.description && touched.description }
                                )}
                                placeholder="Leave a comment here"
                                id="description"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                            />
                            <label htmlFor="description">Description</label>
                            {(errors.description && touched.description) && (
                                <div id="validationCategoryDescriptionErrorFeedback" className="invalid-feedback">
                                    <span>{errors.description}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div
                        className='col-12 mt-3'
                        style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <button
                            type="submit"
                            className='btn btn-primary w-50'
                            style={{
                                fontSize: 25
                            }}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default CreateCategory;