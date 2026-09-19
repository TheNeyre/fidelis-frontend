import styles from "./component.module.scss";
import { useState, useEffect } from "react";
import { DropdownSelectorInput } from "./dropdown/component";
import { Car } from "./interfaces";
export const SearchFilters: React.FC<{
  brandList: string[],
  modelList: string[],
  onSetHasMileage: (hasMileage: boolean) => void | null,
  onBrandSelect: (brand: string) => void | null,
  onModelSelect: (model: string) => void | null,
  isError: boolean, isLoading: boolean, isModelFilterDisabled: boolean
}> = ({brandList, modelList, onSetHasMileage = null, onBrandSelect = null, onModelSelect = null, isError, isLoading, isModelFilterDisabled }) => {

  const [ hasMileage, setHasMileage ] = useState<boolean>(false);
  const [ brand, setBrand ] = useState<string>("");
  const [ model, setModel ] = useState<string>("");

  useEffect(()=>{
    if (onSetHasMileage) onSetHasMileage(hasMileage);
    if (onBrandSelect) onBrandSelect(brand);
    if (onModelSelect) onModelSelect(model);
  }, [hasMileage, brand, model])

  useEffect(()=>{
    const selectors = Array.from(document.querySelectorAll<HTMLButtonElement>(`.${styles.filterMileageButton}`));
    const currentSelector = hasMileage?selectors[1]:selectors[0];
    const secondSelector = hasMileage?selectors[0]:selectors[1];

    const updateMoverPosition = () => {
      const mover = document.querySelector<HTMLDivElement>(`.${styles.filterMileageMoverContainer}`);
      const filters = document.querySelector<HTMLDivElement>(`.${styles.filterMileage}`);
      if (!mover || !currentSelector || !filters) return;
      const selectorWidth = parseFloat(getComputedStyle(currentSelector).getPropertyValue("width"));
      const selectorOffset = currentSelector.getBoundingClientRect().left;
      const filtersOffset = filters.getBoundingClientRect().left;
      mover.style.setProperty("width", `${selectorWidth}px`);
      mover.style.setProperty("--filter-mover-offset-x", `${selectorOffset - filtersOffset}px`);
    }; updateMoverPosition();
    window.addEventListener("resize", updateMoverPosition)
    currentSelector.classList.add(styles.selected);
    secondSelector.classList.remove(styles.selected);
    return () => window.removeEventListener("resize", updateMoverPosition);
  },[hasMileage]);

  return ( <div className={styles.searchFiltresContainer}>

    <div className={styles.filterMileage}>
      <div className={styles.filterMileageMoverContainer}><div className={styles.mover}></div></div>
      <button className={`${styles.filterMileageButton}`} onClick={()=>setHasMileage(false)}>{"Новые"}</button>
      <button className={`${styles.filterMileageButton}`} onClick={()=>setHasMileage(true)}>{"С пробегом"}</button>
    </div>

    <div className={styles.dropdownFilters}>
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownTitle}>{"МАРКА АВТО"}</div>
        <DropdownSelectorInput options={brandList}
        placeholder={"Найдите желаемый бренд"}
        isError={isError} isLoading={isLoading}
        onSelect={(i)=>setBrand(i)}
        />
      </div>
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdownTitle}>{"МОДЕЛЬ"}</div>
        <DropdownSelectorInput options={modelList}
        placeholder={isModelFilterDisabled?"Выберите бренд авто":"Введите модель авто"}
        isError={isError} isLoading={isLoading}
        isDisabled={isModelFilterDisabled}
        onSelect={(i)=>setModel(i)}
        />
      </div>
    </div>

  </div> )
}