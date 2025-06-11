import "../styles/ClientActivityTimeline.css";

const ClientActivityTimeline = () => {
  return (
    <main className="main-container">
      <div className="timeline-grid">
        {/* Left Column */}
        <div className="timeline-column">
          {/* Timeline Card */}
          <div className="timeline-card">
            <div className="timeline-header">
              <h3>Client Activity Timeline</h3>
              <button className="view-all">View All</button>
            </div>

            <div className="timeline-list">
              {/* Timeline Item - Email Sent */}
              <div className="timeline-item">
                <div className="timeline-icon email">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="timeline-content">
                  <div className="timeline-title">
                    <h4>Email Sent</h4>
                    <span>Today, 10:30 AM</span>
                  </div>
                  <p>Follow-up regarding project proposal</p>
                  <p className="timeline-subtext">From: you@example.com</p>
                </div>
              </div>

              {/* Timeline Item - Payment Received */}
              <div className="timeline-item">
                <div className="timeline-icon payment">
                  <i className="fas fa-check"></i>
                </div>
                <div className="timeline-content">
                  <div className="timeline-title">
                    <h4>Payment Received</h4>
                    <span>Yesterday, 3:45 PM</span>
                  </div>
                  <p>Invoice #1245 for $2,450.00</p>
                  <p className="timeline-subtext">Method: Credit Card</p>
                </div>
              </div>

              {/* Timeline Item - Phone Call */}
              <div className="timeline-item">
                <div className="timeline-icon phone">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="timeline-content">
                  <div className="timeline-title">
                    <h4>Phone Call</h4>
                    <span>Monday, 11:20 AM</span>
                  </div>
                  <p>Discussion about ongoing project status</p>
                  <p className="timeline-subtext">Duration: 18m 45s</p>
                </div>
              </div>

              {/* Timeline Item - Reminder */}
              <div className="timeline-item">
                <div className="timeline-icon reminder">
                  <i className="fas fa-exclamation"></i>
                </div>
                <div className="timeline-content">
                  <div className="timeline-title">
                    <h4>Follow-Up Reminder</h4>
                    <span>Last Friday, 2:00 PM</span>
                  </div>
                  <p>Review contract renewal options</p>
                  <div className="badge">Pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ClientActivityTimeline;
