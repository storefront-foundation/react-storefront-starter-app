import React from 'react'
import { AnalyticsProvider, GoogleAnalytics, GoogleTagManager } from 'react-storefront-analytics'

const Analytics = ({ children }) => (
  <AnalyticsProvider>
    <GoogleTagManager apiKey="test">
      {{
        pageview: ({ eventContext, eventParams }) => ({
          event: 'pageview',
          path: eventParams,
          title: eventContext.title,
        }),
        productClicked: ({ eventParams }) => ({
          event: 'productClick',
          ecommerce: {
            click: {
              products: [
                {
                  id: eventParams.product.id,
                  position: eventParams.position,
                },
              ],
            },
          },
        }),
      }}
    </GoogleTagManager>
    <GoogleAnalytics trackingId="UA-153223971-1">
      {{
        pageview: ({ eventContext }) => ({
          hitType: 'pageview',
          page: eventContext.pathname,
          title: eventContext.title,
        }),
        productClicked: ({ eventParams }) => ({
          hitType: 'event',
          eventCategory: 'interaction',
          eventAction: 'click',
          eventLabel: eventParams.product.id.toString(),
          eventValue: 1,
        }),
      }}
    </GoogleAnalytics>
    {children}
  </AnalyticsProvider>
)

export default Analytics
