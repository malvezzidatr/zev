import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { ZevProjectDetail as ZevProjectDetailElement } from '@malvezzidatr/zev-core';

export const ZevProjectDetail = createComponent({
  tagName: 'zev-project-detail',
  elementClass: ZevProjectDetailElement,
  react: React,
  events: {
    onClose: 'close' as EventName<CustomEvent>,
  },
});
