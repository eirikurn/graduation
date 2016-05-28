/* eslint-disable global-require */

export const questions = [
  {
    question: 'Hvað er Berglind með mikinn pening í veskinu sínu?',
    answers: [
      '0 kr',
      '1.560 kr',
      '3.000 kr',
      '5.003 kr',
    ],
  },
  {
    question: 'Hvað eru margar Lottu sýningar planaðar í sumar?',
    answers: [
      '63',
      '62',
      '93',
      '92',
    ],
  },
  {
    question: 'Hvaða vikudag fæddist Hildur?',
    answers: [
      'Föstudag',
      'Fimmtudag',
      'Miðvikudag',
      'Þriðjudag',
    ],
  },
  {
    question: 'Hvað eru margir þættir í allri Friends seríunni?',
    answers: [
      '236',
      '240',
      '244',
      '248',
    ],
  },
  {
    question: 'Hvað eru margir kílómetrar frá Keflavík til Mallorca í beinu flugi',
    answers: [
      '3186',
      '2811',
      '2940',
      '3097',
    ],
  },
  {
    question: 'Hvað þarftu að bíða lengi ef þú klúðrar þessari spurningu?',
    answers: [
      '6 mínútur',
      '9 mínútur',
      '8 mínútur',
      '7 mínútur',
    ],
  },
  {
    question: 'Hvað er Alexander Orri gamall?',
    answers: [
      '702 daga',
      '701 dags',
      '700 daga',
      '703 daga',
    ],
  },
]

export const failImages = [
  require('./images/fail1.jpg'),
  require('./images/fail2.jpg'),
  require('./images/fail3.jpg'),
  require('./images/fail4.jpg'),
  require('./images/fail5.jpg'),
]

export const failTexts = [
  'Ahh, þar fór í verra. Nú þarftu bara að bíða smá…',
  'Vissiru þetta ekki?? Jæja, bíddu þá aðeins…',
  'Bara svo þú vitir. Berglind samdi allar spurningarnar.',
  'Þetta var nú alveg augljóst. Reyndu aftur…',
  'Úps! Þetta var lélegt gisk. Reyndu aftur eftir smá…',
]

export const waitTime = 60000
export const questionTime = 8000
