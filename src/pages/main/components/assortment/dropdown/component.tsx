import styles from "./component.module.scss";
import { useState, useEffect, useRef } from 'react';

export const DropdownSelectorInput: React.FC<{
  options: Array<string>,
  placeholder?: string,
  onSelect?: (item: string) => void | null,
  isError?: boolean,
  isLoading?: boolean,
  isDisabled?: boolean,
  dropdownName?: string,
}> = ({options, onSelect = null, placeholder = "Введите текст..",
  isError = false, isLoading = false, isDisabled = false, dropdownName = "DROPDOWN-DEFAULT"}) => {

  const [ filteredItems, setFilteredItems ] = useState<Array<string>>([]);
  const [ inputValue, setInputValue ] = useState<string>("");
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const [ isSelected, setIsSelected ] = useState<boolean>(false);

  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!dropdownInputRef.current) return;
    dropdownInputRef.current.disabled = isDisabled;
  }, [isDisabled]);

  useEffect(()=>{
    if (!dropdownRef.current || !dropdownInputRef.current) return;
    isOpen?
    dropdownRef.current.classList.add(styles.open):
    dropdownRef.current.classList.remove(styles.open);
    isSelected?
    dropdownInputRef.current.classList.add(styles.selected):
    dropdownInputRef.current.classList.remove(styles.selected);
  }, [isOpen, isSelected]);

  useEffect(()=>{
    const handleClickOutside = (event: MouseEvent) => 
    {if (dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target as Node)) setIsOpen(false)}
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(()=>{
    if (!options.includes(inputValue.trim())) setIsSelected(false);
    if (!inputValue.trim()) { setFilteredItems(options); return}
    const filtered = options.filter((item: string) => {
      return item.toLowerCase().includes(inputValue.toLowerCase());
    }); setFilteredItems(filtered);
  }, [inputValue, options])


  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") setIsOpen(false);
    if (event.key === "Enter" && filteredItems.length === 1) handleItemSelect(filteredItems[0]);
  } 
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => { setInputValue(event.target.value); setIsOpen(true) }
  const handleItemSelect = (item: string) => {
    setIsSelected(true);
    setInputValue(item); //setSelectedItem(item); 
    setIsOpen(false); if(onSelect) onSelect(item);
  }
  const resetSelectedItem = () => {
    setIsSelected(false);
    setInputValue(""); //setSelectedItem(null);
    setIsOpen(false); if (onSelect) onSelect("");
  }

  return ( <div className={styles.dropdownContainer} ref={dropdownContainerRef}>
    <input
    className={styles.dropdownInput}
    ref={dropdownInputRef}
    value={inputValue}
    type={"text"}
    onKeyDown={handleKeyDown}
    onChange={handleInputChange}
    onFocus={()=>setIsOpen(true)}
    placeholder={placeholder}
    name={dropdownName}
    />
    { ( <div className={styles.dropdown} ref={dropdownRef}>
      {isLoading && ( <div className={styles.loading}>{"Загрузка.."}</div> )}
      {isError && ( <div className={styles.error}>{"Ошибка загрузки"}</div> )}
      {!isError && !isLoading && options.length === 0 && ( <div className={styles.empty}>{"Нет данных."}</div> )}
      {!isError && !isLoading && filteredItems.length === 0 && ( <div className={styles.empty}>{"Ничего не найдено."}</div> )}
      {!isError && !isLoading && filteredItems.length > 0 && ( <ul className={styles.dropdownList}>
        <li className={`${styles.dropdownItem} ${styles.dropdownResetItem}`} onClick={resetSelectedItem}>{"Сбросить"}<img src="/icons/close.svg" alt="close-icon" className={styles.closeIcon}/></li>
        {filteredItems.map((item, index) => { return ( <li
            key={index}
            className={`${styles.dropdownItem}`}
            onClick={()=>handleItemSelect(item)}>
            {item} </li>
        )})}
      </ul> )}
    </div> ) }

  </div> )
}