import * as Actions from '../actions';
import { examDefaultValues } from './../../Values';

const initialState = {
  patientId: null,
  habitualRx: {
    chiefComplaint: '',
    OD: {
      sphere: 0.0,
      cylinder: 0.0,
      axis: 180,
      add: 0.0
    },
    OS: {
      sphere: 0.0,
      cylinder: 0.0,
      axis: 180,
      add: 0.0
    }
  },
  habitualCLRx: {
    OD: {
      sphere: 0.0,
      cylinder: 0.0,
      axis: 180,
      add: '',
      baseCurve: '',
      dia: '',
      brand: ''
    },
    OS: {
      sphere: 0.0,
      cylinder: 0.0,
      axis: 180,
      add: '',
      baseCurve: '',
      dia: '',
      brand: ''
    }
  },
  uncorrectedDistanceVa: {
    additionalTestNotes: '',
    OD: {
      VAL: 20,
      VAR: 0
    },
    OS: {
      VAL: 20,
      VAR: 0
    },
    OU: {
      VAL: 20,
      VAR: 0
    }
  },
  correctedDistanceVa: {
    additionalTestNotes: '',
    OD: {
      VAL: 20,
      VAR: 0
    },
    OS: {
      VAL: 20,
      VAR: 0
    },
    OU: {
      VAL: 20,
      VAR: 0
    }
  },
  confrontationFields: {
    OD: 'Full',
    OS: 'Full',
    method: 'FC',
    additionalTestNotes: ''
  },
  eom: {
    eom: 'Full & Smooth',
    eomAdditionalTextNote: '',
    pupils: '-',
    pupilsAdditionalTextNote: ''
  },
  subjectiveRefraction: [examDefaultValues.subjectiveRefraction],
  contactLens: [examDefaultValues.contactLens],
  slitLamp: examDefaultValues.slitLamp,
  fundus: {
    OD: {
      vessels: 'Normal CL',
      av: '2/3',
      background: 'CI',
      media: 'CI',
      macula: '+FR',
      postPole: 'Flat Normal',
      vitreous: 'CI',
      disc: 'Distinct',
      peri: 'Flat Attached',
      cd: '0.3'
    },
    OS: {
      vessels: 'Normal CL',
      av: '2/3',
      background: 'CI',
      media: 'CI',
      macula: '+FR',
      postPole: 'Flat Normal',
      vitreous: 'CI',
      disc: 'Distinct',
      peri: 'Flat Attached',
      cd: '0.3'
    },
    deviceOrLensUsed: 'BIO + 90/78D'
  }
};

const examReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.SAVE_EXAM:
      state[action.step] = action.data;
      return {
        ...state
      };
    case Actions.GET_EXAM:
      return { ...state, ...action.data };
    case Actions.EXAM_ERROR:
      return { ...state };
    default:
      return {
        ...state
      };
  }
};
export default examReducer;
