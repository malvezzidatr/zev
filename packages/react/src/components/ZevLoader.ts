import React from 'react';
import { createComponent } from '@lit/react';
import { ZevLoader as ZevLoaderElement } from '@malvezzidatr/zev-core';

export const ZevLoader = createComponent({
  tagName: 'zev-loader',
  elementClass: ZevLoaderElement,
  react: React,
});
