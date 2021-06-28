import {ActionButton} from 'react-storefront'

const argTypes = {
  label: {
    name: 'Label',
    type: { name: 'string', required: true },
    control: {
      type: 'text'
    }
  },
  value: {
    name: 'Value',
    type: { name: 'string', required: true },
    control: {
      type: 'text'
    }
  }
}

export default {
  component: ActionButton,
  title: 'Design System/Atoms/ActionButton',
  argTypes: argTypes,
  decorators: []
}


const Template = (args) =>   <ActionButton {...args}/>

export const Default = Template.bind({})

Default.args = {
  label: 'Sort',
  value: 'Lowest Price'
}
