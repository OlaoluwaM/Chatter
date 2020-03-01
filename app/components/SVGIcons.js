import React from 'react';
import { motion } from 'framer-motion';
import iconsArr from './BgIcons';
import { __RouterContext } from 'react-router-dom';

export function NavArrowSVG({ color = '#fff' }) {
  const { location } = React.useContext(__RouterContext);

  return (
    <svg
      width='26'
      height='16'
      viewBox='0 0 26 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <motion.path
        initial={{ transform: 'rotate(0deg)' }}
        animate={{
          transform:
            location.pathname === '/' ? 'rotate(-180deg)' : 'rotate(0deg)',
        }}
        fillRule='evenodd'
        clipRule='evenodd'
        d='M6.65685 15.0711L0.292892 8.7071C-0.0976315 8.31657 -0.0976315 7.68341 0.292892 7.29288L6.65685 0.928924C7.04738 0.538399 7.68054 0.538399 8.07107 0.928924C8.46159 1.31945 8.46159 1.95261 8.07107 2.34314L3.41421 6.99999L26 6.99999V8.99999L3.41421 8.99999L8.07107 13.6568C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65685 15.0711Z'
        fill={color}
      />
    </svg>
  );
}

export function BurgerMenuSVG() {
  return (
    <svg
      width='40'
      height='23'
      viewBox='0 0 40 23'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M0 1.5C0 0.671573 0.671573 0 1.5 0H38.5C39.3284 0 40 0.671573 40 1.5C40 2.32843 39.3284 3 38.5 3H1.5C0.671573 3 0 2.32843 0 1.5Z'
        fill='white'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M0 11.5C0 10.6716 0.671573 10 1.5 10H38.5C39.3284 10 40 10.6716 40 11.5C40 12.3284 39.3284 13 38.5 13H1.5C0.671573 13 0 12.3284 0 11.5Z'
        fill='white'
      />
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M0 21.5C0 20.6716 0.671573 20 1.5 20H38.5C39.3284 20 40 20.6716 40 21.5C40 22.3284 39.3284 23 38.5 23H1.5C0.671573 23 0 22.3284 0 21.5Z'
        fill='white'
      />
    </svg>
  );
}

export function SVGBackground() {
  const [positions, setPositions] = React.useState([]);

  React.useEffect(() => {
    const minH = (20 / window.innerHeight) * window.innerHeight;
    const maxH = 0.92 * window.innerHeight;

    const minW = (20 / window.innerWidth) * window.innerWidth;
    const maxW = 0.92 * window.innerWidth;

    setPositions(p => {
      for (let i = 0; i < iconsArr.length; i++) {
        const { width, height } = {
          width: Math.round(Math.random() * (minW - maxW + 1)) + maxW,
          height: Math.round(Math.random() * (minH - maxH + 1)) + maxH,
        };
        if ((p.length > 0 && p.includes(width)) || p.includes(height)) {
          i -= 1;
          continue;
        } else p.push(Math.round(width), Math.round(height));
      }
      return p
        .map((_, i, arr) => ((i + 1) % 2 === 0 ? [arr[i - 1], arr[i]] : false))
        .filter(Boolean);
    });
  }, []);
  console.log(positions);
  return (
    <>
      {positions.length === iconsArr.length &&
        iconsArr.map((SVGElem, ind) => {
          const [x, y] = positions[ind];
          return (
            <SVGElem
              key={ind}
              style={{
                transform: `translate(${x}px, ${y}px) scale(0.6)`,
                opacity: 0.2,
                fill: '#fff',
                // filter: 'contrast(10px) blur(10px)',
              }}
              className={`svg${ind}`}
            />
          );
        })}
    </>
  );
}
