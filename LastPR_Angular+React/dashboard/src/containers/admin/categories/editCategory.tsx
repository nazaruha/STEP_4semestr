import { FC, useEffect, useState } from 'react'
import classNames from 'classnames';
import { Formik, useFormik } from 'formik';
import { CategoryValidationSchema } from './yupValidation';
import { ICategory } from './types';
import { useActions } from '../../../hooks/useActions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditCategory: FC = () => {

    const navigate = useNavigate();

    const { EditCategory } = useActions();

    const categoryDataFromStorage = window.localStorage.editCategory;
    if (categoryDataFromStorage === null) {
        navigate("..");
    }
    const init: ICategory = {
        id: 0,
        name: "",
        description: ""
    }

    const [category, setCategory] = useState<ICategory>(init)

    useEffect(() => {
        const decodedCategory = JSON.parse(categoryDataFromStorage);
        setCategory({
            id: decodedCategory.id,
            name: decodedCategory.name,
            description: decodedCategory.description
        });

        init.id = decodedCategory.id;
        init.name = decodedCategory.name;
        init.description = decodedCategory.description;
    }, [])

    const onFormikSubmit = async (values: ICategory) => {
        console.log("values", values);
        try {
            EditCategory(values);
            navigate("..");
            toast.success("Category has been edited");
        } catch (err) {
            console.log("err", err);
            toast.error(`${err}`);
        }
    }

    const formik = useFormik({
        initialValues: category,
        onSubmit: onFormikSubmit,
        validationSchema: CategoryValidationSchema
    })

    const { values, touched, errors, handleSubmit, handleChange } = formik;

    return (
        <>
            <h1 className='text-center mt-5'>Edit Category</h1>

            <form onSubmit={handleSubmit} className='col-md-6 offset-md-3'>
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
                        onChange={handleChange}
                        aria-describedby="nameHelp"
                    />
                    {(errors.name && touched.name) && (
                        <div className="invalid-feedback">
                            <span>{errors.name}</span>
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        className={classNames(
                            "form-control",
                            { "is-invalid": errors.description && touched.description }
                        )}
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        aria-describedby="descriptionHelp"
                    />
                    {(errors.description && touched.description) && (
                        <div className='invalid-feedback'>
                            <span>{errors.description}</span>
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">
                    Edit
                </button>
            </form>
        </>
    )
}

export default EditCategory;