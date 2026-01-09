import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column()
  title!: string

  @Column('text')
  description!: string

  @Column({ default: false })
  completed!: boolean
}
