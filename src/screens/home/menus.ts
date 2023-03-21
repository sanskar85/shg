import {
  GROUP,
  LOAN,
  LOAN_INTEREST,
  LOAN_RECOVERY,
  REPORT,
  SETTINGS,
  USER,
} from '../../assets/Images';
import SCREENS, {APP_SCREENS} from '../../themes/screens';

const menus: Menu[] = [
  {
    title: 'Group',
    icon: GROUP,
    screen: SCREENS.GROUP,
  },
  {
    title: 'Members',
    icon: USER,
    screen: SCREENS.MEMBER,
  },
  {
    title: 'Loan Entry',
    icon: LOAN,
    screen: SCREENS.LOAN_ENTRY,
  },
  {
    title: 'Loan Recovery',
    icon: LOAN_RECOVERY,
    screen: SCREENS.LOAN_RECOVERY,
  },
  {
    title: 'Monthly Meeting',
    icon: LOAN_INTEREST,
    screen: SCREENS.MONTHLY_MEETING,
  },
  {
    title: 'Reports',
    icon: REPORT,
    screen: SCREENS.REPORT,
  },
  {
    title: 'Profile',
    icon: SETTINGS,
    screen: SCREENS.PROFILE,
  },
];

export default menus;

export type Menu = {
  title: string;
  icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  screen: keyof APP_SCREENS;
};
