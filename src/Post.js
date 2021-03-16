import React from "react";

const Post= (props) =>{
    return(
        <div className="product">
            <div className="image-prod">
                <img src="http://placeimg.com/640/480/any" alt="productImage"/>
            </div>
            <div className="content">
                <div className="title"> Title: {props.judul}</div>
                <p className="price"> Price: {props.price}</p>
            </div>
        </div>
    );
}

export default Post;
