import React, { Component } from "react"
import { Form, Button } from "react-bootstrap"
import PropTypes from "prop-types"
import "./settimeperiod.css"

class SetTimePeriod extends Component {
  static propTypes = {
    timePeriod: PropTypes.number.isRequired,
    handleTimePeriodChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      newTimePeriod: this.props.timePeriod
    }
    this.handleNewPeriodChange = this.handleNewPeriodChange.bind(this)
    this.updateTimePeriod = this.updateTimePeriod.bind(this)
  }

  handleNewPeriodChange(e) {
    this.setState({ newTimePeriod: Number(e.target.value) })
  }

  updateTimePeriod() {
    const { newTimePeriod } = this.state
    if (newTimePeriod !== this.props.timePeriod) {
      this.props.handleTimePeriodChange(newTimePeriod)
    }
  }

  render() {
    return (
      <div className="set-time-period-wrapper">
        <div className="time-period-select-wrapper">
          <Form.Control
            as="select"
            onChange={this.handleNewPeriodChange}
            value={this.state.newTimePeriod}
          >
            <option value={12}>1 year</option>
            <option value={24}>2 years</option>
            <option value={36}>3 years</option>
            <option value={48}>4 years</option>
            <option value={60}>5 years</option>
          </Form.Control>
          <Button
            className="time-period-update-button"
            onClick={this.updateTimePeriod}
          >
            Set Time Period
          </Button>
        </div>
      </div>
    )
  }
}

export default SetTimePeriod
