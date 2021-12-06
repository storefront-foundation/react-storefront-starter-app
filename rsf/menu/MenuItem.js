import React, { useContext } from 'react'
import MenuBranch from './MenuBranch'
import MenuLeaf from './MenuLeaf'
import MenuContext from './MenuContext'
import PropTypes from 'prop-types'

export default function MenuItem({ BranchComponent, LeafComponent, item, ...props }) {
  const { renderItem } = useContext(MenuContext)

  let NodeType = LeafComponent,
    result = null

  if (item.items) {
    NodeType = BranchComponent
  }

  if (renderItem) {
    result = renderItem(item, item.leaf)
  }

  if (result == null) {
    result = <NodeType item={item} renderItem={renderItem} {...props} />
  }

  return result
}

MenuItem.propTypes = {
  BranchComponent: PropTypes.elementType.isRequired,
  LeafComponent: PropTypes.any,
}

MenuItem.defaultProps = {
  BranchComponent: MenuBranch,
  LeafComponent: MenuLeaf,
}
