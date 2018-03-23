import nanoTubesGreen from '../assets/images/resource-images/nano-green.png';
import nanoTubesBlack from '../assets/images/resource-images/nano-black.png';

import unobtaniumGreen from '../assets/images/resource-images/unobtanium-green.png';
import unobtaniumBlack from '../assets/images/resource-images/unobtanium-black.png';

import planktonGreen from '../assets/images/resource-images/plankton-green.png';
import planktonBlack from '../assets/images/resource-images/plankton-black.png';

import spiderSilkGreen from '../assets/images/resource-images/spider-green.png';
import spiderSilkBlack from '../assets/images/resource-images/spider-black.png';

import riflesGreen from '../assets/images/resource-images/rifle-green.png';
import riflesBlack from '../assets/images/resource-images/rifle-black.png';

import soylentGreen from '../assets/images/resource-images/soylent-green-icon.png';
import soylentBlack from '../assets/images/resource-images/soylent-black-icon.png';


export const resourceMap = {
  nanoTubes: {
    increment: 1,
    maxAmount: 8,
    greenImg: nanoTubesGreen,
    blackImg: nanoTubesBlack,
  },
  unobtanium: {
    increment: 2,
    maxAmount: 7,
    greenImg: unobtaniumGreen,
    blackImg: unobtaniumBlack,
  },
  energyPlankton: {
    increment: 3,
    maxAmount: 6,
    greenImg: planktonGreen,
    blackImg: planktonBlack,
  },
  giantSpiderSilk: {
    increment: 4,
    maxAmount: 5,
    greenImg: spiderSilkGreen,
    blackImg: spiderSilkBlack,
  },
  rifles: {
    increment: 5,
    maxAmount: 4,
    greenImg: riflesGreen,
    blackImg: riflesBlack,
  },
  soylent: {
    increment: 1,
    maxAmount: 15,
    greenImg: soylentGreen,
    blackImg: soylentBlack,
  }
}
