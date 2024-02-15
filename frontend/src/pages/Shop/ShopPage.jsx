import useApiData from '../../hooks/useApiData';
import {useAuthContext} from '../../store/AuthCtxProvider.jsx';
import {baseBeUrl} from "../../helper.js";
import BuyItemButton from "../../components/UI/BuyItemButton.jsx";
import ProductStarRating from "../../components/UI/ProductStarRating.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import {useState, useEffect} from "react";

export default function ShopPage() {
    const [itemsArr, setItemsArr] = useApiData(`${baseBeUrl}items`);

    const [itemRatings, setItemRatings] = useState([]);

    const {token, isUserLoggedIn, userId} = useAuthContext();

    const handleRating = (id, rating) => {
        if (itemRatings.find((itemRating) => itemRating.item_id === id)) {
            return;
        }

        axios
            .post(`${baseBeUrl}item-ratings`,
                {
                    item_id: id,
                    customer_id: userId,
                    rating: rating
                },
                {
                    headers: {'Authorization': token}
                })
            .then((response) => {
                toast.success(response?.message || 'Item rating was successfully added!');
                setItemRatings([...itemRatings, {
                    item_id: id,
                    rating: rating
                }])

            })
            .catch((error) => {
                toast.error(error.response.data.error);
            });
    };

    useEffect(() => {
        if (isUserLoggedIn) {
            const customerItemsRatings = async () => {
                await axios
                    .get(`${baseBeUrl}item-ratings/customer/${userId}`, {
                        headers: {'Authorization': token}
                    })
                    .then((response) => {
                        setItemRatings(response.data);
                    })
                    .catch((error) => {
                        toast.error(error.response.data.error);
                    });
            }

            customerItemsRatings();
        }
    }, []);



    return (
        <div className='container bg-slate-300'>
            <h1 className='text-3xl '>ShopPage</h1>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum voluptatibus, praesentium
                libero repellat officiis corporis esse iste totam reiciendis voluptatem!
            </p>

            <div className='grid grid-cols-3 gap-4 p-3'>
                {itemsArr.map((item) => (
                    <div key={item.id}>
                        <img src={item.img_url} alt={item.title}/>
                        <h2><span className='font-bold'>Pavadinimas:</span> {item.title}</h2>
                        <p><span className='font-bold'>Aprašymas:</span> {item.description}</p>
                        <p><span className='font-bold'>Kaina:</span> {item.price}</p>
                        <p><span className='font-bold'>Įvertinimas:</span> {Math.round(item.average_rating * 100) / 100} ({item.rating_count})</p>
                        { isUserLoggedIn && (
                            <div>
                                <ProductStarRating
                                    rating={itemRatings.find((itemRating) => itemRating.item_id === item.id)?.rating}
                                    onRating={(rating) => handleRating(item.id, rating)}
                                />
                            </div>
                        )}
                        <p><span className='font-bold'>Likutis:</span> {item.stock}</p>
                        <p><span className='font-bold'>Kategorija:</span> {item.category_name}</p>
                        {
                            isUserLoggedIn ? item.stock > 0 ?
                                <BuyItemButton
                                    itemId={item.id}
                                    customerId={userId}
                                    itemStock={item.stock}
                                />
                             : <p className='mt-4 text-center'><span className='font-bold'>OUT OF STOCK</span></p> : ''
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}
