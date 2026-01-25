import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { ZevThemeToggle as ZevThemeToggleElement } from '@zev/core';

export const ZevThemeToggle = createComponent({
  tagName: 'zev-theme-toggle',
  elementClass: ZevThemeToggleElement,
  react: React,
  events: {
    onThemeChange: 'theme-change' as EventName<CustomEvent<{ theme: string }>>,
  },
});
