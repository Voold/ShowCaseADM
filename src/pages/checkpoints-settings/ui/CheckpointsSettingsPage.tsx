import styles from './CheckpointsSettingsPage.module.css'
import { CheckpointList } from '@/widgets/checkpoint-list';
import { CreateCheckpointGroupForm } from "@/features/manage-checkpoints";

export function CheckpointsSettingsPage() {
  return (
    <div className={styles.container}>
      <CheckpointList />
      <CreateCheckpointGroupForm />
    </div>
  )
}
