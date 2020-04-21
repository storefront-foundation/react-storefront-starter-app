import { Prefetch as XDNPrefetch } from '@xdn/react'
import getAPIURL from 'react-storefront/api/getAPIURL'
import { forwardRef } from 'react'

const Prefetch = forwardRef((props, ref) => {
  return <XDNPrefetch {...props} url={getAPIURL} ref={ref} />
})

export default Prefetch
