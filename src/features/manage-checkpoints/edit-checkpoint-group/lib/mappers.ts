import type { Field } from '../ui/types'
import type { Checkpoint } from '@/entities/checkpoint'

export const mapCheckpointToField = (checkpoint: Checkpoint): Field => ({
  id: crypto.randomUUID(),
  name: checkpoint.title,
  date: checkpoint.deadline
})
