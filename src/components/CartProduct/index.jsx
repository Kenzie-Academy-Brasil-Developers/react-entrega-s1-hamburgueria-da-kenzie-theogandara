const CartProduct = ({ product, onRemoveClick }) => {
    return (
      <li>
        <img src={product.img} alt={product.name} />
        {product.name}
        <button onClick={() => onRemoveClick(product)}>Remover</button>
      </li>
    );
  };
  
  export default CartProduct;
  