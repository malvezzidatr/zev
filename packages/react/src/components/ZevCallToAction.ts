import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { ZevCallToAction as ZevCallToActionElement } from '@zev/core';

export const ZevCallToAction = createComponent({
  tagName: 'zev-call-to-action',
  elementClass: ZevCallToActionElement,
  react: React,
  events: {
    onCtaClick: 'cta-click' as EventName<CustomEvent<{ href: string }>>,
  },
});
