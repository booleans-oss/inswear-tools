import { useEffect, useState } from "react";
import axios from "axios";

const ItemsInput = () => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const url =
    "https://alchimistes.fr/accueil/2749-trucker-sweat-shirt-pique-col-zippe-homme-k206.html";

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAddItem = () => {
    setItems([...items, inputValue]);
    setInputValue("");
  };

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleAddItem}>Add Item</button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemsInput;
