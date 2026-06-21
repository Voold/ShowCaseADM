import styles from './PartnersSettingsPage.module.css'
import { PartnerList } from "@/widgets/partner-list";
import { AddPartnerForm } from "@/features/add-partner";

export function PartnersSettingsPage() {
	return (
		<div className={styles.container}>
			<PartnerList/>
		<AddPartnerForm/>
		</div>
	)
}