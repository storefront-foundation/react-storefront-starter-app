import { Metrics } from '@layer0/rum'
import Router from '@layer0/rum/Router'

if (typeof window !== 'undefined') {
  new Metrics({
    debug: true,
    router: new Router()
      .match('/p/:id', ({ setPageLabel }) => setPageLabel('product'))
      .match('/s/:id', ({ setPageLabel }) => setPageLabel('subcategory'))
      .match('/', ({ setPageLabel }) => setPageLabel('home')),
  }).collect()
}
