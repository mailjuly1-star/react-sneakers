

function Card() {return(
	<li className="card">
  <div className="card__favorite">
    <img width={13} height={13} src="img/unliked.svg" alt="unliked" />
  </div>
  <img
    width={133}
    height={112}
    src="img/sneakers/sneakers-1.svg"
    alt="sneakers"
  />
  <h5>Мужские кроссовки Nike</h5>

  <div className="card__bottom">
    <div className="card__price">
      <p>Цена:</p>
      <b>12 999 eur.</b>
    </div>
    <button className="button">
      <img width={11} height={11} src="img/btn-plus.svg" alt="plus" />
    </button>
  </div>
</li>
)

}



export default Card;