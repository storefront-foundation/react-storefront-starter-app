import HomePageTemplate from './HomePageTemplate'
import { PWAContext } from 'react-storefront'
import { default as CarouselStory, Default as CarouselDefault } from '../Molecules/Carousel.stories'
import { default as NavbarStory, Default as NavbarDefault } from '../Organisms/Navbar.stories'
import { default as ResponsiveTilesStory, Default as ResponsiveTilesStoryDefault} from '../Atoms/ResponsiveTiles.stories'
import SessionContext from 'react-storefront/session/SessionContext'
import { withNextRouter } from 'storybook-addon-next-router'

const argTypes = {
  offline: {
    name: 'Offline',
    type: { name: 'boolean', required: true },
    control: {
      type: 'boolean'
    }
  },
  cartCount: {
    name: 'Cart Count',
    type: { name: 'number', required: true },
    control: {
      type: 'number'
    }
  },
  ...CarouselStory.argTypes,
  ...NavbarStory.argTypes,
  ...ResponsiveTilesStory.argTypes
}

export default {
  component: HomePageTemplate,
  title: 'Design System/Pages/HomePage',
  decorators: [withNextRouter],
  argTypes: argTypes
}

const Template = (args) => (
  <SessionContext.Provider value={{session:{itemsInCart:args.cartCount}}}>
    <PWAContext.Provider value={{offline: args.offline}}>
      <HomePageTemplate {...args}/>
    </PWAContext.Provider>
  </SessionContext.Provider>
)

export const Default = Template.bind({});

Default.args = {
  offline: false,
  cartCount: 1,
  offerTitle: "Offers for you!",
  ...NavbarDefault.args,
  ...CarouselDefault.args,
  ...ResponsiveTilesStoryDefault.args
}

Default.parameters = {
  layout: 'fullscreen',
}
