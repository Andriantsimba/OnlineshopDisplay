import React,{Component} from 'react';
import Post from './Post';
import './style.css';
class Shoes extends Component{
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
        <div class="post-shoes" >
        <h3>Shoes</h3>
          {
            this.state.listProduct.map(product => {
              return<Post judul={product.title} price={product.price} />
            })
          }
        </div>
        );
    }
}

export default Shoes;
