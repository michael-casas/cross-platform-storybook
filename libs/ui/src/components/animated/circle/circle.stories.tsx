import type { Meta } from '@storybook/react';
import AnimationCircle from '.';

// TODO: Design The Colors Component Demo here...
const meta: Meta<typeof AnimationCircle> = {
  component: AnimationCircle,
  title: 'Components/Animated/Circle',
  args: {},
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
