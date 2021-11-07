const Product = ({ product, onProductClick }) => {
  return (
    <li>
      <img src={product.img} alt={product.name} />
      <h4>{product.name}</h4>
      <p>{product.category}</p>
      <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</span>
      <button onClick={() => onProductClick(product.id)}>Adicionar</button>
    </li>
  );
};

export default Product;
