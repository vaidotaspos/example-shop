import SmartInput from "../../components/UI/SmartInput.jsx";
import {useFormik} from "formik";
import * as Yup from 'yup';
import axios from "axios";
import {baseBeUrl} from "../../helper.js";
import toast from "react-hot-toast";
import {Link, useNavigate, useParams} from "react-router-dom";
import useApiData from "../../hooks/useApiData.js";

export default function CategoryEditPage() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useApiData(`${baseBeUrl}categories/${id}`);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: category?.name || ''
        },
        validationSchema: Yup.object({
            name: Yup.string().min(3).max(128).required()
        }),
        onSubmit: (values) => {
            sendAxiosData(values);
        },
    });

    function sendAxiosData(data) {
        axios
            .put(`${baseBeUrl}categories/${id}`, data)
            .then((response) => {
                toast.success(response?.message || 'Category has been successfully updated!');
                navigate('/categories', {replace: true});
            })
            .catch((error) => {
                toast.error(error.response.data.error);
            });
    }

    return (
        <div className='container mx-auto'>
            <h1 className='text-3xl text-center my-10'>Kategorijos redagavimas</h1>
            <form onSubmit={formik.handleSubmit} className='mt-4' noValidate>
                <div className='mb-4'>
                    <SmartInput
                        id='name'
                        formik={formik}
                        type='text'
                        placeholder='Enter category name'
                    />
                </div>
                <div className='flex items-center justify-center mt-5'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='submit'>
                        Atnaujinti
                    </button>
                    <Link
                        to='/categories'
                        className='bg-gray-500 hover:bg-gray-400 ml-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                        Grįžti
                    </Link>
                </div>
            </form>
        </div>
    )
}
