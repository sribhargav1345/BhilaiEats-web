import React, { useState, useEffect, useRef } from 'react';

export default function Food_User(props) {

    const [formData, setFormData] = useState({ qty: 1, size: "" });

    const dispatch = useDispatchCart();
    const data = useCart();
    const priceRef = useRef();

    useEffect(() => {
        if (priceRef.current && !formData.size) {
            setFormData(prevState => ({ ...prevState, size: priceRef.current.value }));
        }
    }, [formData.size]);

    const handleSizeChange = (e) => {
        setFormData(prevState => ({ ...prevState, size: e.target.value }));
    };

    const increaseQty = () => {
        setFormData(prevState => ({ ...prevState, qty: prevState.qty + 1 }));
    };

    const decreaseQty = () => {
        setFormData(prevState => ({ ...prevState, qty: Math.max(prevState.qty - 1, 0) }));
    };

    const handleAddtoCart = async () => {

        const selected_food = data.find(item => item.id === props._id);

        if (selected_food) {
            const size_cmp = data.find(item => item.size === props.size);

            if (size_cmp) {
                dispatch({ type: "UPDATE", id: props._id, price: calculateFinalPrice(), qty: formData.qty });
            }
            else {
                dispatch({ type: 'ADD', id: props._id, name: props.foodName, price: calculateFinalPrice(), qty: formData.qty, size: formData.size });
            }
        }
        else {
            dispatch({ type: 'ADD', id: props._id, name: props.foodName, price: calculateFinalPrice(), qty: formData.qty, size: formData.size });
        }
    };

    const calculateFinalPrice = () => {
        const selectedOption = options.find(option => option.size === formData.size);
        const price = selectedOption ? selectedOption.price : options[0]?.price || 0;
        return formData.qty * parseInt(price);
    };

    const options = props.options || {};

    return (
        <div>
            <div className='card mt-3 rounded'>

                <img src={props.ImgSrc} className='card-img-top' alt="Img not available" />

                <div className='card-body'>
                    <h5 className='card-title'>{props.foodName}</h5>

                    <div className='container w-100'>

                        <button className='h-50 bg-success rounded' onClick={decreaseQty}> - </button>
                        <div className='m-2 d-inline h-100 fs-6'> {formData.qty} </div>
                        <button className='h-50 bg-success rounded mr-4' onClick={increaseQty}> + </button>

                        <select ref={priceRef} className="m-2 h-100 bg-rgb(241, 245, 249) rounded" value={formData.size} onChange={handleSizeChange}>
                            {options.map((option, index) => (
                                <option key={index} value={option.size}>
                                    {option.size}
                                </option>
                            ))}
                        </select>

                        <div className='d-inline h-100 fs-6'> Rs.{calculateFinalPrice()} </div>
                        <div>
                            <hr />
                            <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}