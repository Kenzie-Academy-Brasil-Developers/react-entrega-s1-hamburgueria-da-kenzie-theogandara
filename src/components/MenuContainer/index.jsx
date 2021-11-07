import Product from "../Product";

const MenuContainer = ({ products, onProductClick }) => {
  return (
    <ul>
      {products.map((product) => {
        return <Product key={product.id} product={product} onProductClick={onProductClick}/>;
      })}
    </ul>
  );
};

export default MenuContainer;
