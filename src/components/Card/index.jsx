import "./styles.css";
import { FaStar } from "react-icons/fa";

function Card({ thumbnail, price, title, score, functionBtn }) {
  return (
    <div className="card">
      <div className="card-img">
        <img src={thumbnail} />
      </div>
      <div className="card-content">
        <div className="card-title">
          <h1>{title}</h1>
          <span>
            R${" "}
            {price.toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="card-btn">
          <div className="card-score">
            <FaStar className="icon-star" />
            <span>{score}</span>
          </div>

          <button onClick={() => functionBtn()}>Adicionar ao Carrinho</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
