import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ClientActivityTimeline from "./ClientActivityTimeline";
import InvoiceTracking from "./invoiceTracking";
import QuickActions from "./quickActions";
import PerformanceCard from "./perfromanceCard";
import Documents from "./Documents";
import "../styles/clientReportHeader.css";

const ClientHeader = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch(`/api/clients/${id}`);
        const data = await res.json();
        setClient(data);
      } catch (error) {
        console.error("Failed to fetch client:", error);
      }
    };

    fetchClient();
  }, [id]);

  if (!client) return <div>Loading...</div>;

  return (
    <div className="client-header bg-white shadow-sm">
      <div className="header-top px-6 pt-6 pb-4 border-b">
        <div className="header-flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="client-info flex items-center mb-4 md:mb-0">
            <div className="avatar h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold mr-4"></div>
            <div>
              <h1 className="client-name text-2xl font-bold text-gray-800">
                {client.companyName}
              </h1>
              <h1 className="client-name-fullName">{client.fullName}</h1>
              <div className="client-websiteUrl flex items-center">
                <span className="websiteUrl text-sm text-gray-600 mr-3">
                  {client.websiteUrl
                    ? client.websiteUrl
                        .replace(/^https?:\/\/(www\.)?/, "")
                        .replace(/^www\./, "")
                    : "No Website"}
                </span>
              </div>
            </div>
          </div>

          <div className="header-actions flex flex-wrap gap-2">
            <button className="btn btn-primary px-4 py-2 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <i className="email-icon fas fa-envelope mr-2"></i> Email
            </button>
            <button className="btn btn-outline-indigo px-4 py-2 rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <i className="meeting-icon fas fa-calendar mr-2"></i> Meeting
            </button>
            <button className="btn btn-outline-gray px-4 py-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500">
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="header-nav px-6 pt-3 pb-4">
        <div className="nav-links flex overflow-x-auto custom-scrollbar pb-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`nav-link-btn ${
              activeTab === "overview" ? "active" : ""
            }`}
          >
            Overview
          </button>
          <a
            href="#"
            className="nav-link-btn px-4 py-2 text-sm font-medium whitespace-nowrap"
          >
            Documents
          </a>
          <a
            href="#"
            className="nav-link-btn px-4 py-2 text-sm font-medium whitespace-nowrap"
          >
            Invoices
          </a>
          <a
            href="#"
            className="nav-link-btn px-4 py-2 text-sm font-medium whitespace-nowrap"
          >
            Projects
          </a>
          <a
            href="#"
            className="nav-link-btn px-4 py-2 text-sm font-medium whitespace-nowrap"
          >
            Communications
          </a>
          <a
            href="#"
            className="nav-link-btn px-4 py-2 text-sm font-medium whitespace-nowrap"
          >
            Settings
          </a>
        </div>
      </div>

      <div className="tab-content">
        {activeTab === "overview" && (
          <div className="horizontal-wrapper">
            <div className="left-column">
              <ClientActivityTimeline />
               <InvoiceTracking />
            </div>
            <div className="right-column">
              <QuickActions />
              <PerformanceCard/>
              <Documents/>
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Documents</h2>
            <p>Display documents related to the client here.</p>
          </div>
        )}

        {activeTab === "invoices" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Invoices</h2>
            <p>Invoices data will be shown here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientHeader;
