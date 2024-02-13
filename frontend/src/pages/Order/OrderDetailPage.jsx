import useApiData from "../../hooks/useApiData.js";
import {Link, useParams} from "react-router-dom";
import {baseBeUrl} from "../../helper.js";

export default function OrderDetailPage() {
    const {id} = useParams();
    const [order, setOrder] = useApiData(`${baseBeUrl}orders/${id}`, [], '/orders');

    return (
        <div className='container mx-auto'>
            <div className='float-right'>
                <Link
                    to='/orders'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                    Grįžti
                </Link>
            </div>
            <h1 className='text-3xl text-center my-10'>Užsakymas Nr. {order.id}</h1>

            <div className='border p-4'>
                <h2 className='text-xl text-center my-3 font-bold uppercase'>Pirkėjo informacija</h2>
                <p><span
                    className='font-bold'>Pirkėjas:</span> {order.customer_firstname + ' ' + order.customer_lastname}
                </p>
                <p><span className='font-bold'>El. paštas: </span>{order.customer_email}</p>
            </div>
            <div className='mt-5 p-4 border'>
                <h2 className='text-xl text-center my-3 font-bold uppercase'>Krepšelio informacija</h2>
                <div className='grid grid-cols-3 gap-4 p-3'>
                    <div className='border p-3'>
                        <img src={order.item_img} alt={order.item_title}/>
                        <h2><span className='font-bold'>Pavadinimas:</span> {order.item_title}</h2>
                        <p><span className='font-bold'>Vnt. Kaina:</span> {order.price}</p>
                        <p><span className='font-bold'>Kiekis:</span> {order.qty}</p>
                    </div>
                </div>
                <div className='text-2xl text-right my-3 underline mr-6'>
                    <p><span className='font-bold'>Užsakymo suma:</span> {order.total}</p>
                </div>
            </div>
        </div>
    );
}
