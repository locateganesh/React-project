import { Link } from "react-router-dom";


const PRODUCTS = [
  { id: 'p1', title: 'Product 1'},
  { id: 'p2', title: 'Product 2'},
  { id: 'p3', title: 'Product 3'}
];

function Product() {
  return <>
    <h1>Products</h1>
    <Link to="/">Go to Home page</Link>

    <ul style={{marginTop: '2rem'}}>
      {PRODUCTS.map(item => (
        <li key={item.id}>
          {/* <Link to={`/products/${item.id}`}>{item.title}</Link> // Abolute path */}
          <Link to={`${item.id}`}>{item.title}</Link>
        </li>
      ))}
    </ul>
  </>
}

export default Product;