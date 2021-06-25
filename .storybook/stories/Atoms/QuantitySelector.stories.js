import React, { useState } from 'react'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import {QuantitySelector} from 'react-storefront'

export default { title: 'Design System/Atoms/QuantitySelector' }

export const plain = () => {
  const [count, setCount] = useState(0)
  return <QuantitySelector value={count} onChange={setCount} />
}

export const withMinAndMax = () => {
  const [count, setCount] = useState(6)
  return <QuantitySelector minValue={5} maxValue={7} value={count} onChange={setCount} />
}

export const customIcons = () => {
  const [count, setCount] = useState(0)
  return (
    <QuantitySelector
      addIcon={<ArrowUpward />}
      subtractIcon={<ArrowDownward />}
      value={count}
      onChange={setCount}
    />
  )
}
