import { useContext } from "react";
import Card from "../components/card/Card";
import AppContext from "../context";

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onFavorite,
  onAddToCart,
  isLoading,
}) {
  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card
        key={index}
        onFavorite={(obj) => onFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        loading={isLoading}
        {...item}
      />
    ));
  };
  return (
    <div className="content">
      <div className="content__top">
        <h1>{searchValue ? `Поиск по: ${searchValue}` : "Все кроссовки"}</h1>
        <div className="search-block">
          <img width={14} height={14} src="img/search.svg" alt="Search" />
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
          {searchValue && (
            <img
              className="search-block__clear"
              width={15}
              height={15}
              src="img/btn-remove.svg"
              alt="clear"
              onClick={() => setSearchValue("")}
            />
          )}
        </div>
      </div>

      <ul className="cards">{renderItems()}</ul>
    </div>
  );
}
export default Home;
