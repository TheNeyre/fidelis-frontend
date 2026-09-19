import styles from "./component.module.scss";
import { useState, useEffect } from "react";
import { Car } from "./interfaces";

export const AutoList: React.FC<{
  list: Car[],
  isError: boolean,
  isLoading: boolean
  }> = ({list, isError , isLoading }) => {

    const defaultCar : Car = {
      id: 1,
      brand: "Brand",
      model: "model",
      year: 2026,
      gearbox: "АКПП",
      mileage: 100,
      engineFuelType: "АИ-92",
      engineVolume: 10,
      enginePower: 100,
      vrc: "original",
      steeringWheel: "left",
      price: 100000000,
      loanPrice: 1000000,
    }

  const AutomobileCard: React.FC<{data: Car}> = ({data}) => ( <div className={styles.automobileCard}>
    <div className={styles.cardImageBlock}>
      <div className={styles.characteristic}>
        <div>Коробка: <span className={styles.characteristicValue}>{data.gearbox}</span></div>
        <div>Год выпуска: <span className={styles.characteristicValue}>{data.year}</span></div>
        { !!data.mileage && ( <div>Пробег: <span className={styles.characteristicValue}>{data.mileage}</span></div> ) }
        <div>Тип топлива: <span className={styles.characteristicValue}>{data.engineFuelType}</span></div>
        <div>Объём: <span className={styles.characteristicValue}>{data.engineVolume}</span></div>
        <div>Мощность: <span className={styles.characteristicValue}>{data.enginePower}</span></div>
        <div>ПТС: <span className={styles.characteristicValue}>{data.vrc=="original"?"оригинал":"копия"}</span></div>
        <div>Положение руля: <span className={styles.characteristicValue}>{data.steeringWheel=="left"?"левый":"правый"}</span></div>
      </div>
      <div className={styles.cardGradient}/>
      <img src={`/imgs/cars/${data.id}.png`} alt={`car-${data.id}`} className={styles.cardImage}/>
    </div>
    <div className={styles.carTitle}>
      <span className={styles.brand}>{data.brand}</span>
      <span className={styles.model}>{data.model}</span>
    </div>
    <div className={styles.priceBlock}>
      <div className={styles.prices}>
        <div className={styles.normalPrice}>{`${data.price}`}<img src="/icons/ruble.svg" alt="rubble-icon" className={styles.rubleIcon}/></div>
        { data.loanPrice != 0 && ( <div className={styles.loanPrice}>{`${data.loanPrice}`}<img src="/icons/ruble.svg" alt="rubble-icon" className={styles.rubleIcon}/></div> )}
      </div>
      <a href="/#form" className={styles.buyButton}>{"Связаться"}</a>
    </div>
  </div> );

  return ( <div className={styles.autoListContainer}>
    { isError && ( <div className={styles.error}> {"Возникла ошибка при загрузке"} </div> )}
    { isLoading && ( <div className={styles.loading}> {"Загрузка"} </div> ) }
    { !isError && !isLoading && !list.length && ( <div className={styles.empty}>{"Ничего не найдено"}</div> ) }
    { !isError && !isLoading && !!list.length &&  ( <div className={styles.autoList}>
      {list.map((carData, index) => (<AutomobileCard data={carData} key={`auto-${index}`}/>))}
    </div> ) }
  </div> )
}