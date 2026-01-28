import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { ZevButton as ZevButtonElement } from '@malvezzidatr/zev-core';

export const ZevButton = createComponent({
  tagName: 'zev-button',
  elementClass: ZevButtonElement,
  react: React,
  events: {
    onButtonClick: 'button-click' as EventName<CustomEvent<{ variant: string }>>,
  },
});
