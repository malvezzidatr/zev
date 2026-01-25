import '@zev/tokens/css';
import type { Preview } from '@storybook/web-components-vite';
import { html } from 'lit';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color scheme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'system', title: 'System', icon: 'browser' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'system',
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'system';
      const root = document.documentElement;

      if (theme === 'system') {
        root.removeAttribute('data-theme');
      } else {
        root.setAttribute('data-theme', theme);
      }

      return html`${story()}`;
    },
  ],
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
