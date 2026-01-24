import React from 'react';
import { createComponent } from '@lit/react';
import { ZevAbout as ZevAboutElement } from '@zev/core';

export const ZevAbout = createComponent({
  tagName: 'zev-about',
  elementClass: ZevAboutElement,
  react: React,
});
