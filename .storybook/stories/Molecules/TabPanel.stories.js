import React from 'react'
import {TabPanel} from 'react-storefront'

const argTypes = {
    scrollable: {
        name: 'Scrollable',
        type: { name: 'boolean', required: false },
        control: {
            type: 'boolean'
        }
    }
}

export default {
    component: TabPanel,
    title: 'Design System/Molecules/TabPanel',
    decorators: [],
    argTypes: argTypes
}
const Template = (args) =>
  <TabPanel {...args}>
      <div label="First Tab">Contents of the first tab</div>
      <div label="Second Tab">Contents of the second tab</div>
      <div label="Third Tab">Contents of the third tab</div>
      <div label="Fourth Tab">Contents of the fourth tab</div>
      <div label="Fifth Tab">Contents of the fifth tab</div>
  </TabPanel>

export const Default = Template.bind({});

Default.args = {
    scrollable: false
}
