import useApiData from '../../hooks/useApiData';
import {useAuthContext} from '../../store/AuthCtxProvider.jsx';
import {baseBeUrl} from "../../helper.js";
import BuyItemButton from "../../components/UI/BuyItemButton.jsx";

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
                        <h2><span className='font-bold'>Pavadinimas:</span> {item.title}</h2>
                        <p><span className='font-bold'>Aprašymas:</span> {item.description}</p>
                        <p><span className='font-bold'>Kaina:</span> {item.price}</p>
                        <p><span className='font-bold'>Įvertinimas:</span> {item.rating}</p>
                        <p><span className='font-bold'>Likutis:</span> {item.stock}</p>
                        <p><span className='font-bold'>Kategorija:</span> {item.category_name}</p>
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
