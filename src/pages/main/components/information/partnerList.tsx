import styles from "./component.module.scss";
import { SpawnAnimationWrapper, AnimatedNumber } from "../../../common/effects/component";
import { useState } from "react";
export default function CompanyParnterList () {

  const partners = ["umo", "rox", "baic", "bestune", "dongfeng", "forthing", "gac", "mg", "swm"];
  const [isAnimate, setIsAnimate] = useState<boolean>(false);
  return ( <SpawnAnimationWrapper onSpawn={() => setIsAnimate(true)}>
    <div className={styles.partnerListContainer}>
      <div className={styles.partnerListTitle}>
        С нами <span className={styles.partnersCount}><AnimatedNumber to={partners.length} from={0} duration={1.5} start={isAnimate}/></span> производителей партнёров
      </div>

      <div className={styles.partnerList}>
        { partners.map((partnerName, index) =>
        ( <img key={`partner-${partnerName}-${index}`} src={`/imgs/partners/${partnerName}.png`} alt={`partner-${partnerName}`} className={styles.partnerImage} /> ))}
      </div>
    </div>
  </SpawnAnimationWrapper> )
}