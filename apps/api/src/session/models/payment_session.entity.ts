import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PaymentSession {
  @PrimaryColumn()
  id: string;

  @Column()
  sessionId: string;

  @Column()
  amount: number;

  @Column()
  merchantId: string;

  @Column()
  status: 'paid' | 'unpaid' | 'no_payment_required';

  @Column()
  reason: 'fail' | 'success' | 'manual' | 'expire'

  @Column()
  timestamp: Date;

  @Column()
  notes: string;

  @Column()
  goods_sold_type: string;

  @Column()
  checkout_type: 'payment' | 'subscription' | 'donation';

  @Column()
  reference_id: string;

  @Column()
  return_url: string;

  @Column()
  success_url: string;

  @Column()
  subtotal: number;

  @Column()
  total: number;

  @Column()
  custom_text: string;

  @Column()
  expires_at: Date;

  @Column()
  livemode: boolean;

  @Column()
  action_type: 'book' | 'pay' | 'subscribe' | 'donate';

  @Column('simple-array')
  items: {
    [key: string]: {
      item_id: string;
      item_name: string;
      item_description: string;
      item_image: string;
      item_url: string;
      item_quantity: number;
      item_price: number;
      item_currency: string;
    };
  }[];

  @Column('simple-array')
  payment_methods: string[];

  @Column('simple-array')
  flags: string[];

  @Column('simple-array')
  discount_codes: string[];

  @Column('simple-array')
  shipping_methods: string[];
}