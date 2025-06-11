import React from 'react';
import '../styles/InvoiceTracking.css';

const InvoiceTracking = () => {
  return (
    <div className="invoice-tracking">
      <div className="header">
        <h3>Invoice & Payment Tracking</h3>
        <button className="view-all">View All</button>
      </div>

      <div className="summary-grid">
        <div className="summary-card owed">
          <div className="summary-header">
            <h4>Total Owed</h4>
            <i className="fas fa-file-invoice-dollar"></i>
          </div>
          <p className="amount">$8,420.00</p>
          <p className="details">from 3 invoices</p>
        </div>

        <div className="summary-card received">
          <div className="summary-header">
            <h4>Received This Month</h4>
            <i className="fas fa-hand-holding-usd"></i>
          </div>
          <p className="amount">$5,650.00</p>
          <p className="details">from 2 payments</p>
        </div>

        <div className="summary-card overdue">
          <div className="summary-header">
            <h4>Overdue</h4>
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <p className="amount">$2,770.00</p>
          <p className="details">from 1 invoice</p>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="blink">
              <td>#1248</td>
              <td>Jun 1, 2023</td>
              <td>$2,770.00</td>
              <td><span className="status overdue">Overdue (14 days)</span></td>
              <td><button className="action-btn">Send Reminder</button></td>
            </tr>
            <tr>
              <td>#1245</td>
              <td>May 28, 2023</td>
              <td>$2,450.00</td>
              <td><span className="status paid">Paid</span></td>
              <td><button className="action-btn">View</button></td>
            </tr>
            <tr>
              <td>#1241</td>
              <td>May 15, 2023</td>
              <td>$3,200.00</td>
              <td><span className="status due">Due in 3 days</span></td>
              <td><button className="action-btn">Send Reminder</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceTracking;
