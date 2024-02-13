import useApiData from "../../hooks/useApiData.js";
import {baseBeUrl, dateTimeOptions} from "../../helper.js";

export default function OrderListPage() {
    const [orders, setOrders] = useApiData(`${baseBeUrl}orders`);

    return (
        <div className="container mx-auto">
            <h1 className='text-3xl text-center my-10'>Užsakymų sąrašas</h1>
            <div className='mt-5'>
                <table className='min-w-full table-auto'>
                    <thead className='bg-gray-500 text-white'>
                    <tr>
                        <th className='px-4 py-2'>ID</th>
                        <th className='px-4 py-2'>Pirkėjas</th>
                        <th className='px-4 py-2'>Suma</th>
                        <th className='px-4 py-2'>Sukūrimo data</th>
                        <th className='px-4 py-2'></th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map((order) => (

                            <tr key={order.id} className='bg-gray-100'>
                                <td className='border px-4 py-2'>{order.id}</td>
                                <td className='border px-4 py-2'>{order.customer}</td>
                                <td className='border px-4 py-2'>{order.total}</td>
                                <td className='border px-4 py-2'>{(new Date(order.created_at)).toLocaleString('lt-LT', dateTimeOptions)}</td>
                                <td className='border px-4 py-2'>
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
