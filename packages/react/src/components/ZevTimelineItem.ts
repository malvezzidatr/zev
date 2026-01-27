import React from 'react';
import { createComponent } from '@lit/react';
import { ZevTimelineItem as ZevTimelineItemElement } from '@zev/core';

export const ZevTimelineItem = createComponent({
  tagName: 'zev-timeline-item',
  elementClass: ZevTimelineItemElement,
  react: React,
});
