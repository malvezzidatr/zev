import '@zev/tokens/css';
import type { Preview } from '@storybook/web-components-vite';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      toc: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
      },
    },
  },
};

export default preview;
