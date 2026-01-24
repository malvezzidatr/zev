import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { ZevProjectCard as ZevProjectCardElement } from '@zev/core';

export const ZevProjectCard = createComponent({
  tagName: 'zev-project-card',
  elementClass: ZevProjectCardElement,
  react: React,
  events: {
    onCardClick: 'card-click' as EventName<CustomEvent<{ number: string; title: string }>>,
  },
});
