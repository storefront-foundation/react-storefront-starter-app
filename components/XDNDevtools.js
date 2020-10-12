import { useEffect } from 'react'
import installDevtools from '@xdn/devtools/install'

export default function XDNDevtools() {
  useEffect(() => {
    installDevtools()
  }, [])

  return null
}
