import React, { useCallback, useEffect } from "react";

import Categories from "../Categories";
import Sorting from "../Sorting";
import Skeleton from "../PizzaBlock/Skeleton";
import PizzaBlock from "../PizzaBlock";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../../redux/Slices/FilterSlice";
import { fetchPizzas } from "../../redux/Slices/PizzaSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchCart } from "../../redux/Slices/CartSlice";
axios.defaults.headers.post["Content-Type"] = "application/json";

const Home: React.FC = (props) => {
  const { categoryId, sort, search } = useSelector(
    (state: RootState) => state.filter
  );
  const type = sort.sortProperty;
  const dispatch = useAppDispatch();
  const { items, status } = useSelector((state: RootState) => state.pizza);

  const onChangeCategoryId = (id: number) => {
    dispatch(setCategoryId(id));
  };
  useCallback(() => {
    dispatch(fetchCart());
  }, []);
  useEffect(() => {
    dispatch(fetchPizzas({ categoryId, type, search }));
  }, [type, categoryId, search]);

  return (
    <>
      <div className="content__top">
        <Categories filter={categoryId} onClickFilter={onChangeCategoryId} />
        <Sorting />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "loading"
          ? [...new Array(2)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj._id} {...obj} />)}
      </div>
    </>
  );
};

export default Home;
