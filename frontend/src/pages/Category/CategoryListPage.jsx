import {Link} from "react-router-dom";
import useApiData from "../../hooks/useApiData.js";
import {baseBeUrl} from "../../helper.js";
import axios from "axios";
import toast from "react-hot-toast";

export default function CategoryListPage() {
    const [categories, setCategories] = useApiData(`${baseBeUrl}categories`);

    function deleteCategory(categoryId) {
        axios
            .delete(`${baseBeUrl}categories/${categoryId}`)
            .then((response) => {
                toast.success(response?.message || `Category ID: ${categoryId} successfully deleted!`);
                const list = categories.filter(category => category.id !== categoryId);
                setCategories(list);
            })
            .catch((error) => {
                toast.error(error.response.data.error)
            })
    }

    return (
        <div className='container mx-auto'>
            <div className='float-right'>
                <Link
                    to='/categories/create'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                    Sukurti
                </Link>
            </div>

            <h1 className='text-3xl text-center my-10'>Kategorijų sąrašas</h1>
            <div className='mt-5'>
                <table className='min-w-full table-auto'>
                    <thead className='bg-gray-500 text-white'>
                    <tr>
                        <th className='px-4 py-2'>ID</th>
                        <th className='px-4 py-2'>Pavadinimas</th>
                        <th className='px-4 py-2'></th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((category) => (
                            <tr key={category.id} className='bg-gray-100'>
                                <td className='border px-4 py-2'>{category.id}</td>
                                <td className='border px-4 py-2'>{category.name}</td>
                                <td className='border px-4 py-2'>
                                    <Link
                                        to={`/categories/edit/${category.id}`}
                                        className='bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded'
                                    >
                                        Redaguoti
                                    </Link>
                                    <button
                                        className='bg-red-500 hover:bg-red-400 text-white font-bold ml-2 py-2 px-4 rounded'
                                        onClick={() => deleteCategory(category.id)}
                                    >
                                        Ištrinti
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
