import React, { useState, useEffect } from "react";
import Axios from "axios";

const App = (props) => {
  const [hide, setHide] = useState(false);
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     const result = await Axios.get("http://localhost:4000/posts/");
  //     const posts = result.data;
  //     setItems(posts);
  //   })();
  // }, []);

  const handleClick = () => {
    setHide(!hide);
  };

  return (
    <div>
      <h1>Hola mundo!</h1>
      <button onClick={handleClick}>{hide ? "Show" : "Hide"}</button>
      <ul>
        {!hide && props.items.map((item) => <li key={item.id}>{item.label}</li>)}
      </ul>
    </div>
  );
};

App.defaultProps = {
  items: [],
};

export default App;
