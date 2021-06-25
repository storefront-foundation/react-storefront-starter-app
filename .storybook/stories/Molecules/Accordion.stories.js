import React from 'react'
import { ExpandableSection } from 'react-storefront'
import { Accordion } from 'react-storefront'

export default { title: 'Design System/Molecules/Accordion' }

export const defaults = () => (
  <Accordion>
    <ExpandableSection title="First">
      <div>The first section</div>
    </ExpandableSection>
    <ExpandableSection title="Second">
      <div>The second section</div>
    </ExpandableSection>
    <ExpandableSection title="Third">
      <div>The third section</div>
    </ExpandableSection>
  </Accordion>
)
