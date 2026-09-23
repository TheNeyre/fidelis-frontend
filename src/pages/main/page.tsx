import Header from "../common/header/component";
import Footer from "../common/footer/component";

import styles from "./page.module.scss";

import { ProgressiveLayerBlur } from "../common/effects/component";
import { useEffect } from "react";

import BitrixForm from "./components/form/component";
import CompanyInformation from "./components/information/component";
import SearchAssortment from "./components/assortment/component";

export default function MainPage () {

  useEffect(()=>{

    const downbar = document.querySelector<HTMLDivElement>(`.${styles.downbarContainer}`);
    if (downbar) downbar.classList.add(styles.downbarSlideIn);
    const windowScrollHandle = () => {
      if (!downbar) return;
      if (window.scrollY !== 0) downbar.classList.remove(styles.downbarSlideIn);
      else downbar.classList.add(styles.downbarSlideIn);
    }
    const windowResizeHandle = () => {
    const coefficient = (window.innerWidth/2000) - .15;
    Object.assign(document.documentElement,
    {style: `--background-height-coefficient: ${coefficient};`});}
    windowResizeHandle();

    window.addEventListener("resize", windowResizeHandle);
    window.addEventListener("scroll", windowScrollHandle);
    return () => {window.removeEventListener("resize", windowResizeHandle);
      window.removeEventListener("scroll", windowScrollHandle);
    }
  }, []);

  return (<>

    <div className={styles.headerPositionFix}> <Header/> </div>

    <div className={styles.background}>
      <div className={styles.backgroundBlendGroup}>
        <img src="/imgs/background.png" alt="background" 
        className={`${styles.backgroundImage} ${styles.backgroundLayer}`}/>
        <div className={`${styles.backgroundColorGradient} ${styles.backgroundLayer}`}></div>
        <div className={`${styles.backgroundLayer} ${styles.backgroundSaturationGradient}`}/>
      </div>
      <div className={`${styles.backgroundLayer} ${styles.backgroundBlur}`}> 
        <ProgressiveLayerBlur
        width={"100vw"}
        height={"1200px"}
        blurDirection = {"to bottom"}
        />
      </div>
    </div>
  
    <div className={styles.mainContainer} id="main">
      <div className={styles.titleContentContainer}>
        <div className={styles.verifiedCompanyName}>
          <img src="/icons/verify.svg" alt="verified-company-icon" className={styles.verifiedIcon}/>
          <span className={styles.companyName}>{"ФИДЕЛИСМОЛЛ ГРУПП"}</span>
        </div>
        <div className={styles.titleText}>
          {"ДИЛЛЕР"} <br /> {"ПРОВЕРЕННЫХ"} <br /> {"АВТО"}
        </div>
        <div className={styles.secondTextLine}></div>
        <div className={styles.secondText}>{"Проверенные автомобили"} <br /> {"по выгодным ценам"}</div>
        <div className={styles.advantagesContainer}>
          <div className={styles.advantageBlock}>
            <img src="icons/medal.svg" alt="medal-icon" className={styles.advantageIcon}/>
            <span className={styles.advantageText}>{"Высшее качество и надежность продукции"}</span>
          </div>
          <div className={styles.advantagesPoint}/>
          <div className={styles.advantageBlock}>
            <img src="icons/handshake.svg" alt="handshake-icon" className={styles.advantageIcon}/>
            <span className={styles.advantageText}>{"Поддержка на всех этапах покупки"}</span>
          </div>
          <div className={styles.advantagesPoint}/>
          <div className={styles.advantageBlock}>
            <img src="icons/car.svg" alt="car-icon" className={styles.advantageIcon}/>
            <span className={styles.advantageText}>{"Современные технологии и комфорт"}</span>
          </div>
        </div>
      </div>
    </div>

    <div className={styles.downbarContainer}>
      <div className={styles.downbarShadow}></div>
      <img src="icons/arrow-down.svg" alt="arrow-down-icon" className={styles.downbarArrowIcon}/>
      <a href="#assortment">
        <div className={styles.downbarContent}>
          <div className={styles.downbarBlur}> <ProgressiveLayerBlur width={"100vw"} height={"170px"}/> </div>
          <div className={styles.downbarAdditionDecoEffect}></div>
          <div className={styles.downbarText}>{"Подобрать себе автомобиль"}</div>
        </div>
      </a>
    </div>

    <div className={styles.addtitonContentContainer}>
      <CompanyInformation/>
      <SearchAssortment/>
      <BitrixForm/>
      <Footer/>
    </div>


    

  </>)
}