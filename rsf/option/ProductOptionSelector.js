import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import ProductOption from './ProductOption'

export const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  button: {
    margin: theme.spacing(0, 0.5, 0.5, 0),
  },
})

const useStyles = makeStyles(styles, { name: 'RSFProductOptionSelector' })

/**
 * A selector for product options rendered as a set of buttons. Buttons can either have
 * text or an image. The text for the selected option can optionally be displayed below
 * the buttons.
 *
 * This component supports AMP.
 */
export default function ProductOptionSelector({
  options,
  name,
  classes,
  optionProps,
  skeleton,
  value,
  onChange,
  variant,
  strikeThroughDisabled,
  OptionComponent,
}) {
  classes = useStyles({ classes })

  if (skeleton) {
    options = new Array(skeleton).fill(0).map((_item, i) => ({ id: i, text: '' }))
  }

  if (!options) return null

  return (
    <div data-id="ProductOptionSelector" className={classes.root}>
      {options.map((option, i) => {
        return (
          <OptionComponent
            selectedOption={value}
            onSelectedOptionChange={onChange}
            {...optionProps}
            variant={variant || (option.image || option.color ? 'swatch' : 'text')}
            name={name}
            key={option.id}
            className={clsx(classes.button, optionProps.className)}
            index={i}
            color={option.color}
            imageProps={option.image}
            value={option}
            skeleton={skeleton != null}
            strikeThroughDisabled={strikeThroughDisabled}
          />
        )
      })}
    </div>
  )
}

ProductOptionSelector.propTypes = {
  /**
   * Override or extend the styles applied to the component. See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * Props for displayed images. See <Image /> component for details
   */
  imageProps: PropTypes.object,

  /**
   * The name of property in amp state to bind to
   */
  name: PropTypes.string,

  /**
   * Function to call when a new option is selected. Called with the new selected
   * option or `null` when a selected option is deselected.
   */
  onChange: PropTypes.func,

  /**
   * Props to apply to each `SwatchProductOption` or `TextProductOption` element.
   */
  optionProps: PropTypes.object,

  /**
   * If specified, this number of skeleton buttons will be displayed instead of
   * displaying the actual buttons.
   */
  skeleton: PropTypes.number,

  /**
   * Current selected value among provided options or `null` when no option is selected.
   */
  value: PropTypes.object,

  /**
   * If `true`, disabled options will have a line through them.
   */
  strikeThroughDisabled: PropTypes.bool,

  /**
   * Allows you to override the default component which is used to render a product option.
   */
  OptionComponent: PropTypes.elementType,
}

ProductOptionSelector.defaultProps = {
  items: [],
  optionProps: {},
  imageProps: {},
  OptionComponent: ProductOption,
  strikeThroughDisabled: false,
}
