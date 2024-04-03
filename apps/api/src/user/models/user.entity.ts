import { DCollectingAddressEntity } from 'src/payment/models/index.entity';
import { DMerchant } from 'src/user/models/merchant.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class DUser extends DCollectingAddressEntity {
  @PrimaryColumn()
  id?: string;

  @Column()
  uuid: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  created: Date;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  is_active: boolean;

  @Column()
  profile_picture: string;

  @Column({ default: null, type: 'datetime' })
  created_at?: Date;

  @Column({ default: null, type: 'datetime' })
  updated_at?: Date;

  @OneToOne((type) => DMerchant, (merchant) => merchant.user)
  merchant: DMerchant;
}