import React from 'react'
import { Pets } from '@material-ui/icons'
import {ToolbarButton} from 'react-storefront'

export default { title: 'Design System/Atoms/ToolbarButton' }

export const defaults = () => <ToolbarButton icon={<Pets />} label="Label" />
