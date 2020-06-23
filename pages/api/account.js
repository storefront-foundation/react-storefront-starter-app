import fulfillAPIRequest from 'react-storefront/props/fulfillAPIRequest'
import getAppData from 'react-storefront-connector/app/getAppData'

export default async function account(req, res) {
  const appData = await getAppData()
  return res.json(
    await fulfillAPIRequest(req, {
      appData: () => Promise.resolve(appData),
      pageData: () =>
        Promise.resolve({
          title: 'Account',
          account: {},
          breadcrumbs: [
            {
              text: 'Home',
              href: '/',
            },
          ],
        }),
    })
  )
}
