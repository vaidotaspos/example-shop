import axios from "axios";
import {baseBeUrl} from "../../helper.js";
import {useAuthContext} from "../../store/AuthCtxProvider.jsx";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export default function BuyItemButton({itemId, customerId}) {
    const navigate = useNavigate();
    const {token} = useAuthContext();

    // get user from Context api
    const buyItem = async () => {
        sendAxiosData({
            item_id: itemId,
            customer_id: customerId
        })
    };

    function sendAxiosData(data) {
        axios
            .post(`${baseBeUrl}orders`, data, {
                headers: {'Authorization': token}
            })
            .then((response) => {
                toast.success(response?.message || 'Order was created successfully!');
                navigate('/', {replace: true})
            })
            .catch((error) => {
                toast.error(error.response.data.error);
            });
    }

    // get item id from route params
    return (
        <button
            onClick={buyItem}
            className="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
            Buy Item
        </button>
    );
}
