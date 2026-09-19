import styles from "./component.module.scss"
import { useEffect, useState, useCallback } from "react";
import { SpawnAnimationWrapper } from "../../../common/effects/component";
import { AutoList } from "./autoList";
import { SearchFilters } from "./filters";
import { Car } from "./interfaces";

export default function SearchAssortment () {

  const testMode = false;

  const [ upload, setUpload ] = useState<Car[]|null>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ isError, setIsError ] = useState<boolean>(false);

  const [ brand, setBrand ] = useState<string|null>(null);
  const [ model, setModel ] = useState<string|null>(null);
  const [ hasMileage, setHasMileage ] = useState<boolean>(false);
  const [ filteredAutoList, setfilteredAutoList ] = useState<Car[]>([]);
  const [ brandList, setBrandList ] = useState<string[]>([]);
  const [ modelList, setModelList ] = useState<string[]>([]);

  const uploadFromDatabase = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${testMode?"http://localhost:5000":""}/api/cars`);
      if (!response.ok) {setIsError(true);return}
      else setIsError(false);
      const newUpload = await response.json() as Car[];
  
      setUpload(newUpload);
      setBrandList(Array.from(new Set(newUpload.map( car => car.brand ))));
    } catch (error) { setIsError(true); console.error("Failed to upload auto-list:", error) }
    finally { setIsLoading(false) }
  }, [testMode]);
  useEffect(() => {uploadFromDatabase()}, [uploadFromDatabase]);

  useEffect(()=>{
    if (!upload) return;
    setModelList( brand? upload.filter(car => car.brand === brand).map(car => car.model) : [] );
    let tempAutoList = upload;
    tempAutoList = tempAutoList.filter(car => hasMileage? car.mileage > 0 : car.mileage === 0 );
    if (brand) tempAutoList = tempAutoList.filter(car => car.brand === brand);
    if (model) tempAutoList = tempAutoList.filter(car => car.model === model);
    setfilteredAutoList(tempAutoList);
  }, [ brand, model, hasMileage, upload ]);

  return ( <div className={styles.searchAssortmentContainer} id="assortment" >
    <SpawnAnimationWrapper><div className={styles.searchAssortmentTitle}>{"Подберите себе автомобиль"}</div></SpawnAnimationWrapper>
    
    <div className={styles.searchAssortmentPositionFix1}>
      <SpawnAnimationWrapper>
        <SearchFilters
        brandList={brandList}
        modelList={modelList}
        onBrandSelect={(i)=>setBrand(i)}
        onModelSelect={(i)=>setModel(i)}
        onSetHasMileage={(i)=>setHasMileage(i)}
        isError={isError} isLoading={isLoading}
        isModelFilterDisabled={!modelList.length}
        />
      </SpawnAnimationWrapper>
    </div>
    <div className={styles.searchAssortmentPositionFix2}>
    <SpawnAnimationWrapper>
      <AutoList
      list={filteredAutoList}
      isError={isError}
      isLoading={isLoading}
      />
    </SpawnAnimationWrapper>
    </div>


  </div> )
}