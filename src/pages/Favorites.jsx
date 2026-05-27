import { useContext } from "react";
import Card from "../components/card/Card";
import AppContext from "../context";

function Favorites() {
  const { favorites, onFavorite } = useContext(AppContext);

  return (
    <div className="content">
      <div className="content__top">
        <h1>Favorites</h1>
      </div>

      <ul className="cards">
        {favorites.map((item) => (
          <Card
            key={item.title}
            favorited={true}
            onFavorite={onFavorite}
            {...item}
          />
        ))}
      </ul>
    </div>
  );
}
export default Favorites;
