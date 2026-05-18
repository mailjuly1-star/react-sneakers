const Drawer = () => {
  return (
    <div className="overlay" style={{ display: "none" }}>
      <div className="drawer">
        <h2>
          Basket{" "}
          <img
            className="cart-item__remove"
            width={25}
            height={25}
            src="img/btn-remove.svg"
            alt="remove"
          />
        </h2>
        <div className="items">
          <div className="cart-item">
            <img
              width={70}
              height={70}
              src="img/sneakers/sneakers-1.svg"
              alt="sneakers"
            />
            <div className="cart-item__desc">
              <p>Мужские кроссовки Nike</p>
              <b>12 999 eur.</b>
            </div>
            <img
              className="cart-item__remove"
              width={25}
              height={25}
              src="img/btn-remove.svg"
              alt="remove"
            />
          </div>
          <div className="cart-item">
            <img
              width={70}
              height={70}
              src="img/sneakers/sneakers-1.svg"
              alt="sneakers"
            />
            <div className="cart-item__desc">
              <p>Мужские кроссовки Nike</p>
              <b>12 999 eur.</b>
            </div>
            <img
              className="cart-item__remove"
              width={25}
              height={25}
              src="img/btn-remove.svg"
              alt="remove"
            />
          </div>
        </div>
        <div className="cart-total__block">
          <ul className="">
            <li className="cart-total__item">
              <span>Итого:</span>
              <div></div>
              <b>21 498 eur.</b>
            </li>
            <li className="cart-total__item" l>
              <span>Налог 21%:</span>
              <div></div>
              <b>1074 eur.</b>
            </li>
          </ul>
          <button className=" greenButton">
            Оформить заказ
            <img src="img/arrow.svg" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
