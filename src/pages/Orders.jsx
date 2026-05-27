import { useContext, useEffect, useState } from "react";
import Card from "../components/card/Card";
import axios from "axios";
import AppContext from "../context";

function Orders() {
  const { onFavorite, onAddToCart } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://9142bae0e01c1c0a.mokky.dev/orders",
        );

        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Error to load orders!!!");
        console.log(error);
      }
    })();
  }, []);
  return (
    <div className="content">
      <div className="content__top">
        <h1>My orders</h1>
      </div>

      <ul className="cards">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card key={index} loading={isLoading} {...item} />
        ))}
      </ul>
    </div>
  );
}
export default Orders;
