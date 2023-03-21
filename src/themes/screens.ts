enum SCREENS {
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  PROFILE = 'PROFILE',
  HOME = 'HOME',
  GROUP = 'GROUP',
  MEMBER = 'MEMBER',
  LOAN_ENTRY = 'LOAN_ENTRY',
  LOAN_RECOVERY = 'LOAN_RECOVERY',
  MONTHLY_MEETING = 'MONTHLY_MEETING',
  REPORT = 'REPORT',
}

export default SCREENS;

type WithoutHome = Exclude<SCREENS, SCREENS.HOME>;

export type APP_SCREENS = {
  [key in WithoutHome]: undefined;
} & {
  [SCREENS.HOME]: {
    fetchDetails: boolean;
  };
};
