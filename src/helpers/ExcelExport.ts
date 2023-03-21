import LoanState from '../store/types/LoanState';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import moment from 'moment';
import {LoanHelper, MembersHelper, SettingsHelper} from '../firebase/helpers';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {PermissionsAndroid} from 'react-native';

enum Header {
  MEMBER_NAME = 'सदस्य का नाम',
  GROUP = 'ग्रुप',

  PRINCIPLE_1 = 'ऋण 1%',
  PRINCIPLE_1_PAID = 'ऋण 1% जमा',
  PRINCIPLE_2 = 'ऋण 2%',
  PRINCIPLE_2_PAID = 'ऋण 2% जमा',
  PRINCIPLE_2_5 = 'विशेष ऋण',
  PRINCIPLE_2_5_PAID = 'विशेष ऋण जमा',

  MEMBERSHIP = 'सदस्यता',
  MEMBERSHIP_PAID = 'सदस्यता जमा',

  INTEREST_1 = 'ऋण 1% ब्याज',
  INTEREST_1_PAID = 'ऋण 1% ब्याज जमा',
  INTEREST_2 = 'ऋण 2% ब्याज',
  INTEREST_2_PAID = 'ऋण 2% ब्याज जमा',
  INTEREST_2_5 = 'विशेष ऋण ब्याज',
  INTEREST_2_5_PAID = 'विशेष ऋण ब्याज जमा',

  OTHER = 'अन्य',
  OTHER_PAID = 'अन्य जमा',

  PENALTY = 'जुर्माना',
  PENALTY_PAID = 'जुर्माना जमा',

  TOTAL_DUES = 'कुल बाँकी',
  DAILY_PAID = 'दैनिक जमा',
  MEETING_PAID = 'मीटिंग जमा',
}

type Report = {
  member_name: string;
  group_name: string;
  details: LoanState;
};

export type LoanReport = {
  month: string;
  member_reports: Report[];
};

type WorkSheetData = {
  [key in Exclude<Header, Header.MEMBER_NAME | Header.GROUP>]: number;
} & {
  [Header.MEMBER_NAME]: string;
  [Header.GROUP]: string;
};

const extractData = async (): Promise<LoanReport[]> => {
  const user = auth().currentUser?.uid;
  const membersCol = firestore()
    .collection('Users')
    .doc(user)
    .collection('Members');
  const members = await MembersHelper.fetchMembers();

  const monthlyReport: LoanReport[] = [];

  const months: {
    [key in string]: {
      member_name: string;
      group_name: string;
      details: LoanState;
    }[];
  } = {};

  for (const member of members) {
    const settledDocs = await membersCol
      .doc(member.id)
      .collection('Loans-Settled')
      .get();
    const runningLoansDocs = await membersCol
      .doc(member.id)
      .collection('Loans')
      .get();

    const allDocs = [...settledDocs.docs, ...runningLoansDocs.docs];

    for (const doc of allDocs) {
      const data = doc.data();
      const month = doc.id;

      if (!months[month]) {
        months[month] = [];
      }

      months[month].push({
        member_name: member.name,
        group_name: member.group,
        details: data as LoanState,
      });
    }
  }

  for (const month in months) {
    monthlyReport.push({
      month,
      member_reports: months[month],
    });
  }

  return monthlyReport;
};

const generateExcel = (
  monthlyReport: LoanReport[],
  membership_charge: number,
) => {
  let workBook = XLSX.utils.book_new();
  const header = getWorkSheetHeader();

  for (let i = 0; i < monthlyReport.length; i++) {
    const entry = monthlyReport[i];
    const month = moment(entry.month, 'MM-YYYY').format('MMMM YYYY');

    const worksheetData: WorkSheetData[] = generateWorkSheetData(
      entry.member_reports,
      membership_charge,
    );

    let workSheet = XLSX.utils.json_to_sheet(worksheetData, {
      header: header,
    });
    XLSX.utils.book_append_sheet(workBook, workSheet, month);
  }

  const excelFile = XLSX.write(workBook, {type: 'binary', bookType: 'xlsx'});
  return excelFile;
};

const LoanReport = async () => {
  const loanReport = await extractData();
  const {membership_charge} = (await SettingsHelper.getProfileCharge()) || {
    membership_charge: 0,
  };
  const excelFile = generateExcel(loanReport, membership_charge);

  const fileName = `LoanReport-${moment().format('DD-MM-YYYY')}.xlsx`;
  const filePath = RNFS.DownloadDirectoryPath + '/' + fileName;
  console.log('File Name', filePath);

  RNFS.writeFile(filePath, excelFile, 'ascii')
    .then(() => {
      console.log('Success');
    })
    .catch(e => {
      console.log('Error', e);
    });
};

const ExcelExport = async () => {
  try {
    // Check for Permission (check if permission is already given or not)
    let isPermitedExternalStorage = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (isPermitedExternalStorage) {
      await LoanReport();
      return;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage permission needed',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
        message: 'Storage permission needed to export data to excel',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      await LoanReport();
    } else {
      console.log('Permission denied. Result: ', granted);
    }
  } catch (e) {
    console.log('Error while checking permission');
    console.log(e);
    return;
  }
};

export default ExcelExport;

const getWorkSheetHeader = () => {
  return Object.values(Header);
};

