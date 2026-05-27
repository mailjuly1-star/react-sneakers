import { useState } from "react";
import Info from "../Info";

import axios from "axios";
import { useCart } from "../../hooks/useCart";
import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onClose, onRemove, items = [], opened }) => {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = useState(null);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://9142bae0e01c1c0a.mokky.dev/orders",
        { items: cartItems },
      );
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://9142bae0e01c1c0a.mokky.dev/cart/" + item.id,
        );
        await delay(1000);
      }
    } catch (error) {
      alert("Order error");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
        <h2>
          Basket{" "}
          <img
            className="cart-item__remove"
            width={25}
            height={25}
            src="img/btn-remove.svg"
            alt="close"
            onClick={onClose}
          />
        </h2>

        {items.length > 0 ? (
          <div className="basket-wrapper">
            {" "}
            <div className="items">
              {items.map((obj) => (
                <div key={obj.id} className="cart-item">
                  {/* <div
                style={{ backgroundImage: `url(${obj.imageUrl})` }}
                className="cart-item__image"
              ></div> */}
                  <img
                    width={70}
                    height={70}
                    src={obj.imageUrl}
                    // src="img/sneakers/sneakers-1.svg"
                    alt="sneakers"
                  />
                  <div className="cart-item__desc">
                    <p>{obj.title}</p>
                    <b>{obj.price} eur.</b>
                  </div>
                  <img
                    className="cart-item__remove"
                    width={25}
                    height={25}
                    src="img/btn-remove.svg"
                    alt="remove"
                    onClick={() => onRemove(obj.id)}
                  />
                </div>
              ))}
            </div>
            <div className="cart-total__block">
              <ul className="">
                <li className="cart-total__item">
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice}</b>
                </li>
                <li className="cart-total__item" l>
                  <span>Налог 21%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 21}</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className=" greenButton"
              >
                Оформить заказ
                <img src="img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Order is complete" : "Basket is empty"}
            description={
              isOrderComplete
                ? `Your order #${orderId} will be dispatched soon`
                : "Add 1 pair of sneakers to order"
            }
            image={
              isOrderComplete ? "img/completed-order.svg" : "img/empty-box.svg"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
