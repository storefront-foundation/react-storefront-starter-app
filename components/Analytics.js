import React from 'react'
import {
  AnalyticsProvider,
  GoogleAnalytics,
  GoogleTagManager,
  FirebasePerformanceMonitoring,
} from 'react-storefront-analytics'

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
    <FirebasePerformanceMonitoring
      /**
       * Update this object to match your Firebase config.  You can get this from the Firebase console at
       * Settings => General => Your Apps => Firebase SDK Snippet => Config.
       */
      config={{
        apiKey: 'AIzaSyC9en46xfUljbXqGap7cAuigmIHHWioUb8',
        authDomain: 'react-storefront-starter-app.firebaseapp.com',
        databaseURL: 'https://react-storefront-starter-app.firebaseio.com',
        projectId: 'react-storefront-starter-app',
        storageBucket: 'react-storefront-starter-app.appspot.com',
        messagingSenderId: '938415572468',
        appId: '1:938415572468:web:700ccf93b195e78e7be5a1',
        measurementId: 'G-CJ3BERR0QY',
      }}
    >
      {children}
    </FirebasePerformanceMonitoring>
  </AnalyticsProvider>
)

export default Analytics
