/* Product facts are transcribed from the supplied NORIX packaging documents. */
window.NORIX_PRODUCTS = {
  products: [
    {
      id: 'bnx-1101',
      name: 'Digital Blood Pressure Monitor',
      model: 'BNX-1101',
      category: 'Blood pressure monitoring',
      description: 'An automatic upper-arm blood pressure monitor with an LCD display, memory recall, and arrhythmia detection.',
      image: 'images/product-bnx-1101.jpg',
      imageAlt: 'NORIX BNX-1101 blood pressure monitor, front view',
      imageWidth: 505,
      imageHeight: 505,
      features: [
        'Oscillometric measurement method',
        '2 × 99 memory recall',
        'Arrhythmia detection',
        'Backlit display and one-touch operation',
        'Automatic inflation and deflation',
        'USB-C cable operation and automatic shutoff'
      ],
      specifications: [
        ['Applicable arm circumference', '22 cm – 36 cm'],
        ['Measurement method', 'Oscillometric Method'],
        ['Display method', 'LCD Digital Display'],
        ['Pressure measurement range', '0 mmHg – 280 mmHg (0 kPa – 37.3 kPa)'],
        ['Pulse measurement range', '40 beats/min – 199 beats/min'],
        ['Pressure accuracy', '±3 mmHg (±0.4 kPa)'],
        ['Pulse allowable error', '±5%'],
        ['Power supply', 'DC.6V Power supply (220V), 1.5V × 4 AAA Batteries'],
        ['Storage and transport temperature', '-20°C – 55°C'],
        ['Storage and transport relative humidity', '10% – 93% RH'],
        ['Storage and transport atmospheric pressure range', '50 kPa – 106 kPa'],
        ['Normal working temperature', '+5°C – 40°C'],
        ['Normal working relative humidity', '15% – 80% RH'],
        ['Normal working atmospheric pressure range', '70 kPa – 106 kPa'],
        ['Weight', 'About 245 g (Excluding Batteries)'],
        ['Dimensions (approx.)', '148 mm × 103 mm × 70 mm (LWH)'],
        ['Inflation / deflation', 'Automatic'],
        ['Screen size and type', '8Inc (approx) & Backlit']
      ],
      applications: [
        'For home monitoring only, according to the supplied package disclaimer.',
        'The package diagrams show the cuff on the upper left arm, with the tube centered toward the middle of the arm and about one finger gap between cuff and arm. They also show sitting with feet flat, legs uncrossed, and the back supported.',
        'The package states that the monitor is not a substitute for professional medical diagnosis or treatment.'
      ],
      accessories: [
        'BP monitor',
        'Arm cuff',
        'Storage bag / protective case',
        'Battery',
        'USB-C cable',
        'User manual with warranty page'
      ],
      warranty: '3 years (as printed on the supplied package artwork).',
      related: ['bnx-1151', 'pnx-1301', 'tnx-1201'],
      sourceLabel: 'Source: NORIX BP packaging artwork supplied for BNX-1101.'
    },
    {
      id: 'bnx-1151',
      name: 'Digital Blood Pressure Monitor',
      model: 'BNX-1151',
      category: 'Blood pressure monitoring',
      description: 'A rechargeable blood pressure monitor with a large colour display and AFib and MAP indicators, as shown on the supplied package artwork.',
      image: 'images/product-bnx-1151.png',
      imageAlt: 'NORIX BNX-1151 blood pressure monitor with arm cuff and green display',
      imageWidth: 387,
      imageHeight: 379,
      features: [
        'Atrial fibrillation (AFib) indicator',
        'Mean arterial pressure (MAP) indicator',
        'Rechargeable battery',
        'Large 9.5 cm LCD acrylic panel',
        'Three-colour mode',
        '2 × 99 memory recall and one-touch operation',
        'USB-operated C cable and automatic turn-off'
      ],
      specifications: [],
      specificationNotice: 'The supplied box artwork labels the front product BNX-1151, but its parameter table identifies the model as BNX-1001. To avoid assigning specifications to the wrong model, the table is withheld pending confirmation. The package artwork lists a 3-year warranty and describes the device for home and professional use.',
      applications: ['The supplied package artwork indicates home and professional use.'],
      accessories: [],
      warranty: '3 years (as printed on the supplied package artwork).',
      related: ['bnx-1101', 'pnx-1301', 'tnx-1201'],
      sourceLabel: 'Source: BNX-1151 product-panel artwork supplied. Parameter-panel model mismatch requires confirmation.'
    },
    {
      id: 'pnx-1301',
      name: 'Pulse Oximeter',
      model: 'PNX-1301',
      category: 'Oxygen saturation and pulse monitoring',
      description: 'A fingertip pulse oximeter for measuring SpO₂ and pulse rate, with automatic shutdown and a rotating display.',
      image: 'images/product-pnx-1301.png',
      imageAlt: 'NORIX PNX-1301 fingertip pulse oximeter with display',
      imageWidth: 270,
      imageHeight: 406,
      features: [
        'Measurement time: 8 seconds',
        'Design screen rotation',
        'One-touch operation',
        'Automatic shutdown',
        'Comfort silicone mat'
      ],
      specifications: [
        ['SpO₂ measuring range', '70%–99%'],
        ['Measurement accuracy', '±2% within 80%–99%; ±3% within 70%–79%; <70%, not defined'],
        ['Resolution', '±1%'],
        ['Pulse rate', '30 BPM–240 BPM'],
        ['Pulse rate accuracy', '±1 BPM or ±1% of the measured value (whichever is greater)'],
        ['Display mode', 'TFT'],
        ['Display', 'OLED'],
        ['Working power', '≤30 mA'],
        ['Battery', '1.5 V, 2 AAA batteries'],
        ['Product weight', '31.3 Gm (without battery)'],
        ['Dimensions', '5.78 × 3.13 × 3.59 cm'],
        ['Storage temperature (source label)', '5°C–40°C'],
        ['Ambient humidity', 'Working: 15%–80%; Storage: 10%–80%'],
        ['Atmospheric pressure', '70 kPa–106 kPa']
      ],
      specificationNotice: 'The source lists both “Display Mode: TFT” and “Display: OLED.” It also labels 70 kPa–106 kPa as the operating temperature, which uses pressure units; the actual operating-temperature range is not specified. These source entries are not reconciled here.',
      applications: ['Measures oxygen saturation (SpO₂) and pulse rate. Other intended users or environments are not specified in the supplied sheet.'],
      accessories: ['1 main unit', '2 AAA batteries', 'User manual'],
      warranty: '1 year (as printed on the supplied package artwork).',
      related: ['bnx-1101', 'bnx-1151', 'tnx-1201'],
      sourceLabel: 'Source: NORIX PL packaging artwork for PNX-1301.'
    },
    {
      id: 'tnx-1201',
      name: 'Digital Thermometer',
      model: 'TNX-1201',
      category: 'Temperature monitoring',
      description: 'A flexible-tip digital thermometer with one-touch operation, a beep sound, and last-reading recall.',
      image: 'images/product-tnx-1201.png',
      imageAlt: 'NORIX TNX-1201 flexible-tip digital thermometer',
      imageWidth: 139,
      imageHeight: 774,
      features: [
        'Flexible tip',
        'One-touch operation',
        'Recalls the last reading',
        'Loud beep sound',
        'LCD display',
        'Toggle between °F and °C'
      ],
      specifications: [
        ['Measurement time', '60 sec.'],
        ['Measurement range', '89.6°F–109.2°F'],
        ['Accuracy', '±0.2 degree °F'],
        ['Display', 'LCD display']
      ],
      applications: ['Intended to measure human body temperature orally, rectally, or under the arm.'],
      accessories: ['Thermometer', 'Battery (type not specified)', 'Storage case / sleeve', 'Instruction manual'],
      warranty: '1 year (as printed on the supplied package artwork).',
      related: ['bnx-1101', 'bnx-1151', 'pnx-1301'],
      sourceLabel: 'Source: NORIX thermometer box artwork for TNX-1201.'
    }
  ],
  unresolvedDocument: {
    frontModel: 'BNX-1151',
    parameterTableModel: 'BNX-1001',
    note: 'The BP01255 package artwork pairs a BNX-1151 front panel with a BNX-1001 parameter table. Confirm the intended model/specification mapping before publishing those parameter values.'
  }
};
