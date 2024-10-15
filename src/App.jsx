import "./style.css";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import iconCart from "./img/compras-online.png";
import iconVerificate from "./img/verificar.png";
import { IconsManifest } from "react-icons";

function App() {
  const [api, setApi] = useState([]);
  const [cart, setCart] = useState([]);
  const [buyCart, setBuyCart] = useState([]);
  const [contCart, setContCart] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  const [modalBuy, setModalBuy] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://api.mercadolibre.com/sites/MLB/search?q=iphone"
        );
        setApi(res.data.results);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    treatArray();
  }, [api]); // agora trata a array quando a API é atualizada

  useEffect(() => {
    contTotal(); // recalcula o total sempre que o buyCart é alterado
  }, [buyCart]);

  // Funções

  const treatArray = () => {
    const newArray = api.map((item) => ({
      title: item.title,
      price: item.price,
      thumbnail: item.thumbnail,
      score: createScore(),
      quantity: 1,
    }));

    setCart(newArray);
  };

  const createScore = () => {
    const score = (Math.random() * 1 + 4).toFixed(2);
    return parseFloat(score);
  };

  const addCart = (item) => {
    if (modalBuy == true) {
      setModalBuy(false);
    }
    const verificarArray = buyCart.some(
      (itemNew) => itemNew.title === item.title
    );
    if (!verificarArray) {
      setBuyCart([...buyCart, item]);
      contarCarrinho();
    }
  };

  const contarCarrinho = () => {
    setContCart(contCart + 1);
  };

  const openModal = () => {
    setShowModal(!showModal);
  };

  const deleteProduct = (index) => {
    const newArray = [...buyCart];
    newArray.splice(index, 1);
    setBuyCart(newArray);
    setContCart(contCart - 1);
  };

  const incrementProduct = (action, index) => {
    const newArray = [...buyCart];
    if (action === "add") {
      newArray[index].quantity += 1;
    }

    if (action === "decrease" && newArray[index].quantity > 1) {
      newArray[index].quantity -= 1;
    }

    setBuyCart(newArray);
  };

  const contTotal = () => {
    let total = 0;
    buyCart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalCart(total);
  };

  const btnBuy = () => {
    const newArray = [];
    setBuyCart(newArray);
    setContCart(0);
    setModalBuy(true);
  };

  return (
    <div>
      <Header totalCart={contCart} openModal={() => openModal()} />
      <div className="content">
        {cart.map((item, key) => (
          <Card
            key={key}
            thumbnail={item.thumbnail}
            title={item.title}
            price={item.price}
            score={item.score}
            functionBtn={() => addCart(item)}
          />
        ))}
      </div>

      <div className={showModal ? "modal-cart" : "modal-cart-hiden"}>
        <button className="modal-exit" onClick={() => openModal()}>
          X
        </button>

        <h1 className="modal-card-title">Carrinho</h1>

        <div className="modal-cards">
          {modalBuy && (
            <div className="modal-card-buy">
              <img src={iconVerificate} />
              <h1>Compra Realizada</h1>
            </div>
          )}
          {buyCart.length === 0 && (
            <div className="modal-card-null">
              <img src={iconCart} />
              <h1>Carrinho vazio</h1>
            </div>
          )}
          {buyCart.map((item, key) => (
            <div className="modal-card" key={key}>
              <div className="modal-img">
                <img src={item.thumbnail} alt={item.title} />
                <div className="modal-title">
                  <h1>{item.title}</h1>
                </div>
              </div>

              <div className="modal-price">
                <div className="modal-container-price">
                  <span className="price">
                    R$
                    {item.price.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="modal-price-btns">
                  <button
                    className="modal-"
                    onClick={() => incrementProduct("decrease", key)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="modal--"
                    onClick={() => incrementProduct("add", key)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="modal-delete">
                <button onClick={() => deleteProduct(key)}>
                  <MdDelete className="btn-delete" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <h1 className="modal-total-cart">
          Total: R$
          {totalCart.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </h1>
        <button className="modal-btn-buy" onClick={() => btnBuy()}>
          Comprar
        </button>
      </div>
    </div>
  );
}

export default App;
