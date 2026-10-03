import { useEffect, useRef, useState } from "react";
import styles from "./component.module.scss";
import { ProgressiveLayerBlur } from "../effects/component";
export default function Header () {
  const [ windowIsSmall, setWindowIsSmall ] = useState<boolean>(false);
  const [ lastSelectedSectionIndex, setLastSelectedSectionIndex ] = useState<number|null>(null);

  useEffect(()=>{
    if (window.innerWidth <= 800) setWindowIsSmall(true);
    const headerSections = Array.from(document.querySelectorAll<HTMLLIElement>(`.${CSS.escape(styles.headerElement!)}`));
    const headerLogo = document.querySelector<HTMLImageElement>(`.${styles.logo}`);

    const updateMoverPosition = (event: MouseEvent|null = null) => {
      const actualHeaderSections = Array.from(document.querySelectorAll<HTMLLIElement>(`.${CSS.escape(styles.headerElement!)}`));
      const selectedSection = !event?
      (lastSelectedSectionIndex?actualHeaderSections[lastSelectedSectionIndex]:actualHeaderSections[0])
      :event.currentTarget as HTMLLIElement;
      const mover = document.querySelector<HTMLDivElement>(`.${CSS.escape(styles.headerSelector!)}`);
      const header = document.querySelector<HTMLUListElement>(`.${CSS.escape(styles.header!)}`)
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

    const windowScrollHandle = () => {
      if (!headerLogo) return;
      if (window.scrollY > 15) headerLogo.classList.add(styles.onScroll!);
      else headerLogo.classList.remove(styles.onScroll!);
    }

    const windowResizeHandle = () => {
      updateMoverPosition();
      if (window.innerWidth > 800) setWindowIsSmall(false);
      else if (window.innerWidth <= 800 && window.innerWidth > 480) setWindowIsSmall(true);
      else if (window.innerWidth <= 480) setWindowIsSmall(true);
    };
    
    window.addEventListener("resize", windowResizeHandle);
    window.addEventListener("scroll", windowScrollHandle)
    headerSections.forEach(section => section.addEventListener("click", sectionClickHandle));

    return () => {
      headerSections.forEach(section => section.removeEventListener("click", sectionClickHandle));
      window.removeEventListener("resize", windowResizeHandle);
      window.removeEventListener("scroll", windowScrollHandle);
    }
  }, [ lastSelectedSectionIndex, windowIsSmall ] );

  const headerRef = useRef<HTMLUListElement>(null);

  return ( <header id="header" className={styles.headerContainer}>
    <div className={styles.headerBlur}>
      <ProgressiveLayerBlur
      width={"100vw"}
      height={"180px"}
      blurDirection="to top"
      />
    </div>

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