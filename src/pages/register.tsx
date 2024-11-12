import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useForm, SubmitHandler } from "react-hook-form"
import 'react-toastify/dist/ReactToastify.css';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const backToLogin = () => {
        navigate(`/signIn`);
    }

    type Inputs = {
        email: string
        username: string
        password: string
        confirm_password: string
    }

    type UserData = {
        email: string,
        username: string,
        password: string,
    }

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const userData: UserData = {
                email: data.email,
                username: data.username,
                password: data.password,
            }
            const response = await fetch('http://localhost:3000/user/register', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(userData),
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Server error');
            }

            const result = await response.json();
            console.log(result);
            toast.success('Account created successfully.', {
                position: 'top-right'
            })

        } catch (error) {
            console.error("Server: Failed request.");
            if (error instanceof Error) {
                toast.error(error.message, {
                    position: 'top-right',
                });
            } else {
                toast.error('An unexpected error occurred.', {
                    position: 'top-right',
                });
            }
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ email: "", username: "", password: "", confirm_password: "" });
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <>
            <ToastContainer />
            <div className="w-full max-w-xs mx-auto">
                <div className=" font-bold text-3xl mb-3 text-center">Sign-up</div>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Email</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" {...register("email", {
                            required: "This field is required",
                            pattern: {
                                value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
                                message: "Invalid email"
                            }
                        })} />
                        {errors.email && <div className='text-xs text-left mt-1 text-red-700'>{errors.email.message}</div>}
                    </div>

                    <div className="mb-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Username</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" {...register("username", {required: "This field is required"})} />
                        {errors.username && <div className='text-xs text-left mt-1 text-red-700'>{errors.username.message}</div>}
                    </div>

                    <div className="mb-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Password</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" {...register("password", {
                            required: "This field is required",
                            maxLength: {
                                value: 20,
                                message: "Password must be at most 20 characters long"
                            },
                            validate: (val: string) => {
                                if (watch('confirm_password') !== val) {
                                    return "Your password does no match";
                                }
                            }
                        })} />
                        {errors.password && <div className='text-xs text-left mt-1 text-red-700'>{errors.password.message}</div>}
                    </div>

                    <div className="mb-1">
                        <label className="block text-gray-700 text-sm font-bold mb-2 text-left">Confirm-Password</label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirm-password" type="password" {...register("confirm_password", {
                            required: "This field is required",
                            maxLength: {
                                value: 20,
                                message: "Password must be at most 20 characters long"
                            },
                            validate: (val: string) => {
                                if (watch('password') !== val) {
                                    return "Your password does no match";
                                }
                            }
                        })} />
                        {errors.confirm_password && <div className='text-xs text-left mt-1 text-red-700'>{errors.confirm_password.message}</div>}
                    </div>

                    <div className="flex flex-col justify-center mt-3 mx-auto">
                        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign Up
                        </button>
                        <a className="text-center mt-2 inline-block align-baseline font-italic text-sm text-blue-300 hover:text-blue-700 hover:underline" type='submit' onClick={backToLogin} style={{ cursor: 'pointer' }}>
                            Back
                        </a>
                    </div>
                </form>

                <p className="text-center text-gray-500 text-xs">&copy;2020 Acme Corp. All rights reserved.</p>
            </div>
        </>
    );
}