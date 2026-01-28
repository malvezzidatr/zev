import React from 'react';
import { createComponent } from '@lit/react';
import { ZevTimeline as ZevTimelineElement } from '@malvezzidatr/zev-core';

export const ZevTimeline = createComponent({
  tagName: 'zev-timeline',
  elementClass: ZevTimelineElement,
  react: React,
});
