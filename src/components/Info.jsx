import React, { useContext } from "react";
import AppContext from "../context";

export const Info = ({ title, image, description }) => {
  const { setIsCartOpen } = useContext(AppContext);

  return (
    <div className="cart-empty">
      <img width={120} height={120} src={image} alt="Empty" />
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={() => setIsCartOpen(false)} className="greenButton">
        Back to shopping
      </button>
    </div>
  );
};
export default Info;
