import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
function App() {
  return (
    <div className="wrapper">
      <Drawer />
      <Header />
      <div className="content">
        <div className="content__top">
          <h1>Все кроссовки</h1>
          <div className="search-block">
            <img width={14} height={14} src="img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <ul className="cards">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </ul>
      </div>
    </div>
  );
}

export default App;
