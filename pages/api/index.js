// returns data for the homepage
import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import createAppData from '../../components/mocks/createAppData'
import withCaching from 'react-storefront/utils/withCaching'

async function index(req, res) {
  res.json(
    await fulfillAPIRequest(req, {
      appData: createAppData,
      pageData: () =>
        Promise.resolve({
          title: 'React Storefront',
          slots: {
            heading: 'Welcome to your new React Storefront app.',
            description: `
              <p>
              Here you'll find mock home, category, subcategory, product, and cart pages that you can
              use as a starting point to build your PWA.
            </p>
            <p>Happy coding!</p>
          `,
          },
        }),
    })
  )
}

export default withCaching(index, 60 * 60 * 24) // cache with the service worker for 24 hours
