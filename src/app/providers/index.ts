import { compose } from '@/lib'

import { withHelmet } from './with-helmet'
import { withTheme } from './with-theme'
import { withSse } from './with-sse'
import { withRouter } from './with-router'

export const withProviders = compose(withHelmet, withTheme, withSse, withRouter)
