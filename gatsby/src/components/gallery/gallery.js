import React from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';

import './photoswipe.css';
import './default-skin.css';

export default function GalleryImages() {
  return (
    <Gallery>
      <Item
        original="https://placekitten.com/408/287"
        thumbnail="https://placekitten.com/408/287"
        width="1024"
        height="768"
      >
        {({ ref, open }) => (
          <img
            className="p-1"
            ref={ref}
            onClick={open}
            src="https://placekitten.com/408/287"
            alt="test"
          />
        )}
      </Item>
      <Item
        original="https://placekitten.com/200/287"
        thumbnail="https://placekitten.com/200/287"
        width="1024"
        height="768"
      >
        {({ ref, open }) => (
          <img
            className="p-1"
            ref={ref}
            onClick={open}
            src="https://placekitten.com/200/287"
            alt="test"
          />
        )}
      </Item>
      <Item
        original="https://placekitten.com/200/140"
        thumbnail="https://placekitten.com/200/140"
        width="1024"
        height="768"
      >
        {({ ref, open }) => (
          <img
            className="p-1"
            ref={ref}
            onClick={open}
            src="https://placekitten.com/200/140"
            alt="test"
          />
        )}
      </Item>
    </Gallery>
  );
}
