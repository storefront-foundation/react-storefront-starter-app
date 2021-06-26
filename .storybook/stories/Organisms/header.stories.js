
import Header from '../../../components/Header'
import { PWAContext } from 'react-storefront'
import SessionContext from 'react-storefront/session/SessionContext'

const argTypes = {
  offline: {
    name: 'Offline',
    type: { name: 'boolean', required: true },
    defaultValue: 'false',
    control: {
      type: 'boolean'
    }
  }
}

export default {
  component: Header,
  title: 'Design System/Organisms/Header',
  decorators: [],
  argTypes: argTypes
}

const Template = (args) => (
  <SessionContext.Provider value={{session:{itemsInCart:3}}}>
    <PWAContext.Provider value={{offline: args.offline}}>
      <Header></Header>
    </PWAContext.Provider>
  </SessionContext.Provider>
)

export const Default = Template.bind({});

Default.args = {offline: false}
