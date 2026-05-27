import { useState } from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import { useContext } from "react";

import AppContext from "../../context";

function Card({
  id,
  onFavorite,
  title,
  price,
  imageUrl,
  onPlus,
  favorited = false,

  loading = false,
}) {
  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);
  const obj = { id, parentId: id, title, price, imageUrl };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <li className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={0}
          width={150}
          height={250}
          viewBox="0 0 150 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="9" rx="10" ry="10" width="150" height="115" />
          <rect x="332" y="154" rx="0" ry="0" width="2" height="0" />
          <rect x="0" y="149" rx="5" ry="5" width="150" height="15" />
          <rect x="0" y="186" rx="5" ry="5" width="84" height="15" />
          <rect x="4" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="114" y="223" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.card__favorite} onClick={onClickFavorite}>
              <img
                width={13}
                height={13}
                src={isFavorite ? "img/liked.svg" : "img/unliked.svg"}
                alt="unliked"
              />{" "}
            </div>
          )}
          <img width="100%" height={112} src={imageUrl} alt="sneakers" />
          <h5>{title}</h5>

          <div className={styles.card__bottom}>
            <div className={styles.price}>
              <p>Цена:</p>
              <b>{price} eur.</b>
            </div>

            {onPlus && (
              <img
                className={styles.plus}
                width={20}
                height={20}
                src={
                  isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"
                }
                alt="plus"
                onClick={onClickPlus}
              />
            )}
          </div>
        </>
      )}
    </li>
  );
}

export default Card;
