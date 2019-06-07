export const AxisValues = Array.from(Array(181).keys(), x => parseInt(x));
export const IOPValues = Array.from(Array(100).keys());
export const AddValues = Array.from(Array(50), (_, x) =>
  parseFloat((x * 0.25).toFixed(2))
);
export const SphereValues = Array.from(Array(160 - -160 + 1).keys()).map(i =>
  parseFloat(((i + -160) * 0.25).toFixed(2))
);
export const CylinderValues = Array.from(Array(50 - -50 + 1).keys()).map(i =>
  parseFloat(((i + -50) * 0.25).toFixed(2))
);
export const VisualAccuityValues = [...Array.from(Array(81), (_, x) => x * 5), ...['HM', 'CF', 'NLP', 'LP']];
export const CFValues = [
  'Full',
  'General Restriction',
  'Sup Nasal Restriction',
  'Inf Nasal Restriction',
  'Nasal Restriction',
  'Sup Temporal Restriction',
  'Inf Temporal Restriction',
  'Temporal Restriction'
];
export const CFMethodValues = ['FC', 'FDT', 'HVF'];

export const examDefaultValues = {
  subjectiveRefraction: {
    OD: {
      sphere: 0.0,
      cylinder: 0.0,
      axis: 180,
      add: 0.0,
      DVA: [20, 20],
      NVA: [20, 20]
    },
    OS: {
      sphere: 0.0,
      cylinder: 0.0,
      axis: 180,
      add: 0.0,
      DVA: [20, 20],
      NVA: [20, 20]
    },
    intendedFor: '',
    isFinal: false
  },
  contactLens: {
    OD: {
      sphere: 0.0,
      cylinder: 0.0,
      axis: 180,
      add: '',
      baseCurve: '',
      dia: '',
      brand: '',
      centred: true,
      goodMovement: true,
      dva: [20, 20],
    },
    OS: {
      sphere: 0.0,
      cylinder: 0.0,
      axis: 180,
      add: '',
      baseCurve: '',
      dia: '',
      brand: '',
      centred: true,
      goodMovement: true,
      dva: [20, 20],
    },
    dispensed: false,
    ordered: false,
    IRPerformed: false,
    additionalTestNotes: '',
    isFinal: false
  },
  slitLamp: {
    OD: {
      tears: 'CI',
      lidsAndLashes: 'CI',
      cornea: 'CI',
      palpConj: 'Q',
      bulbConj: 'Q',
      antCh: 'D & Q',
      iris: 'Flat',
      lens: 'CI',
      antVit: 'CI',
      angle: '4'
    },
    OS: {
      tears: 'CI',
      lidsAndLashes: 'CI',
      cornea: 'CI',
      palpConj: 'Q',
      bulbConj: 'Q',
      antCh: 'D & Q',
      iris: 'Flat',
      lens: 'CI',
      antVit: 'CI',
      angle: '4'
    },
    dilation: '',
    patientRefused: false,
    patientRescheduled: false,
    onePercentTropicamide: false,
    halfPercentTropicamide: false,
    twoAndHalfPercentTropicamide: false,
    paramyd: false
  }
}
export const insuranceProviders = [];

export const states = [
  {
    name: "Alabama",
    code: "AL"
  },
  {
    name: "Arizona",
    code: "AZ"
  },
  {
    name: "Arkansas",
    code: "AR"
  },
  {
    name: "California",
    code: "CA"
  },
  {
    name: "Connecticut",
    code: "CT"
  },
  {
    name: "Delaware",
    code: "DE"
  },
  {
    name: "Florida",
    code: "FL"
  },
  {
    name: "Georgia",
    code: "GA"
  },
  {
    name: "Hawaii",
    code: "HI"
  },
  {
    name: "Idaho",
    code: "ID"
  },
  {
    name: "Illinois",
    code: "IL"
  },
  {
    name: "Indiana",
    code: "IN"
  },
  {
    name: "Iowa",
    code: "IA"
  },
  {
    name: "Kansas",
    code: "KS"
  }, {
    name: "Kentucky",
    code: "KY"
  },
  {
    name: "Louisiana",
    code: "LA"
  },
  {
    name: "Maine",
    code: "ME"
  },
  {
    name: "Maryland",
    code: "MD"
  },
  {
    name: "Massachusetts",
    code: "MA"
  }, {
    name: "Michigan",
    code: "MI"
  },
  {
    name: "Minnesota",
    code: "MN"
  },
  {
    name: "Mississippi",
    code: "MS"
  },
  {
    name: "Missouri",
    code: "MO"
  },
  {
    name: "Montana",
    code: "MT"
  },
  {
    name: "Nebraska",
    code: "NE"
  },
  {
    name: "Nevada",
    code: "NV"
  },
  {
    name: "New Hampshire",
    code: "NH"
  }, {
    name: "New Jersey",
    code: "NJ"
  }, {
    name: "New Mexico",
    code: "NM"
  },
  {
    name: "New York",
    code: "NY"
  },
  {
    name: "North Carolina",
    code: "NC"
  },
  {
    name: "North Dakota",
    code: "ND"
  },
  {
    name: "Ohio",
    code: "OH"
  },
  {
    name: "Oklahoma",
    code: "OK"
  },
  {
    name: "Oregon",
    code: "OR"
  },
  {
    name: "Pennsylvania",
    code: "PA"
  },
  {
    name: "Rhode Island",
    code: "RI"
  },
  {
    name: "South Carolina",
    code: "SC"
  },
  {
    name: "South Dakota",
    code: "SD"
  },
  {
    name: "Tennessee",
    code: "TN"
  },
  {
    name: "Texas",
    code: "TX"
  },
  {
    name: "Utah",
    code: "UT"
  },
  {
    name: "Vermont",
    code: "VT"
  },
  {
    name: "Virginia",
    code: "VA"
  },
  {
    name: "Washington",
    code: "WA"
  },
  {
    name: "West Virginia",
    code: "WV"
  },
  {
    name: "Wisconsin",
    code: "WI"
  },
  {
    name: "Wyoming",
    code: "WY"
  }

]
