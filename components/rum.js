import { Metrics } from '@edgio/rum'

if (typeof window !== 'undefined') {
  new Metrics().collect()
}
