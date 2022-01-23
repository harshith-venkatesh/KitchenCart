import { createServer, Factory, Model } from 'miragejs'
import faker, { random } from 'faker'

faker.seed(123)

function getItem() {
  return Factory.extend({
    id() {
      return faker.random.number({
        min: 0,
        max: 50
      })
    },
    name() {
      return faker.commerce.productName()
    },
    image() {
      return faker.random.image()
    },
    price() {
      return faker.commerce.price()
    },
    rating() {
      return faker.random.number({
        min: 2,
        max: 5
      })
    },
    inStock() {
      return faker.random.boolean()
    },
    fastDelivery() {
      return faker.random.boolean()
    },
    category() {
      return random.arrayElement(['String Instruments', 'Air Instruments'])
    }
  })
}

export function makeServer({ environment = 'development' } = {}) {
  createServer({
    environment,
    models: {
      wishListItem: Model,
      cartListItem: Model,
      productListItem: Model
    },
    factories: {
      wishListItem: getItem(),
      cartListItem: getItem(),
      productListItem: getItem()
    },
    seeds(server) {
      server.createList('productListItem', 100)
    },
    routes() {
      this.namespace = 'api'
      this.timing = 2000

      this.get('/wishList', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)

        return schema.wishListItems.create({ ...attrs })
      })
      this.post('/wishList', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        return schema.wishListItems.create({ ...attrs })
      })
      this.delete('/wishList/:id', (schema, request) => {
        let id = request.params.id
        return schema.wishListItems.find(id).destroy()
      })
      this.get('/cartList', (schema) => {
        return schema.cartListItems.all()
      })
      this.post('/cartList', (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        return schema.cartListItems.create(attrs)
      })
      this.delete('/cartList/:id', (schema, request) => {
        let id = request.params.id
        return schema.cartListItems.find(id).destroy()
      })
      this.get('/productList', (schema) => {
        return schema.productListItems.all()
      })
    }
  })
}
