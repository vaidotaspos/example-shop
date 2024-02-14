import axios from "axios";
import {baseBeUrl} from "../../helper.js";
import {useAuthContext} from "../../store/AuthCtxProvider.jsx";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function BuyItemButton({itemId, customerId, itemStock}) {
    const navigate = useNavigate();
    const {token} = useAuthContext();

    const [quantity, setQuantity] = useState(1);

    const [max, setMax] = useState(itemStock);

    const buyItem = async () => {
        if (quantity > max) {
            toast.error('Item stock is too low!');
            return;
        }

        sendAxiosData({
            item_id: itemId,
            customer_id: customerId,
            quantity: parseInt(quantity)
        })
    };

    function sendAxiosData(data) {
        axios
            .post(`${baseBeUrl}orders`, data, {
                headers: {'Authorization': token}
            })
            .then((response) => {
                toast.success(response?.message || 'Order was created successfully!');
                navigate('/orders', {replace: true})
            })
            .catch((error) => {
                toast.error(error.response.data.error);
            });
    }

    return (
        <div className="">
            <input
                className='px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mr-3'
                type='number'
                min='1'
                max={max}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
            />
            <button
                onClick={buyItem}
                className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Buy Item
            </button>
        </div>
    );
}
