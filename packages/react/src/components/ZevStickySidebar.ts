import React from 'react';
import { createComponent } from '@lit/react';
import { ZevStickySidebar as ZevStickySidebarElement } from '@malvezzidatr/zev-core';

export const ZevStickySidebar = createComponent({
  tagName: 'zev-sticky-sidebar',
  elementClass: ZevStickySidebarElement,
  react: React,
});
