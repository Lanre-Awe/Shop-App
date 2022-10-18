import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const dummy = [
  {
    id: 1,
    title: "Test",
    price: 6,
    description: "This is a first product - amazing!",
  },
  {
    id: 2,
    title: "lanre buttocks",
    price: 3,
    description: "This is product is amazing!",
  },
  {
    id: 3,
    title: "lanre hair",
    price: 2,
    description: "This is a great product",
  },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {dummy.map((list) => {
          return <ProductItem key={list.id} listItem={list} />;
        })}
      </ul>
    </section>
  );
};

export default Products;
