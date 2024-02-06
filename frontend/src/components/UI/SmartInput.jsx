function SmartInput({ id, formik, type = 'text', readOnly = false, placeholder = '' }) {
  // id = title

  const areaInput = (
    <textarea
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[id]}
      placeholder={placeholder}
      className='w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 '
      id={id}
      rows='3'></textarea>
  );

  return (
    <>
      <label className='w-full '>
        <span className='block'>{id.charAt(0).toUpperCase() + id.slice(1)}</span>

        {type === 'textarea' ? (
          areaInput
        ) : (
          <input
            disabled={readOnly}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[id]}
            placeholder={placeholder}
            type={type}
            className='w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 '
            id={id}
          />
        )}
      </label>
      {formik.touched[id] && formik.errors[id] && (
        <p className='text-red-500 '>{formik.errors[id]}</p>
      )}
    </>
  );
}

export default SmartInput;
