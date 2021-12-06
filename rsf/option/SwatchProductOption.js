import React from 'react'
import clsx from 'clsx'
import { Vbox } from '../Box'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Check as CheckedIcon } from '@material-ui/icons'
import Image from '../Image'
import PropTypes from 'prop-types'
import { Skeleton } from '@material-ui/lab'

export const styles = theme => ({
  /**
   * Styles applied to the root element.
   */
  root: {},
  /**
   * Styles applied to the button element.
   */
  button: {
    position: 'relative',
    marginBottom: theme.spacing(0.5),
    padding: 2,
    borderRadius: '50%',
    backgroundColor: 'transparent',
    minWidth: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.grey[500],
    cursor: 'pointer',
    '&:focus': {
      outline: 0,
    },
  },
  /**
   * Styles applied to the button element when [`disabled`](#prop-disabled) is `true`.
   */
  buttonDisabled: {
    cursor: 'default',
    borderColor: theme.palette.grey['A100'],
  },
  /**
   * Styles applied to the image element.
   */
  image: {
    height: '100%',
    width: '100%',
    borderRadius: '50%',
  },
  /**
   * Styles applied for mobile devices.
   */
  '@media not all and (hover: none)': {
    SwatchButton: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  /**
   * Styles applied to the wrapper element of the selected icon.
   */
  checkMark: {
    transition: 'opacity 0.1s linear',
    opacity: 0,
    position: 'absolute',
    zIndex: 1,
    color: 'white',
    top: 2,
    left: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 2,
    height: 'calc(100% - 4px)',
    width: 'calc(100% - 4px)',
    boxSizing: 'border-box',
    borderRadius: '50%',
    '.rsf-po-selected &': {
      opacity: 1,
    },
  },
  /**
   * Styles applied to the wrapper element of the selected icon when this option is selected.
   */
  selected: {
    opacity: 1,
  },
  /**
   * Styles applied to the label element when this option is selected.
   */
  selectedLabel: {
    fontWeight: 'bold',
  },
  /**
   * Styles applied to the skeleton and button elements when [`size`](#prop-size) is `'default'`.
   */
  default: {
    height: 48,
    width: 48,
    '& svg': {
      height: 24,
      width: 24,
    },
  },
  /**
   * Styles applied to the skeleton and button elements when [`size`](#prop-size) is `'small'`.
   */
  small: {
    height: 32,
    width: 32,
    '& svg': {
      height: 16,
      width: 16,
    },
  },
  /**
   * Styles applied to the skeleton and button elements when [`size`](#prop-size) is `'tiny'`.
   */
  tiny: {
    height: 24,
    width: 24,
    '& svg': {
      height: 12,
      width: 12,
    },
  },
  /**
   * Styles applied to the image element when [`disabled`](#prop-disabled) is `true`.
   */
  disabled: {
    opacity: 0.3,
  },
  /**
   * Styles applied to the element used as a strikethrough when [`disabled`](#prop-disabled) and
   * [`strikeThroughDisabled`](#prop-disabled) are both `true`.
   */
  strikeThrough: {
    height: '7px',
    borderWidth: '2px 0',
    borderStyle: 'solid',
    borderColor: '#f2f2f2',
    backgroundColor: '#666',
    position: 'relative',
    width: '100%',
    borderRadius: 10,
  },
  /**
   * Styles applied to the element used as a strikethrough when [`disabled`](#prop-disabled) and
   * [`strikeThroughDisabled`](#prop-disabled) are both `true`, and [`size`](#prop-size) is `'default'`.
   */
  defaultStrikeThrough: {
    top: -24,
  },
  /**
   * Styles applied to the element used as a strikethrough when [`disabled`](#prop-disabled) and
   * [`strikeThroughDisabled`](#prop-disabled) are both `true`, and [`size`](#prop-size) is `'small'`.
   */
  smallStrikeThrough: {
    top: -16,
  },
  /**
   * Styles applied to the element used as a strikethrough when [`disabled`](#prop-disabled) and
   * [`strikeThroughDisabled`](#prop-disabled) are both `true`, and [`size`](#prop-size) is `'tiny'`.
   */
  tinyStrikeThrough: {
    top: -12,
  },
})
const useStyles = makeStyles(styles, { name: 'RSFSwatchProductOption' })

/**
 * A variant of [`ProductOption`](/apiReference/option/ProductOption] that shows an image swatch to
 * represent a product option.
 */
export default function SwatchProductOption({
  selected,
  label,
  classes,
  color,
  imageProps,
  onClick,
  SelectedIcon,
  size,
  skeleton,
  ImageComponent,
  className,
  buttonProps,
  disabled,
  strikeThroughDisabled,
  strikeThroughAngle,
}) {
  classes = useStyles({ classes })

  if (skeleton) {
    return (
      <Skeleton
        variant="circle"
        style={{ marginTop: 0, marginBottom: 4, margintLeft: 4, marginRight: 4 }}
        className={clsx({
          [buttonProps.className]: true,
          [classes[size]]: true,
        })}
      />
    )
  }

  return (
    <Vbox className={classes.root}>
      <button
        {...buttonProps}
        type="button"
        onClick={disabled ? Function.prototype : onClick}
        className={clsx({
          [className]: className != null,
          [classes.button]: true,
          [classes[size]]: true,
          [classes.buttonDisabled]: disabled,
        })}
      >
        <div
          className={clsx({
            [classes.checkMark]: true,
            [classes.selected]: selected,
          })}
        >
          <SelectedIcon className={classes.icon} />
        </div>
        {color ? (
          <div
            className={clsx({
              [classes.image]: true,
              [classes.disabled]: disabled,
            })}
            style={{ backgroundColor: color }}
          />
        ) : (
          <ImageComponent
            className={clsx({
              [classes.disabled]: disabled,
            })}
            classes={{ image: classes.image }}
            fill
            aspectRatio={1}
            {...imageProps}
          />
        )}
        {disabled && strikeThroughDisabled && (
          <div
            className={clsx({
              [classes.strikeThrough]: true,
              [classes[`${size}StrikeThrough`]]: disabled,
            })}
            style={{ transform: `rotate(${strikeThroughAngle}deg)` }}
          />
        )}
      </button>
      {label && (
        <Typography variant="caption" className={clsx({ [classes.selectedLabel]: selected })}>
          {label}
        </Typography>
      )}
    </Vbox>
  )
}

SwatchProductOption.propTypes = {
  /**
   * Override or extend the styles applied to the component. See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * A CSS class to apply to the option.
   */
  className: PropTypes.string,
  /**
   * Text to display below the button.
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * A CSS color value to set the color of the swatch. Use either `color` or `imageProps`.
   */
  color: PropTypes.string,
  /**
   * Props for the `Image` element. Use either `color` or `imageProps`.
   */
  imageProps: PropTypes.shape(Image.propTypes),
  /**
   * Controls the size of the button.
   */
  size: PropTypes.oneOf(['default', 'small', 'tiny']),
  /**
   * The component type to use to display images.
   */
  ImageComponent: PropTypes.elementType,
  /**
   * If `true`, this option is selected.
   */
  selected: PropTypes.bool,
  /**
   * Set to `true` to make the option disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Set to `true` to show a slash through the item when disabled.
   */
  strikeThroughDisabled: PropTypes.bool,
  /**
   * The angle in degrees for the disabled indicator.
   */
  strikeThroughAngle: PropTypes.number,
  /**
   * A function to call when this option is clicked.
   */
  onClick: PropTypes.func,
  /**
   * An icon component type to display for when this option is selected.
   */
  SelectedIcon: PropTypes.elementType,
  /**
   * If `true`, show this option as just a skeleton.
   */
  skeleton: PropTypes.bool,
  /**
   * Props to pass to the button element.
   */
  buttonProps: PropTypes.object,
}

SwatchProductOption.defaultProps = {
  imageProps: {},
  SelectedIcon: CheckedIcon,
  ImageComponent: Image,
  size: 'default',
  buttonProps: {},
  strikeThroughDisabled: false,
  strikeThroughAngle: 45,
}
