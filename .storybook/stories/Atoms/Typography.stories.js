import { Typography } from '@material-ui/core';

const argTypes = {
  text: {
    name: 'Sample Text',
    type: { name: 'string', required: true },
    control: {
      type: 'text'
    }
  },
  align: {
    name: 'Align',
    options: ['left', 'center', 'right', 'justify'],
    description: 'Text Alignment',
    control: {
      type: 'radio'
    }
  },
  color: {
    name: "Text Color",
    type: {name: "select", value: "select"},
    control: { type: 'radio' },
    options: ['initial','inherit','primary','secondary','textPrimary','textSecondary','error']
  },
  gutterBottom: {
    name: "Bottom Margin",
    description: "If true, the text will have a bottom margin.",
    control: {
      type: 'boolean'
    }
  },
  noWrap: {
    name: "No Wrap",
    description: "If true, the text will not wrap, but instead will truncate with a text overflow ellipsis.\n" +
      "Note that text overflow can only happen with block or inline-block level elements (the element needs to have" +
      " a width in order to overflow).",
    control: {
      type: 'boolean'
    }
  },
  paragraph: {
    name: "Paragraph",
    description: "If true, the text will have a bottom margin.",
    control: {
      type: 'boolean'
    }
  },
  variant: {
    name: "Variant",
    type: {name: "select", value: "select"},
    control: { type: 'radio' },
    options: ['h1','h2','h3','h4','h5','h6','subtitle1','subtitle2','body1','body2','caption','button','overline','srOnly']
  },
}

export default {
  component: Typography,
  title: 'Design System/Atoms/Typography',
  argTypes: argTypes,
  decorators: []
}


const Template = (args) =>   (
  <>
    <Typography {...args}>
      {args.text}
    </Typography>
    <Typography {...args}>
      {args.text}
    </Typography>
  </>
)

export const Default = Template.bind({})

Default.args = {
  text: 'Sample Text',
  align: 'center',
  color: 'initial',
  noWrap: false,
  paragraph: false,
  gutterBottom: true,
  variant: 'body1'
}

export const H1 = Template.bind({})

H1.args = {
  ...Default.args,
  variant: 'h1'
}

export const H2 = Template.bind({})

H2.args = {
  ...Default.args,
  variant: 'h2'
}

export const H3 = Template.bind({})

H3.args = {
  ...Default.args,
  variant: 'h3'
}

export const H4 = Template.bind({})

H4.args = {
  ...Default.args,
  variant: 'h4'
}

export const H5 = Template.bind({})

H5.args = {
  ...Default.args,
  variant: 'h5'
}

export const H6 = Template.bind({})

H6.args = {
  ...Default.args,
  variant: 'h6'
}





export const Subtitle1 = Template.bind({})

Subtitle1.args = {
  ...Default.args,
  variant: 'subtitle1'
}

export const Subtitle2 = Template.bind({})

Subtitle2.args = {
  ...Default.args,
  variant: 'subtitle2'
}

export const Body1 = Template.bind({})

Body1.args = {
  ...Default.args,
  variant: 'body1'
}

export const Body2 = Template.bind({})

Body2.args = {
  ...Default.args,
  variant: 'body2'
}

export const Caption = Template.bind({})

Caption.args = {
  ...Default.args,
  variant: 'caption'
}

export const Button = Template.bind({})

Button.args = {
  ...Default.args,
  variant: 'button'
}

export const Overline = Template.bind({})

Overline.args = {
  ...Default.args,
  variant: 'overline'
}
