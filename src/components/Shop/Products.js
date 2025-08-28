import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {id: "p1", title: "My First Book", price: 6, description: "This is a first product - amazing!"},
  {id: "p2", title: "My Second Book", price: 8, description: "This is a first product - amazing!"},
  {id: "p3", title: "My Third Book", price: 10, description: "This is a first product - amazing!"},
  {id: "p4", title: "My Fourth Book", price: 12, description: "This is a first product - amazing!"},
];

const Products = () => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(product => (
          <ProductItem 
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
