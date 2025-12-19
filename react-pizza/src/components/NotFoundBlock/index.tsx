import React from "react";

import styles from "./NotFoundBlock.module.scss";
const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span className={styles.block}>:(</span>
        Ничего не найдено:/
      </h1>
      <p className={styles.discription}>Вернитесь обратно</p>
    </div>
  );
}

export default NotFoundBlock;
