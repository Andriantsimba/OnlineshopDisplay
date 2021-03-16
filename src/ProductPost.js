import React,{Component} from 'react';
import Post from './Post';
import './style.css';
class ProductPost extends Component{
    state = {
        listProduct: []
      }
      componentDidMount() {
        fetch('https://fakestoreapi.com/products')
                .then(res=>res.json())
                .then(jsonResultApi=>{
                  this.setState({
                    listProduct: jsonResultApi
                  })
                })
      }
      render(){
    return (
        <div className="card" >
        <h3>All product</h3>
          {
            this.state.listProduct.map(product => {
              return<Post key={product.id} judul={product.title} price={product.price} />
            })
          }
        </div>
        );
    }
}

export default ProductPost;
