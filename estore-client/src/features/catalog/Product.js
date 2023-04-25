import React from 'react';
import endpoints from '../../api/endpoints';


const Product = ({ productId, image, title, price, brand, size, color }) => {
    return (
        <div
            className="border border-2 p-2 m-1 d-flex flex-column justify-content-between"
            style={{ width: 150 }}
        >
            <img
                className="img-fluid"
                src={
                    image ? `${endpoints.serverURL}/${image}` :
                        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                }
                style={{ height: 150 }}
            />
            <h4>
                 {title}
            </h4>
            <p>Brand:{brand}</p>
            <p>Price:Rs.{price}</p>
            <p>Size:{size}</p>
            <p>Color:{color}</p>
            <button>Add to Cart</button>
        </div>
    );
};

export default Product;