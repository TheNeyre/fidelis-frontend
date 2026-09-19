import styles from "./component.module.scss";
import { useRef } from "react";

interface FooterElement {
  icon?: string | null,
  title: string,
  link?: string | null,
  copytext?: string | null,
}

export default function Footer () {

  const FOOTER_CONTENT: {[key: string]: FooterElement[]} = {
    "Контакты": [
      {
        icon: "telegram",
        title: "Телеграм",
        link: "https://t.me/fidelis_auto"
      },
      {
        icon: "instagram",
        title: "Инстаграм",
        link: "https://www.instagram.com/_fidelis_group?igsh=MTlpNGVicG4wMWJucQ%3D%3D&utm_source=qr",
      },
      {
        icon: "vk",
        title: "ВК",
        link: "https://vk.ru/club238468927"
      }
    ],
    "Прямая связь": [
      {
        icon: "email",
        title: "info@fidelis-group.ru",
        copytext: "info@fidelis-group.ru"
      },
      {
        icon: "call",
        title: "8 (800) 777-60-54",
        copytext: "88007776054"
      },
    ],
    "Данные компании": [
      {
        title: "ИНН: 5507307581",
        copytext: "5507307581"
      },
      {
        title: "КПП: 550701001",
        copytext: "550701001"
      },
    ],
    "Адреса автосалонов": [
      {
        icon: "map",
        title: "644015, Омская область, г. Омск, ул. 22 декабря, д.89",
        copytext: "644015, Омская область, г. Омск, ул. 22 декабря, д.89"
      }
    ]
  }
  const copiedTextBlockRef = useRef<HTMLDivElement>(null);
  const copyText = (text: string | null | undefined) => {
    if (!text) return;
    if (!copiedTextBlockRef.current) return;
    navigator.clipboard.writeText(text);
    copiedTextBlockRef.current.classList.add(styles.copied);
    setTimeout(()=>{copiedTextBlockRef.current?.classList.remove(styles.copied)}, 1000);
  }

  return ( <footer id="contacts" className={styles.footerContainer}>

    <div className={styles.footerContent}>
      {Object.entries(FOOTER_CONTENT).map(([sectionTitle, sectionContent], sectionIndex) => (
        <div className={styles.footerSection} key={sectionIndex}>
          <h4 className={styles.sectionTitle}>{sectionTitle}</h4>
          <ul className={styles.sectionElements}>
            {sectionContent.map((footerElement, elementIndex) => (
              <li key={elementIndex} className={styles.sectionElement}>
                { footerElement.icon && ( <img src={`/icons/${footerElement.icon}.svg`} alt={`footer-element-${elementIndex}`} className={styles.elementIcon}/> ) }
                { footerElement.link?( <a href={footerElement.link} target="_blank" rel="noopener noreferrer" className={styles.elementText}>
                  {footerElement.title}
                </a> ):( <span className={styles.elementText} onClick={()=>copyText(footerElement.copytext)}>
                  {footerElement.title}
                </span> ) }
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    
    <div className={styles.footerEndtext}>{"ООО «ФИДЕЛИС МЕНЕДЖМЕНТ»"}</div>

    <div className={styles.copiedTextPositionFix}>
      <div className={styles.copiedTextBlock} ref={copiedTextBlockRef}>
        {"Скопировано"}
      </div>
    </div>


  </footer> )
}