import "./styles.css";
import logo from "../../img/logodidi.png";
import { BsCart2 } from "react-icons/bs";
import { FaSearchDollar } from "react-icons/fa";
function Header({ totalCart, openModal }) {
  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <img src={logo} />
        </div>
        <div className="input-header">
          <input type="text" placeholder="Busque seu produto!" />{" "}
          <button className="btn-search">
            <FaSearchDollar className="icon-search" />
          </button>
        </div>
        <div className="cart">
          <BsCart2 className="icon-cart" onClick={() => openModal()} />
          <div className={totalCart == 0 ? "circle-cart-none" : "circle-cart"}>
            <span>{totalCart}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
