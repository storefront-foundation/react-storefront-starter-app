import { Metrics } from '@layer0/rum'

if (typeof window !== 'undefined') {
  new Metrics().collect()
}
