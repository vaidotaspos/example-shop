import {useFormik} from 'formik';
import * as Yup from 'yup';
import SmartInput from '../components/UI/SmartInput';
import toast from 'react-hot-toast';
import axios from 'axios';
import {baseBeUrl} from '../helper';
import {useAuthContext} from '../store/AuthCtxProvider';
import {useNavigate} from 'react-router-dom';

export default function LoginPage() {
    const {login} = useAuthContext();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: 'vaidotas@bit.lt',
            password: 'password',
        },
        validationSchema: Yup.object({
            email: Yup.string().email().min(3).required(),
            password: Yup.string().min(5).max(30).required(),
        }),
        onSubmit: (values) => {
            sendAxiosData(values);
        },
    });

    function sendAxiosData(data) {
        axios
            .post(`${baseBeUrl}/auth/login`, data)
            .then((response) => {
                login(data.email, response.data.token);
                navigate('/shop', {replace: true});
                toast.success(response.data?.message || 'Welcome');
            })
            .catch((error) => {
                toast.error(error.response.data.error);
            });
    }

    return (
        <div className='container mx-auto'>
            <h1 className='text-3xl text-center my-10'>Kliento prisijungimas</h1>
            <p className='text-justify my-10'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum voluptatibus, praesentium
                libero repellat officiis corporis esse iste totam reiciendis voluptatem!
            </p>
            <form onSubmit={formik.handleSubmit} className='mt-4' noValidate>
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
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    type='submit'>
                    Prisijungti
                </button>
            </form>
        </div>
    );
}
