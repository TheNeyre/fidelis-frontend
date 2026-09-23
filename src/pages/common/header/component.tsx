import { useEffect, useRef, useState } from "react";
import styles from "./component.module.scss";
export default function Header () {
  const [ windowIsSmall, setWindowIsSmall ] = useState<boolean>(false);
  const [ lastSelectedSectionIndex, setLastSelectedSectionIndex ] = useState<number|null>(null);
  useEffect(()=>{
    
    if (window.innerWidth <= 800) setWindowIsSmall(true);
    const headerSections = Array.from(document.querySelectorAll<HTMLLIElement>(`.${styles.headerElement}`));

    const updateMoverPosition = (event: MouseEvent|null = null) => {
      const actualHeaderSections = Array.from(document.querySelectorAll<HTMLLIElement>(`.${styles.headerElement}`));
      const selectedSection = !event?
      (lastSelectedSectionIndex?actualHeaderSections[lastSelectedSectionIndex]:actualHeaderSections[0])
      :event.currentTarget as HTMLLIElement;
      const mover = document.querySelector<HTMLDivElement>(`.${styles.headerSelector}`);
      const header = document.querySelector<HTMLUListElement>(`.${styles.header}`)
      if (!selectedSection || !mover || !header) return;
      const sectionOffset = selectedSection.getBoundingClientRect().left;
      const headerOffset = header.getBoundingClientRect().left;
      const sectionWidth = parseFloat(getComputedStyle(selectedSection).getPropertyValue("width"));
      mover.style.setProperty("--header-selector-x-offset",`${sectionOffset - headerOffset + 15}px`);
      mover.style.setProperty("width", `${sectionWidth-30}px`);
    }; updateMoverPosition();

    const sectionClickHandle = (event: MouseEvent) => {
      const section = event.currentTarget as HTMLLIElement;
      setLastSelectedSectionIndex(headerSections.indexOf(section));
      updateMoverPosition(event);
    }

    const windowResizeHandle = () => {
      updateMoverPosition();
      if (window.innerWidth > 800) setWindowIsSmall(false);
      else if (window.innerWidth <= 800 && window.innerWidth > 480) setWindowIsSmall(true);
      else if (window.innerWidth <= 480) setWindowIsSmall(true);
    };
    
    window.addEventListener("resize", windowResizeHandle);
    headerSections.forEach(section => section.addEventListener("click", sectionClickHandle));

    return () => {
      headerSections.forEach(section => section.removeEventListener("click", sectionClickHandle));
      window.removeEventListener("resize", windowResizeHandle);
    }
  }, [ lastSelectedSectionIndex, windowIsSmall ] );

  const headerRef = useRef<HTMLUListElement>(null);

  return ( <header id="header" className={styles.headerContainer}>
    
    <img src="/icons/header.svg" alt="fidelis-header-logo" className={styles.logo}/>
    
    <ul className={styles.header} ref={headerRef}>
      <li className={`${styles.headerElement} ${styles.firstHeaderElement}`}> <a href="#main">{"главная"}</a> </li>
      <li className={styles.headerElement}> <a href="#companyInformation">{"о нас"}</a> </li>
      <li className={styles.headerElement}> <a href="#assortment">{"авто в продаже"}</a> </li>
      <li className={styles.headerElement}> <a href="#contacts">{"контакты"}</a> </li>
      <li className={` ${styles.lastHeaderElement}`}> <p className={styles.lastHeaderElementContent}><a href="/#form">{"связаться"}</a></p>
      <img src="/icons/arrow-right.svg" alt="contact-us-icon" className={styles.contactUsIcon}/> </li>
      <div className={styles.headerSelector}/>
    </ul>

  </header> )
}