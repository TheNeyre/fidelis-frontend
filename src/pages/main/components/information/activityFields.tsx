import styles from "./component.module.scss";
import { SpawnAnimationWrapper } from "../../../common/effects/component";
export default function CompanyActivityFields () {

  const ActivityFieldCard: React.FC<{
    numer: number,
    header: string,
    subHeader?: string | null,
    description: string,
    isMain?: boolean
  }> = ({numer, header, description, subHeader = null, isMain = false}) => { return (
    <div className={`${styles.activityFieldCard} ${isMain?styles.isMain:""}`}>
      { isMain && ( <img src="/imgs/car.png" alt="activity-fields-car" className={styles.image}/> ) }
      <div className={styles.cardHeader}>
        <div className={styles.numer}>{`0${numer}`}</div>
        <div className={styles.header}>{header}</div>
      </div>
      { subHeader && ( <div className={styles.subHeader}>{subHeader}</div> ) }
      <div className={styles.description}>{description}</div>
    </div> )
  }

  return (
  <div className={styles.activityFieldsContainer} id="companyInformation">
    <SpawnAnimationWrapper>
      <div className={styles.activityFieldsTitle}>
      {"Пять направлений работы нашего центра"}
      </div>
    </SpawnAnimationWrapper>

    <SpawnAnimationWrapper>
      <div className={styles.activityFields}>
        <div>
          <ActivityFieldCard
          numer={1} header={"Основное"} subHeader={"Дилерские продажи"}
          description={"Новые автомобили официальных брендов, автомобили с гарантией производителя, прямые поставки от партнёров"}
          isMain={true}/>
        </div>
        <div className={styles.additionActivityFields}>
          {
            [{
              numer: 2,
              header: "Trade-in",
              description: "Обмен автомобиля на новый, прозрачная рыночная оценка, ускорение сделки."
            },{
              numer: 3,
              header: "Выкуп автомобилей",
              description: "Срочный выкуп, юридическое сопровождение, быстрые расчёты."
            },{
              numer: 4,
              header: "Авто под заказ",
              description: "Индивидуальный подбор и поставка по запросу, контроль качества и состояния."
            },{
              numer: 5,
              header: "Комерческие продажи",
              description: "Поставки для бизнеса, корпоративные автопарки, индивидуальные решения."
            }]
            .map((fieldData, index) => ( <SpawnAnimationWrapper key={index}>
              <ActivityFieldCard key={`activity-field-${index}`}
              numer={fieldData.numer} header={fieldData.header} description={fieldData.description}/>
            </SpawnAnimationWrapper> ))
          }
        </div>
      </div>
    </SpawnAnimationWrapper>

  </div>
  )
}