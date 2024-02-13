import {useFormik} from 'formik';
import SmartInput from '../../components/UI/SmartInput';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';
import {baseBeUrl} from '../../helper';
import {useNavigate} from "react-router-dom";

export default function RegisterPage() {

  const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        validationSchema: Yup.object({
            firstname: Yup.string().min(3).required(),
            lastname: Yup.string().min(3).required(),
            email: Yup.string().email().min(3).required(),
            password: Yup.string().min(5).max(30).required(),
            passwordConfirm: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Password confirmation is required'),
        }),
        onSubmit: (values) => {
            sendAxiosData(values);
        },
    });

    function sendAxiosData(data) {
        axios
            .post(`${baseBeUrl}/auth/register`, data)
            .then((response) => {
                toast.success(response?.message || 'You have been registered');
                navigate('/login', {replace: true});
            })
            .catch((error) => {
                toast.error(error.response.data.error);
            });
    }

    return (
        <div className='container mx-auto'>
            <h1 className='text-3xl text-center my-10'>Registracijos puslapis</h1>
            <form onSubmit={formik.handleSubmit} className='mt-4' noValidate>
                <div className='mb-4'>
                    <SmartInput
                        id='firstname'
                        formik={formik}
                        type='text'
                        placeholder='Enter you firstname'
                    />
                </div>
                <div className='mb-4'>
                    <SmartInput
                        id='lastname'
                        formik={formik}
                        type='text'
                        placeholder='Enter you lastname'
                    />
                </div>
                <div className='mb-4'>
                    <SmartInput
                        id='email'
                        formik={formik}
                        type='email'
                        placeholder='Enter your email'
                    />
                </div>
                <div className='mb-4'>
                    <SmartInput
                        id='password'
                        formik={formik}
                        type='password'
                        placeholder='Enter your password'
                    />
                </div>
                <div className='mb-4'>
                    <SmartInput
                        id='passwordConfirm'
                        formik={formik}
                        type='password'
                        placeholder='Repeat your password'
                    />
                </div>
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    type='submit'>
                    Registruotis
                </button>
            </form>
        </div>
    );
}
