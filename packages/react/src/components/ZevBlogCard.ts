import React from 'react';
import { createComponent } from '@lit/react';
import type { EventName } from '@lit/react';
import { ZevBlogCard as ZevBlogCardElement } from '@malvezzidatr/zev-core';

export const ZevBlogCard = createComponent({
  tagName: 'zev-blog-card',
  elementClass: ZevBlogCardElement,
  react: React,
  events: {
    onCardClick: 'card-click' as EventName<CustomEvent<{ title: string; slug: string }>>,
  },
});
