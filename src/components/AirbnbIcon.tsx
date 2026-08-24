'use client';
import React from 'react';
import { SVG_ICONS } from '@/lib/svg-manifest';

interface AirbnbIconProps {
  name: string;
  size?: number | string;
  color?: string;
  fill?: string;
  className?: string;
  style?: React.CSSProperties;
}

function AirbnbIconInner({
  name,
  size = 24,
  color,
  fill,
  className = '',
  style = {},
}: AirbnbIconProps) {
  const fileName = name.endsWith('.svg') ? name : `image (${name}).svg`;
  let rawSvg = SVG_ICONS[fileName] || SVG_ICONS[name];

  if (!rawSvg) {
    return null;
  }

  // If a specific fill is requested (e.g. red for saveFilled heart)
  if (fill) {
    rawSvg = rawSvg
      .replace(/fill:none/gi, `fill:${fill}`)
      .replace(/fill="none"/gi, `fill="${fill}"`);
    if (!rawSvg.includes('fill:')) {
      rawSvg = rawSvg.replace(/<path /gi, `<path style="fill:${fill}" `);
    }
  }

  const customStyle: React.CSSProperties = {
    width: size,
    height: size,
    display: 'inline-block',
    verticalAlign: 'middle',
    color: color || 'inherit',
    flexShrink: 0,
    ...style,
  };

  return (
    <span
      className={`airbnb-icon-wrapper ${className}`}
      style={customStyle}
      dangerouslySetInnerHTML={{ __html: rawSvg }}
    />
  );
}

const AirbnbIcon = React.memo(AirbnbIconInner);
export default AirbnbIcon;
