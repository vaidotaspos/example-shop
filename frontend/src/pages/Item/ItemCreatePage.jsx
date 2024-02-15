import {useFormik} from "formik";
import * as Yup from "yup";
import SmartInput from "../../components/UI/SmartInput.jsx";
import {Link, useNavigate} from "react-router-dom";
import Select from "react-select";
import {baseBackendUrl, baseBeUrl} from "../../helper.js";
import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {useAuthContext} from "../../store/AuthCtxProvider.jsx";

export default function ItemCreatePage() {
    const [categoriesOptions, setCategoriesOptions] = useState([""]);
    const [itemImagePreview, setItemImagePreview] = useState('');

    const {token} = useAuthContext()

    const navigate = useNavigate();

    useEffect(() => {
        const getOptionData = async () => {
            const optionsArray = [];
            await axios
                .get(`${baseBeUrl}categories`, {
                    headers: {'Authorization': token}
                })
                .then((response) => {
                    let result = response.data;
                    result.map((category) => {
                        return optionsArray.push({value: category.id, label: category.name})
                    });
                    setCategoriesOptions(optionsArray)
                })
        };

        getOptionData();
    }, []);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            cat_id: '',
            price: '',
            stock: '',
            rating: '',
            file: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().min(3).max(255).required(),
            description: Yup.string().optional(),
            cat_id: Yup.number().min(1).required(),
            price: Yup.string().required(),
            stock: Yup.number().required(),
            rating: Yup.number().optional(),
            file: Yup.mixed().optional()
        }),
        onSubmit: (values) => {
            sendAxiosData(values);
        },
    });

    function sendAxiosData(data) {
        //console.log('DATA === ', data);
        axios
            .post(`${baseBeUrl}items`, data, {
                headers: {
                    'Authorization': token,
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((response) => {
                toast.success(response?.message || 'Item has been successfully created!');
                navigate('/items', {replace: true});
            })
            .catch((error) => {
                toast.error(error.response.data.error);
            });
    }

    // Custom handler for file input to set the file within Formik's state
    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            if (file) {
                formik.setFieldValue('file', file);

                const reader = new FileReader();
                reader.onloadend = () => {
                    setItemImagePreview(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleDeleteImage = () => {
        formik.setFieldValue('file', '');
        setItemImagePreview('');
    };

    return (
        <div className='container mx-auto'>
            <h1 className='text-3xl text-center my-10'>Prekės sukūrimas</h1>
            <form onSubmit={formik.handleSubmit} className='mt-4' noValidate>
                <div className='mb-4'>
                    <label
                        htmlFor='cat_id'
                        className='w-full mt-5'
                    >
                        Category
                    </label>
                    <Select
                        className='w-full rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                        name='cat_id'
                        id='cat_id'
                        options={categoriesOptions}
                        placeholder='Select Category'
                        onBlur={formik.handleBlur}
                        onChange={(option) => formik.setFieldValue('cat_id', +option.value)}
                    />
                    {formik.touched['cat_id'] && formik.errors['cat_id'] && (
                        <p className='text-red-500 '>{formik.errors['cat_id']}</p>
                    )}
                    <SmartInput
                        id='title'
                        formik={formik}
                        type='text'
                        placeholder='Enter item title'
                    />
                    <SmartInput
                        id='description'
                        formik={formik}
                        type='textarea'
                        placeholder='Enter item description'
                    />
                    <SmartInput
                        id='price'
                        formik={formik}
                        type='text'
                        placeholder='Enter item description'
                    />
                    <SmartInput
                        id='stock'
                        formik={formik}
                        type='text'
                        placeholder='Enter item stock'
                    />
                    <SmartInput
                        id='rating'
                        formik={formik}
                        type='text'
                        placeholder='Enter item rating'
                    />
                    <div className='mt-5'>
                        {(formik.values['img_url'] || itemImagePreview) && (
                            <div className="p-5 border mb-5">
                                <p className="font-bold">Image Preview</p>
                                <img src={formik.values['img_url'] ? baseBackendUrl + formik.values['img_url'] : itemImagePreview} alt="Profile Preview" style={{width: '200px'}}/>
                                <button
                                    type="button"
                                    onClick={handleDeleteImage}
                                    className="bg-red-500 hover:bg-red-400 text-white font-bold ml-2 py-2 px-4 rounded"
                                >
                                    Delete Image
                                </button>
                            </div>
                        )}

                        <label htmlFor="file" className='w-full mt-5'>
                            <span className='block'>File upload</span>
                            <input
                                name="file"
                                type="file"
                                onChange={handleFileChange}
                                className='w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                                accept="image/*"
                                id="file"/>
                        </label>
                        {formik.touched['file'] && formik.errors['file'] && (
                            <p className='text-red-500 '>{formik.errors['file']}</p>
                        )}
                    </div>

                </div>
                <div className='flex items-center justify-center mt-5'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        type='submit'>
                        Sukurti
                    </button>
                    <Link
                        to='/categories'
                        className='bg-gray-500 hover:bg-gray-400 ml-3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                        Grįžti
                    </Link>
                </div>
            </form>
        </div>
    );
}
