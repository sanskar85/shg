type LoanState = {
  principle_pending1: number;
  principle_pending2: number;
  principle_pending2_5: number;

  principle_previous1_before15: number;
  principle_previous1_after15: number;
  principle_previous2_before15: number;
  principle_previous2_after15: number;
  principle_previous2_5_before15: number;
  principle_previous2_5_after15: number;

  // Loan Given of amount in tax slab
  amount1_before15: number;
  amount1_after15: number;
  amount2_before15: number;
  amount2_after15: number;
  amount2_5_before15: number;
  amount2_5_after15: number;

  // Loan recovered of amount in tax slab
  recovery1_before15: number;
  recovery1_after15: number;
  recovery2_before15: number;
  recovery2_after15: number;
  recovery2_5_before15: number;
  recovery2_5_after15: number;

  interest1: number;
  interest2: number;
  interest2_5: number;

  interest_pending1: number;
  interest_pending2: number;
  interest_pending2_5: number;

  membership: number;
  membership_pending: number;

  fine_charged: number;
  fine_pending: number;
  fine_paid: number;

  meeting_recovery: number;
  daily_recovery: number;

  extra_fine_paid: number;
  extra_fine_charged: number;
  extra_fine_pending: number;

  deduction2_5: number;
};

export default LoanState;
