import React, { useState, useEffect } from "react";

const App = (props) => {
  const [hide, setHide] = useState(false);

  const handleClick = () => {
    setHide(!hide);
  };

  return (
    <div>
      <h1>Hola mundo!</h1>
      <button onClick={handleClick}>{hide ? 'Show' : 'Hide'}</button>
      <ul>
        {!hide &&
          props.items.map((item) => <li key={item.id}>{item.label}</li>)}
      </ul>
    </div>
  );
};

App.defaultProps = {
  items: [{id: 1, label: 'item #1'}],
};

export default App;
