import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false); 

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <div className="container mt-5 flex-grow-1 mb-5">
            <h2 className="text-center mb-4">Login now:</h2>

            <form onSubmit={formik.handleSubmit}>
               
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={(e) => {
                            formik.handleChange(e);
                            formik.setFieldTouched('email', true);
                        }}
                        onBlur={formik.handleBlur}
                        className={`form-control ${
                            formik.errors.email && formik.touched.email
                                ? 'is-invalid'
                                : formik.values.email && !formik.errors.email
                                ? 'is-valid'
                                : ''
                        }`}
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                    )}
                </div>

                
                <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={(e) => {
                            formik.handleChange(e);
                            formik.setFieldTouched('password', true);
                        }}
                        onBlur={formik.handleBlur}
                        className={`form-control ${
                            formik.errors.password && formik.touched.password
                                ? 'is-invalid'
                                : formik.values.password && !formik.errors.password
                                ? 'is-valid'
                                : ''
                        }`}
                    />
                    {formik.errors.password && formik.touched.password && (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                    )}
                    
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="btn btn-outline-secondary position-absolute top-0 end-0 mt-1 me-2"
                        style={{ border: 'none' }}
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>

               
                <button type="submit" className="btn btn-success w-100">
                    Submit
                </button>
            </form>
        </div>
    );
}


