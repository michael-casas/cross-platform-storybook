import type { Meta } from '@storybook/react';
import Menu from '.';

// TODO: Design The Colors Component Demo here...
const meta: Meta<typeof Menu> = {
  component: Menu,
  title: 'Components/Icons/Menu',
  args: {
    fill: '#000',
    stroke: '#000',
    size: 64,
  },
  parameters: {
    layout: 'centered',
    controls: {
      disabled: true,
    },
  },
};
export default meta;

export const Default = {
  args: {},
};

export const OnOpen = {
  args: {},
};

export const Open = {
  args: {},
};
