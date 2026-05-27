import React, { useState } from "react";
import { Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Drawer from "./components/drawer/Drawer";
import Header from "./components/Header";
import AppContext from "./context";
import Orders from "./pages/Orders";

// const arr = [
// {
//   title: "Мужские Кроссовки Nike Blazer Mid Suede",
//   price: "12999",
//   imageUrl: "img/sneakers/sneakers-1.svg",
// },
// {
//   title: "Women Кроссовки Nike Air Max 270",
//   price: "200",
//   imageUrl: "img/sneakers/sneakers-2.svg",
// },
// {
//   title: "men Кроссовки Nike Air Max 270",
//   price: "100",
//   imageUrl: "img/sneakers/sneakers-3.svg",
// },
// ];

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    //при первом рендере страницы выполняется функция, которая делает запрос на сервер и получает данные, которые мы потом сохраняем в стейт items,чтобы не было бесконечного цикла рендеров
    // fetch("https://6a0c4f435aa893e1015b8263.mockapi.io/items")
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((json) => {
    //     setItems(json);
    //   });
    async function fetchData() {
      try {
        const [cartResponse, favResponse, itemsResponse] = await Promise.all([
          axios.get("https://9142bae0e01c1c0a.mokky.dev/cart"),
          axios.get("https://9142bae0e01c1c0a.mokky.dev/favorites"),
          axios.get("https://9142bae0e01c1c0a.mokky.dev/items"),
        ]);
        // const cartResponse = await axios.get(
        //   "https://9142bae0e01c1c0a.mokky.dev/cart",
        // );

        // const favResponse = await axios.get(
        //   "https://9142bae0e01c1c0a.mokky.dev/favorites",
        // );

        // const itemsResponse = await axios.get(
        //   "https://9142bae0e01c1c0a.mokky.dev/items",
        // );
        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Error loading data");
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // const onAddToCart = (obj) => {
  //   if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
  //     axios.delete(`https://9142bae0e01c1c0a.mokky.dev/cart/${obj.id}`);
  //     setCartItems((prev) =>
  //       prev.filter((item) => Number(item.id) !== Number(obj.id)),
  //     );
  //   } else {
  //     axios.post("https://9142bae0e01c1c0a.mokky.dev/cart", obj);
  //     setCartItems((prev) => [...prev, obj]);
  //   }
  // };
  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id),
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id)),
        );
        await axios.delete(
          `https://9142bae0e01c1c0a.mokky.dev/cart/${findItem.id}`,
        );
      } else {
        const { data } = await axios.post(
          "https://9142bae0e01c1c0a.mokky.dev/cart",
          obj,
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert("Error add to basket");
      console.log(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://9142bae0e01c1c0a.mokky.dev/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id)),
      );
    } catch (error) {
      alert("Error remove the item");
      console.log(error);
    }
  };

  const onFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://9142bae0e01c1c0a.mokky.dev/favorites/${obj.id}`);
        setFavorites((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id)),
        );
      } else {
        const { data } = await axios.post(
          "https://9142bae0e01c1c0a.mokky.dev/favorites",
          obj,
        );

        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не удалось добавить в фавориты");
      console.log(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        onAddToCart,
        onFavorite,
        setIsCartOpen,
        setCartItems,
      }}
    >
      <div className="wrapper">
        <Drawer
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onRemove={onRemoveItem}
          opened={isCartOpen}
        />

        <Header onClickCart={() => setIsCartOpen(true)} />

        <Route path="/" exact>
          <Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onFavorite={onFavorite}
            onAddToCart={onAddToCart}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/favorites" exact>
          <Favorites />
        </Route>
        <Route path="/orders" exact>
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
}

export default App;
