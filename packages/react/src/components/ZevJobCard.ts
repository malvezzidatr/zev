import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { ZevJobCard as ZevJobCardElement } from '@malvezzidatr/zev-core';

export const ZevJobCard = createComponent({
  tagName: 'zev-job-card',
  elementClass: ZevJobCardElement,
  react: React,
  events: {
    onCardClick: 'card-click' as EventName<CustomEvent<{ title: string; company: string; url: string }>>,
  },
});
