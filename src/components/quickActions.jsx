import '../styles/quickActions.css';

const QuickActions = () => {
  return (
    <div className="right-column">
      <div className="panel">
        <h3 className="panel-title">Quick Actions</h3>
        <div className="actions-grid">
          {[
            { icon: 'envelope', text: 'Send Email', color: 'blue' },
            { icon: 'calendar-check', text: 'Schedule Call', color: 'indigo' },
            { icon: 'file-invoice', text: 'Create Invoice', color: 'green' },
            { icon: 'tasks', text: 'Add Task', color: 'purple' },
            { icon: 'file-contract', text: 'New Contract', color: 'yellow' },
            { icon: 'file-export', text: 'Export Data', color: 'red' },
          ].map((action, index) => (
            <button key={index} className="action-button">
              <div className={`icon-wrapper ${action.color}`}>
                <i className={`fas fa-${action.icon}`}></i>
              </div>
              <span>{action.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
