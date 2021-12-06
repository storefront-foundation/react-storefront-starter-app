import PropTypes from 'prop-types'
import React, { useMemo, useContext } from 'react'
import SearchResultsContext from './SearchResultsContext'
import { makeStyles } from '@material-ui/core/styles'
import ExpandableSection from '../ExpandableSection'
import CheckboxFilterGroup from './CheckboxFilterGroup'
import ButtonFilterGroup from './ButtonFilterGroup'

const styles = theme => ({
  /**
   * Styles applied to the group's title element.
   */
  groupTitle: {
    [theme.breakpoints.up('sm')]: {
      fontWeight: 'bold',
    },
  },
})

const useStyles = makeStyles(styles, { name: 'RSFFacetGroup' })

/**
 * A grouping of facets used for filtering products.
 */
export default function FacetGroup(props) {
  const { group, submitOnChange, defaultExpanded } = props
  const classes = useStyles(props.classes)
  const {
    pageData: { filters },
  } = useContext(SearchResultsContext)

  return useMemo(() => {
    if (!filters) return null

    const selection = []

    for (let option of group.options) {
      if (filters.indexOf(option.code) !== -1) {
        selection.push(option)
      }
    }

    let Controls

    if (group.ui === 'buttons') {
      Controls = ButtonFilterGroup
    } else {
      Controls = CheckboxFilterGroup
    }

    let caption = null

    if (selection.length === 1) {
      caption = selection[0].name
    } else if (selection.length > 0) {
      caption = `${selection.length} selected`
    }

    return (
      <ExpandableSection
        title={group.name}
        caption={caption}
        defaultExpanded={defaultExpanded}
        classes={{ title: classes.groupTitle }}
      >
        <Controls group={group} submitOnChange={submitOnChange} />
      </ExpandableSection>
    )
  }, [...Object.values(props), filters])
}

FacetGroup.propTypes = {
  /**
   * Override or extend the styles applied to the component. See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  // TODO - make this a shape
  /**
   * Contains data for the facet group to be rendered.
   */
  group: PropTypes.object,
  /**
   * Set to `true` to refresh the results when the user toggles a filter.
   */
  submitOnChange: PropTypes.bool,
  /**
   * If `true`, the group is expanded by default.
   */
  defaultExpanded: PropTypes.bool,
}
