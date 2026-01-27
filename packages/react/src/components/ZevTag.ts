import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { ZevTag as ZevTagElement } from '@zev/core';

export const ZevTag = createComponent({
  tagName: 'zev-tag',
  elementClass: ZevTagElement,
  react: React,
  events: {
    onTagClick: 'tag-click' as EventName<CustomEvent<{ label: string }>>,
    onTagRemove: 'tag-remove' as EventName<CustomEvent<{ label: string }>>,
  },
});
