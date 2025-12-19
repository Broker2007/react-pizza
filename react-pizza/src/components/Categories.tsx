import React from "react";


type CategoriesProps = {
  filter: number;
  onClickFilter: (i:number) => void;
}
const Categories:React.FC<CategoriesProps> = ({ filter, onClickFilter }) => {
  const categories:string[] = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (<li
            key={i}
            onClick={() => onClickFilter(i)}
            className={filter == i ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
