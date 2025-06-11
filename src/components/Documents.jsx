import '../styles/Documents.css';

const Documents = () => {
  return (
    <div className="right-column">

      {/* Documents & Contracts */}
      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">Documents & Contracts</h3>
          <button className="add-button">
            <i className="fas fa-plus"></i> Add
          </button>
        </div>
        <div className="documents-list">
          {[
            { icon: 'file-contract', title: 'Service Agreement', subtitle: 'Signed May 1, 2023', color: 'indigo' },
            { icon: 'file-invoice', title: 'Proposal - Q2', subtitle: 'Draft, Updated 3 days ago', color: 'blue' },
            { icon: 'file-signature', title: 'NDA', subtitle: 'Signed Dec 15, 2022', color: 'green' },
          ].map((doc, index) => (
            <div key={index} className="document-card">
              <div className="doc-info">
                <div className={`doc-icon ${doc.color}`}>
                  <i className={`fas fa-${doc.icon}`}></i>
                </div>
                <div>
                  <h4>{doc.title}</h4>
                  <p>{doc.subtitle}</p>
                </div>
              </div>
              <button className="more-options">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </div>
          ))}
        </div>
      </div> 
    </div>
  );
};

export default Documents;
