import useApiData from '../hooks/useApiData';
import {useAuthContext} from '../store/AuthCtxProvider.jsx';
import {baseBeUrl} from "../helper.js";
import BuyItemButton from "../components/UI/BuyItemButton.jsx";

export default function ShopPage() {
    const [itemsArr, setItemsArr] = useApiData(`${baseBeUrl}items`);

    const {isUserLoggedIn, userId} = useAuthContext();

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
                        <h2>title: {item.title}</h2>
                        <p>description: {item.description}</p>
                        <p>price: {item.price}</p>
                        <p>rating: {item.rating}</p>
                        <p>stock: {item.stock}</p>
                        <p>cat_id: {item.cat_id}</p>
                        {
                            isUserLoggedIn && (
                                <BuyItemButton
                                    itemId={item.id}
                                    customerId={userId}
                                />
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}
