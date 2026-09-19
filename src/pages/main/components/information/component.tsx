import styles from "./component.module.scss";
import CompanyActivityFields from "./activityFields";
import CompanyParnterList from "./partnerList";
import CompanyTeamList from "./teamList";
export default function CompanyInformation () {

  return ( <div className={styles.companyInformationContainer} id="companyInformation">
    <CompanyActivityFields/>
    <CompanyParnterList/>
    <CompanyTeamList/>
  </div> )  
}