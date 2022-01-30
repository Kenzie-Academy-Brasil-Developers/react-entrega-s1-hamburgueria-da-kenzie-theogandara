import { useState } from "react";
import "./reset.css";
import "./App.css";
import MenuContainer from "./components/MenuContainer";
import CartProduct from "./components/CartProduct";

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Hamburguer",
      category: "Sanduíches",
      price: 14.0,
      img: "https://i.ibb.co/fpVHnZL/hamburguer.png",
    },
    {
      id: 2,
      name: "X-Burguer",
      category: "Sanduíches",
      price: 16.0,
      img: "https://i.ibb.co/djbw6LV/x-burgue.png",
    },
    {
      id: 3,
      name: "Big Kenzie",
      category: "Sanduíches",
      price: 18.0,
      img: "https://i.ibb.co/FYBKCwn/big-kenzie.png",
    },
    {
      id: 4,
      name: "Fanta Guaraná",
      category: "Bebidas",
      price: 5.0,
      img: "https://i.ibb.co/cCjqmPM/fanta-guarana.png",
    },
    {
      id: 5,
      name: "Coca",
      category: "Bebidas",
      price: 4.99,
      img: "https://i.ibb.co/fxCGP7k/coca-cola.png",
    },
    {
      id: 6,
      name: "Fanta",
      category: "Bebidas",
      price: 4.99,
      img: "https://i.ibb.co/QNb3DJJ/milkshake-ovomaltine.png",
    },
  ]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentSale, setCurrentSale] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const [userInput, setUserInput] = useState("");
  const [userSearching, setUserSearching] = useState(false);

  // essa função compara o input do usuário com os nomes e as categorias do produto
  // usei o includes pra fazer essa verificação -> também mudo o state de searching pra true.

  const showProducts = () => {
    const newList = products.filter((element) => {
      return (
        element.name.toLowerCase().includes(userInput.toLowerCase()) ||
        element.category.toLowerCase().includes(userInput.toLowerCase())
      );
    });
    setFilteredProducts([...newList]);
    setUserSearching(true);
  };

  
  const handleClick = (productId) => {
    const found = products.find((element) => {
      return (
        element.id === productId && currentSale.every((e) => e.id !== productId)
      );
    });
    if (found === undefined) {
      return;
    }
    setCurrentSale((prevCurrentSale) => [...prevCurrentSale, found]);
    setCartTotal(
      currentSale.reduce((prevTotal, product) => {
        return product.price + prevTotal;
      }, found.price)
    );
  };

  const removeItem = (product) => {
    setCurrentSale(
      currentSale.filter((element) => {
        return product.id !== element.id;
      })
    );
    setCartTotal(cartTotal - product.price);
  };

  const removeAll = () => {
    setCurrentSale([]);
    setCartTotal(0);
  };

  return (
    <div className="App">
      <nav className="bar">
        <div className="title">Burguer Kenzie</div>
        <div className="search">
          <input
            type="text"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          <button className= "buttonPesquisar" onClick={showProducts}>Pesquisar</button>
        </div>
      </nav>
      <div className="conteudo">
        <main>
          <MenuContainer
            products={
              filteredProducts.length > 0 || userSearching
                ? filteredProducts
                : products
            }
            onProductClick={handleClick}
          />
        </main>
        <div className="carrinho">
          <div className="titleCarrinho">Carrinho de compras</div>

          <ul>
            {currentSale.map((element) => {
              return (
                <CartProduct
                  key={element.id}
                  onRemoveClick={removeItem}
                  product={element}
                />
              );
            })}
          </ul>
          <span>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(cartTotal)}
          </span>
          <div className="price">
            <button onClick={() => removeAll()}>Remover todos</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
