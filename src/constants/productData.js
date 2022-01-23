import faker from 'faker'

faker.seed(123)
export const productData = [...Array(100)].map((item) => ({
  name: faker.commerce.productName(),
  image: faker.random.image(),
  price: faker.commerce.price(),
  material: faker.commerce.productMaterial(),
  brand: faker.lorem.word(),
  inStock: faker.random.boolean(),
  fastDelivery: faker.random.boolean(),
  rating: faker.finance.amount(1, 5, 1),
  discount: faker.random.arrayElement([25, 50, 60, 0]),
  offer: faker.random.arrayElement([
    'Save 50',
    '70% bonanza',
    'Republic Day Sale',
    'Music Lover Discount'
  ]),
  level: faker.random.arrayElement([
    'beginner',
    'amateur',
    'intermediate',
    'advanced',
    'professional'
  ]),
  category: faker.random.arrayElement([
    'Bowed String',
    'Wood Wind',
    'Brass',
    'Percussion',
    'KeyBoard',
    'Guitar'
  ])
}))
