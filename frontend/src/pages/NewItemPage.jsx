import { useFormik } from 'formik';
import SmartInput from '../components/UI/SmartInput';

const itemsObj = {
  id: 1,
  title: 'Book about HTML',
  description: 'Very important programing language. ',
  price: '10.99',
  rating: 3.5,
  stock: 50,
  cat_id: 1,
  img_url: 'https://picsum.photos/id/2/800/600',
};

export default function NewItemPage() {
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      rating: '',
      stock: '',
      cat_id: '',
      img_url: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className='container mx-auto'>
      <h1 className='text-3xl '>NewItemPage</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum voluptatibus, praesentium
        libero repellat officiis corporis esse iste totam reiciendis voluptatem!
      </p>

      <form>
        <SmartInput formik={formik} id='title' type='text' placeholder='Enter title' />
        <SmartInput formik={formik} id='description' type='text' placeholder='Enter description' />
        <SmartInput formik={formik} id='price' type='text' placeholder='Enter price' />
        <SmartInput formik={formik} id='rating' type='text' placeholder='Enter rating' />
        <SmartInput formik={formik} id='stock' type='text' placeholder='Enter stock' />
        <SmartInput formik={formik} id='cat_id' type='text' placeholder='Enter cat_id' />
        <SmartInput formik={formik} id='img_url' type='text' placeholder='Enter img_url' />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='button'>
          Add new item
        </button>
      </form>
    </div>
  );
}
