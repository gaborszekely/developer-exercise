import React from "react"
import PropTypes from "prop-types"

const ContributionMarginRow = ({ contributionMargin }) => {
  return (
    <tr>
      <td>Contribution Margin</td>
      <td />
      <td />
      <td>{contributionMargin}%</td>
    </tr>
  )
}

ContributionMarginRow.propTypes = {
  contributionMargin: PropTypes.string.isRequired
}

export default ContributionMarginRow
