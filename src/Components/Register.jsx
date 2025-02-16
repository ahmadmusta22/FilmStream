import { useState } from "react";

export default function Register() {
    const [userData, setUserData] = useState({
        email: "",
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [userDataErrors, setUserDataErrors] = useState({
        emailError: "",
        nameError: "",
        usernameError: "",
        passwordError: "",
        confirmPasswordError: "",
    });


    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            return "Email is required";
        } else if (!emailRegex.test(email)) {
            return "Invalid email format";
        }
        return "";
    };


    const validateName = (name) => {
        if (!name) {
            return "Name is required";
        } else if (name.length < 3) {
            return "Name must be at least 3 characters long";
        }
        return "";
    };


    const validateUsername = (username) => {
        const usernameRegex = /^\S+$/; // No spaces allowed
        if (!username) {
            return "Username is required";
        } else if (!usernameRegex.test(username)) {
            return "Username should not contain spaces";
        }
        return "";
    };


    const validatePassword = (password) => {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!password) {
            return "Password is required";
        } else if (!passwordRegex.test(password)) {
            return "Password must be at least 8 characters, with one lowercase letter, one uppercase letter, one digit, and one special character";
        }
        return "";
    };


    const validateConfirmPassword = (confirmPassword, password) => {
        if (!confirmPassword) {
            return "Confirm password is required";
        } else if (confirmPassword !== password) {
            return "Passwords do not match";
        }
        return "";
    };


    const handleData = (e) => {
        const { name, value } = e.target;


        setUserData({
            ...userData,
            [name]: value,
        });


        let error = "";
        if (name === "email") {
            error = validateEmail(value);
        } else if (name === "name") {
            error = validateName(value);
        } else if (name === "username") {
            error = validateUsername(value);
        } else if (name === "password") {
            error = validatePassword(value);
        } else if (name === "confirmPassword") {
            error = validateConfirmPassword(value, userData.password);
        }


        setUserDataErrors({
            ...userDataErrors,
            [`${name}Error`]: error,
        });
    };


    const submitData = (e) => {
        e.preventDefault();
        if (
            !userDataErrors.emailError &&
            !userDataErrors.nameError &&
            !userDataErrors.usernameError &&
            !userDataErrors.passwordError &&
            !userDataErrors.confirmPasswordError
        ) {
            console.log(userData);

        }
    };

    return (
        <div className="container mt-5 flex-grow-1 mb-5">
            <form onSubmit={submitData}>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleData}
                        className={`form-control ${userDataErrors.emailError
                            ? "is-invalid"
                            : userData.email && !userDataErrors.emailError
                                ? "is-valid"
                                : ""
                            }`}
                    />
                    {userDataErrors.emailError && (
                        <div className="invalid-feedback">{userDataErrors.emailError}</div>
                    )}
                </div>


                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleData}
                        className={`form-control ${userDataErrors.nameError
                            ? "is-invalid"
                            : userData.name && !userDataErrors.nameError
                                ? "is-valid"
                                : ""
                            }`}
                    />
                    {userDataErrors.nameError && (
                        <div className="invalid-feedback">{userDataErrors.nameError}</div>
                    )}
                </div>


                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleData}
                        className={`form-control ${userDataErrors.usernameError
                            ? "is-invalid"
                            : userData.username && !userDataErrors.usernameError
                                ? "is-valid"
                                : ""
                            }`}
                    />
                    {userDataErrors.usernameError && (
                        <div className="invalid-feedback">{userDataErrors.usernameError}</div>
                    )}
                </div>


                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleData}
                        className={`form-control ${userDataErrors.passwordError
                            ? "is-invalid"
                            : userData.password && !userDataErrors.passwordError
                                ? "is-valid"
                                : ""
                            }`}
                    />
                    {userDataErrors.passwordError && (
                        <div className="invalid-feedback">{userDataErrors.passwordError}</div>
                    )}
                </div>


                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={handleData}
                        className={`form-control ${userDataErrors.confirmPasswordError
                            ? "is-invalid"
                            : userData.confirmPassword && !userDataErrors.confirmPasswordError
                                ? "is-valid"
                                : ""
                            }`}
                    />
                    {userDataErrors.confirmPasswordError && (
                        <div className="invalid-feedback">{userDataErrors.confirmPasswordError}</div>
                    )}
                </div>


                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={
                        userDataErrors.emailError ||
                        userDataErrors.nameError ||
                        userDataErrors.usernameError ||
                        userDataErrors.passwordError ||
                        userDataErrors.confirmPasswordError
                    }
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
