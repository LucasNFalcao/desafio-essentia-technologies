import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

import { randomUUID } from 'node:crypto'
@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: String = randomUUID()

  @Column()
  title!: string

  @Column()
  description!: string

  @Column({ default: false })
  completed!: boolean
}