const generateWorkSheetData = (
  member_reports: Report[],
  membership_charge: number,
): WorkSheetData[] => {
  return member_reports.map((report): WorkSheetData => {
    const data: LoanState = getLoanState(report.details);

    const {
      principle_pending1,
      principle_pending2,
      principle_pending2_5,
      recovery1,
      recovery2,
      recovery2_5,
      membership_dues,
      dues1,
      dues2,
      dues2_5,
      extra_fine_pending,
      penalty,
      total_dues,
    } = generateEntry(data, membership_charge);

    return {
      [Header.MEMBER_NAME]: report.member_name,
      [Header.GROUP]: report.group_name,

      [Header.PRINCIPLE_1]: Math.round(principle_pending1),
      [Header.PRINCIPLE_1_PAID]: Math.round(recovery1),
      [Header.PRINCIPLE_2]: Math.round(principle_pending2),
      [Header.PRINCIPLE_2_PAID]: Math.round(recovery2),
      [Header.PRINCIPLE_2_5]: Math.round(principle_pending2_5),
      [Header.PRINCIPLE_2_5_PAID]: Math.round(recovery2_5),

      [Header.MEMBERSHIP]: Math.round(membership_dues),
      [Header.MEMBERSHIP_PAID]: Math.round(data.membership),

      [Header.INTEREST_1]: Math.round(dues1),
      [Header.INTEREST_1_PAID]: Math.round(data.interest1),
      [Header.INTEREST_2]: Math.round(dues2),
      [Header.INTEREST_2_PAID]: Math.round(data.interest2),
      [Header.INTEREST_2_5]: Math.round(dues2_5),
      [Header.INTEREST_2_5_PAID]: Math.round(data.interest2_5),

      [Header.OTHER]: Math.round(extra_fine_pending),
      [Header.OTHER_PAID]: Math.round(data.extra_fine_paid),

      [Header.PENALTY]: Math.round(penalty),
      [Header.PENALTY_PAID]: Math.round(data.fine_paid),

      [Header.TOTAL_DUES]: Math.round(total_dues),
      [Header.DAILY_PAID]: Math.round(data.daily_recovery),
      [Header.MEETING_PAID]: Math.round(data.meeting_recovery),
    };
  });
};

const getLoanState = (details: LoanState): LoanState => {
  return {
    principle_pending1: details.principle_pending1 || 0,
    principle_pending2: details.principle_pending2 || 0,
    principle_pending2_5: details.principle_pending2_5 || 0,

    interest1: details.interest1 || 0,
    interest2: details.interest2 || 0,
    interest2_5: details.interest2_5 || 0,

    interest_pending1: details.interest_pending1 || 0,
    interest_pending2: details.interest_pending2 || 0,
    interest_pending2_5: details.interest_pending2_5 || 0,

    amount1_before15: details.amount1_before15 || 0,
    amount1_after15: details.amount1_after15 || 0,
    amount2_before15: details.amount2_before15 || 0,
    amount2_after15: details.amount2_after15 || 0,
    amount2_5_before15: details.amount2_5_before15 || 0,
    amount2_5_after15: details.amount2_5_after15 || 0,

    principle_previous1_before15: details.principle_previous1_before15 || 0,
    principle_previous1_after15: details.principle_previous1_after15 || 0,
    principle_previous2_before15: details.principle_previous2_before15 || 0,
    principle_previous2_after15: details.principle_previous2_after15 || 0,
    principle_previous2_5_before15: details.principle_previous2_5_before15 || 0,
    principle_previous2_5_after15: details.principle_previous2_5_after15 || 0,

    recovery1_before15: details.recovery1_before15 || 0,
    recovery1_after15: details.recovery1_after15 || 0,
    recovery2_before15: details.recovery2_before15 || 0,
    recovery2_after15: details.recovery2_after15 || 0,
    recovery2_5_before15: details.recovery2_5_before15 || 0,
    recovery2_5_after15: details.recovery2_5_after15 || 0,

    membership_pending: details.membership_pending || 0,
    membership: details.membership || 0,

    extra_fine_pending: details.extra_fine_pending || 0,
    extra_fine_charged: details.extra_fine_charged || 0,
    extra_fine_paid: details.extra_fine_paid || 0,

    fine_pending: details.fine_pending || 0,
    fine_paid: details.fine_paid || 0,
    fine_charged: details.fine_charged || 0,

    daily_recovery: details.daily_recovery || 0,
    meeting_recovery: details.meeting_recovery || 0,

    deduction2_5: details.deduction2_5 || 0,
  };
};

const generateEntry = (data: LoanState, membership_charge: number) => {
  const principle_pending1 =
    data.principle_pending1 +
    data.amount1_before15 +
    data.amount1_after15 +
    data.principle_previous1_before15 +
    data.principle_previous1_after15;

  const principle_pending2 =
    data.principle_pending2 +
    data.amount2_before15 +
    data.amount2_after15 +
    data.principle_previous2_before15 +
    data.principle_previous2_after15;

  const principle_pending2_5 =
    data.principle_pending2_5 +
    data.amount2_5_before15 +
    data.amount2_5_after15 +
    data.principle_previous2_5_before15 +
    data.principle_previous2_5_after15;

  let {dues1, dues2, dues2_5} = LoanHelper.calculateDues(data);
  dues2_5 -= data.deduction2_5; // deduction on 2.5% of total dues

  const recovery1 = data.recovery1_before15 + data.recovery1_after15;
  const recovery2 = data.recovery2_before15 + data.recovery2_after15;
  const recovery2_5 = data.recovery2_5_before15 + data.recovery2_5_after15;

  const membership_dues = data.membership_pending + membership_charge;
  const extra_fine_pending = data.extra_fine_pending + data.extra_fine_charged;

  const penalty = data.fine_pending + data.fine_charged;

  const total_dues =
    dues1 +
    dues2 +
    dues2_5 +
    membership_dues +
    data.fine_pending +
    extra_fine_pending;
  return {
    principle_pending1,
    principle_pending2,
    principle_pending2_5,

    dues1,
    dues2,
    dues2_5,

    recovery1,
    recovery2,
    recovery2_5,

    membership_dues,
    extra_fine_pending,
    penalty,

    total_dues,
  };
};
