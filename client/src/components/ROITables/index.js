import React, { useMemo } from "react"
import PropTypes from "prop-types"
import Transactions from "../Transactions"
import Totals from "../Totals"
import TransactionTotalsRow from "../TransactionTotalsRow"
import ContributionMarginRow from "../ContributionMarginRow"
import ContributionProfitRow from "../ContributionProfitRow"
import CapitalROIRow from "../CapitalROIRow"
import {
  getOneTime,
  getMonthly,
  getTotal,
  getContributionProfit,
  getContributionMargin,
  getCapitalROI
} from "../../utils/roiCalc"
import "./roitable.css"
import { transactionProp } from "../../proptypes/transaction"

const ROITables = ({
  revenue,
  expenses,
  handleDelete,
  handleUpdate,
  timePeriod
}) => {
  let oneTimeRevenue = getOneTime(revenue)
  let oneTimeExpense = getOneTime(expenses)
  let monthlyRevenue = getMonthly(revenue)
  let monthlyExpense = getMonthly(expenses)

  let totalRevenue = getTotal(oneTimeRevenue, monthlyRevenue, timePeriod)
  let totalExpense = getTotal(oneTimeExpense, monthlyExpense, timePeriod)

  let monthlyContributionProfit = getContributionProfit(
    monthlyRevenue,
    monthlyExpense
  )

  let totalContributionProfit = getContributionProfit(
    totalRevenue,
    totalExpense
  )

  let contributionMargin = getContributionMargin(
    totalContributionProfit,
    totalRevenue
  )

  let capitalROI = useMemo(
    () =>
      getCapitalROI(
        totalRevenue,
        totalExpense,
        oneTimeRevenue,
        oneTimeExpense,
        monthlyContributionProfit
      ),
    [totalRevenue, totalExpense]
  )

  return (
    <div className="roi-tables">
      <Transactions
        type="revenue"
        transactions={revenue}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
      <Transactions
        type="expenses"
        transactions={expenses}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
      <Totals>
        <TransactionTotalsRow
          title="Revenue"
          oneTime={oneTimeRevenue}
          monthly={monthlyRevenue}
          total={totalRevenue}
        />
        <TransactionTotalsRow
          title="Expenses"
          oneTime={oneTimeExpense}
          monthly={monthlyExpense}
          total={totalExpense}
        />
        <ContributionProfitRow
          monthlyContributionProfit={monthlyContributionProfit}
          totalContributionProfit={totalContributionProfit}
        />
        <ContributionMarginRow contributionMargin={contributionMargin} />
        <CapitalROIRow capitalROI={capitalROI} />
      </Totals>
    </div>
  )
}

ROITables.propTypes = {
  revenue: PropTypes.arrayOf(transactionProp.isRequired).isRequired,
  revenue: PropTypes.arrayOf(transactionProp.isRequired).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  timePeriod: PropTypes.number.isRequired
}

export default ROITables
