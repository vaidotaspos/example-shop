import {Link} from "react-router-dom";
import useApiData from "../../hooks/useApiData.js";
import {baseBeUrl} from "../../helper.js";
import axios from "axios";
import toast from "react-hot-toast";

export default function ItemListPage() {
    const [items, setItems] = useApiData(`${baseBeUrl}items`);

    function deleteItem(itemId) {
        axios
            .delete(`${baseBeUrl}items/${itemId}`)
            .then((response) => {
                toast.success(response?.message || `Item ID: ${itemId} successfully deleted!`);
                const list = items.filter(item => item.id !== itemId);
                setItems(list);
            })
            .catch((error) => {
                toast.error(error.response.data.error)
            })
    }

    return (
        <div className='container mx-auto'>
            <div className='float-right'>
                <Link
                    to='/items/create'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                    Sukurti
                </Link>
            </div>

            <h1 className='text-3xl text-center my-10'>Prekių sąrašas</h1>
            <div className='mt-5'>
                <table className='min-w-full table-auto'>
                    <thead className='bg-gray-500 text-white'>
                    <tr>
                        <th className='px-4 py-2'>ID</th>
                        <th className='px-4 py-2'>Pavadinimas</th>
                        <th className='px-4 py-2'>Kategorija</th>
                        <th className='px-4 py-2'>Kaina</th>
                        <th className='px-4 py-2'>Kiekis</th>
                        <th className='px-4 py-2'>Įvertinimas</th>
                        <th className='px-4 py-2'></th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((item) => (
                            <tr key={item.id} className='bg-gray-100'>
                                <td className='border px-4 py-2'>{item.id}</td>
                                <td className='border px-4 py-2'>{item.title}</td>
                                <td className='border px-4 py-2'>{item.category_name}</td>
                                <td className='border px-4 py-2'>{item.price}</td>
                                <td className='border px-4 py-2'>{item.stock}</td>
                                <td className='border px-4 py-2'>{item.rating}</td>
                                <td className='border px-4 py-2'>
                                    <Link
                                        to={`/items/edit/${item.id}`}
                                        className='bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded'
                                    >
                                        Redaguoti
                                    </Link>
                                    <button
                                        className='bg-red-500 hover:bg-red-400 text-white font-bold ml-2 py-2 px-4 rounded'
                                        onClick={() => deleteItem(item.id)}
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
