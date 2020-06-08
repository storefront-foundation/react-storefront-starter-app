import React from 'react'
import { AnalyticsProvider } from 'react-storefront-analytics'

const Analytics = ({ children }) => <AnalyticsProvider>{children}</AnalyticsProvider>

export default Analytics
