import { GridList, GridListTile, ListSubheader, GridListTileBar, IconButton, Typography, Paper } from '@material-ui/core'
import InfoIcon from '@material-ui/icons/Info';
import React from 'react'

const argTypes = {
  gridListTitle: {
    name: 'Grid List Title',
    type: { name: 'string', required: true },
    control: {
      type: 'text'
    }
  },
  cols: {
    name: 'Columns',
    type: { name: 'number', required: true },
    control: {
      type: 'number'
    }
  },
  elevation: {
    name: 'Elevation',
    type: { name: 'number', required: true },
    control: {
      type: 'number'
    }
  },
  tileOutline: {
    name: 'Title Outline',
    type: { name: 'boolean' },
    control: {
      type: 'boolean'
    }
  },
}
export default {
  component: GridList,
  title: 'Design System/Molecules/GridList',
  argTypes:argTypes,
  decorators: []
};

const data = [
  { color: 'red', textColor: 'white', title: 'Tile 1', subtitle: 'Sub Title 1' },
  { color: 'black', textColor: 'white', title: 'Tile 2', subtitle: 'Sub Title 2' },
  { color: 'blue', textColor: 'white', title: 'Tile 3', subtitle: 'Sub Title 3' },
  { color: 'skyblue', textColor: 'black', title: 'Tile 4', subtitle: 'Sub Title 4' },
  { color: 'purple', textColor: 'white', title: 'Tile 5', subtitle: 'Sub Title 5' },
  { color: 'yellow', textColor: 'black', title: 'Tile 6', subtitle: 'Sub Title 6' },
  { color: 'gray', textColor: 'white', title: 'Tile 7', subtitle: 'Sub Title 7' },
  { color: 'lime', textColor: 'black', title: 'Tile 8', subtitle: 'Sub Title 8' },
  { color: 'pink', textColor: 'black', title: 'Tile 9', subtitle: 'Sub Title 9' },
  { color: 'aquamarine', textColor: 'black', title: 'Tile 10', subtitle: 'Sub Title 10' },
  { color: 'orange', textColor: 'black', title: 'Tile 11', subtitle: 'Sub Title 11' },
  { color: 'indigo', textColor: 'white', title: 'Tile 12', subtitle: 'Sub Title 12' },
]

const Template = (args) => (
  <>
    <GridList cols={args.cols}>
      <GridListTile key="Subheader" cols={args.cols} style={{ height: 'auto' }}>
        <ListSubheader component="div"><Typography variant='h3'>{args.gridListTitle}</Typography></ListSubheader>
      </GridListTile>
      {args.tiles.map((item) => (
        <GridListTile key={item.color}>
          <Paper {...args.tileOutline? {variant:'outlined'}:{}} elevation={args.elevation}
            key={item.title}
            style={{
              height: 200,
              backgroundColor: item.color,
              color: item.textColor,
              display: 'flex',
            }}>
            {item.label}
          </Paper>
          <GridListTileBar
            title={item.title}
            subtitle={<span>{item.subtitle}</span>}
            actionIcon={
              <IconButton aria-label={`info about ${item.title}`}>
                <InfoIcon />
              </IconButton>
            }
          />
        </GridListTile>
      ))}
    </GridList>
  </>
);

export const Default = Template.bind({});

Default.args = {
  tiles: data,
  cols: 3,
  gridListTitle: 'Grid List Title',
  elevation: 2,
  tileOutline: true
}
