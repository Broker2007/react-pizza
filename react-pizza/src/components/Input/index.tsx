import React, {useContext} from "react";
import styles from "./Input.module.scss";
import srcClose from "../../assets/2703079_close_delete_exit_x_icon.svg";
import {useDispatch, useSelector} from "react-redux";
import {setSearch} from "../../redux/Slices/FilterSlice";
import {RootState, useAppDispatch} from "../../redux/store";


type InputProps = {
    src:string
}
const Input:React.FC<InputProps> = ({src}) => {
    const {search} = useSelector((state:RootState) => state.filter)
    const dispatch = useAppDispatch()
  return (
    <div className={styles.root}>
      <img className={styles.img} src={src} />
      <input
        onChange={(event) => dispatch(setSearch(event.target.value))}
        value={search}
        placeholder="Поиск..."
        className={styles.input}
      />
      {search && (
        <img
          onClick={() => dispatch(setSearch(''))}
          className={styles.imgClose}
          src={srcClose}
        />
      )}
    </div>
  );
}

export default Input;
