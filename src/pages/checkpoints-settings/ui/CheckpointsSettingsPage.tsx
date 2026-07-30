import styles from './CheckpointsSettingsPage.module.css'
import { CreateCheckpointGroupForm } from "@/features/manage-checkpoints";

export function CheckpointsSettingsPage() {
  return (
    <div className={styles.container}>
      {/* <CheckpointsList /> */}
      <CreateCheckpointGroupForm />
    </div>
  )
}
