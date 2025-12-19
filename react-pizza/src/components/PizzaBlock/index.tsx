import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import {addCart, CartPizzaAdd, fetchCart} from "../../redux/Slices/CartSlice";
import { useAppDispatch } from "../../redux/store";
import PizzaCart from "../CartBlock/PizzaCart";
import {fetchPizzas} from "../../redux/Slices/PizzaSlice";
interface PizzaBlockArgs {
  name: string;
  price: number;
  types: number[];
  sizes: number[];
  imageUrl: string;
}
const PizzaBlock: React.FC<PizzaBlockArgs> = ({
  name,
  price,
  types,
  sizes,
  imageUrl,
}) => {
  const [countPizza, setCountPizza] = useState(0);
  const typesItems = ["тонкое ", "традиционное"];
  const [activePizzas, setActivePizzas] = useState(0);
  const [activeType, setActiveType] = useState(0);
  const dispatch = useAppDispatch();
  const getAddPizza = (
  name:string,
  price:number,
  imageUrl:string,
  types:string,
  sizes:number,
  ) => {
    dispatch(addCart({ name, price, types, sizes, imageUrl }));
  };
  useEffect(() => {
    dispatch(fetchCart());
  }, [countPizza]);

  return (
    <div className="container">
      <div className="pizza-center">
        <div className="pizza-block">
          <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
          <h4 className="pizza-block__title">{name}</h4>
          <div className="pizza-block__selector">
            <ul>
              {types.map((value, i) => (
                <li
                  key={i}
                  onClick={() => setActiveType(value)}
                  className={activeType == value ? "active" : ""}
                >
                  {typesItems[value]}
                </li>
              ))}
            </ul>
            <ul>
              {sizes.map((value, i) => (
                <li
                  key={i}
                  onClick={() => setActivePizzas(i)}
                  className={activePizzas == i ? "active" : ""}
                >
                  {value} см
                </li>
              ))}
            </ul>
          </div>
          <div className="pizza-block__bottom">
            <div className="pizza-block__price">от {price} ₽</div>
            <button
              onClick={() => {
                setCountPizza(countPizza + 1);
                getAddPizza(
                  name,
                  price,
                  imageUrl,
                  typesItems[activeType],
                  sizes[activePizzas]
                );
              }}
              className="button button--outline button--add"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Добавить</span>
              <i>{countPizza}</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
