import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { ICategory } from '../categories/types';
import { ICourse } from './types';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { CourseValidationSchema } from './yupValidation';
import classNames from 'classnames';

const EditCourse: FC = () => {
    const navigate = useNavigate();

    const { CreateCourse, GetAllCategories } = useActions();
    const { allCategories } = useTypedSelector((state) => state.CategoryReducer);
    const [categories, setCategories] = useState<ICategory[]>([])

    const init: ICourse = {
        id: 0,
        title: "",
        description: "",
        price: 0,
        imagePath: "",
        categoryId: 0,
    }

    useEffect(() => {
        GetAllCategories();
        setCategories(allCategories);
    }, [])

    const onFormikSubmit = async (values: ICourse) => {
        console.log("values", values);
        try {
            CreateCourse(values);
            navigate("..");
            toast.success("Category has been created");
        } catch (err) {
            console.log("err", err);
            toast.error(`${err}`);
        }
    }

    const formik = useFormik({
        initialValues: init,
        onSubmit: onFormikSubmit,
        validationSchema: CourseValidationSchema
    })

    const { values, touched, errors, handleSubmit, handleChange } = formik;

    return (
        <>
            <h1 className='text-center mt-3'>Create Course</h1>

            <form onSubmit={handleSubmit} className='col-md-6 offset-md-3'>
                <div className="mb-3">
                    <label htmlFor='title' className="form-label">Title</label>
                    <input
                        type="text"
                        className={classNames(
                            'form-control',
                            { "is-invalid": (errors.title && touched.title) }
                        )}
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                    />
                    {(errors.title && touched.title) && (
                        <span className="invalid-feedback">{errors.title}</span>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        className={classNames(
                            'form-control',
                            { "is-invalid": (errors.description && touched.description) }
                        )}
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                    />
                    {(errors.description && touched.description) && (
                        <span className="invalid-feedback">{errors.description}</span>
                    )}
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor='price' className="form-label">Price</label>
                        <input
                            type="number"
                            className={classNames(
                                'form-control',
                                { "is-invalid": (errors.price && touched.price) }
                            )}
                            id="price"
                            name="price"
                            value={values.price}
                            onChange={handleChange}
                        />
                        {(errors.price && touched.price) && (
                            <span className="invalid-feedback">{errors.price}</span>
                        )}
                    </div>
                    <div className="col-md-6">
                        <label htmlFor='categoryId' className='form-label'>Category</label>
                        <select
                            className="form-select"
                            name="categoryId"
                            id="categoryId"
                        >
                            <option value="0" disabled selected>----</option>
                            {categories.map(item => (
                                <>
                                    {item.id == values.categoryId ? (
                                        <option value={item.id} selected>{item.name}</option>
                                    ) : (
                                        <option value={item.id}>{item.name}</option>
                                    )}
                                </>
                            ))}
                        </select>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </>
    )
}

export default EditCourse;