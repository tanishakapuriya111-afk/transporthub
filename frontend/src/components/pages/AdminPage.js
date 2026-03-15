import React, { useState, useEffect } from "react";
import { getAllContacts, markContactAsRead, replyToContact } from "../../services/contactService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { MdBlock, MdRefresh, MdMailOutline, MdSend, MdExpandMore, MdExpandLess } from "react-icons/md";
import { appConfig } from "../../config/appConfig";
import './AdminPage.scss';

const AdminPage = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // all, new, read, replied
  const [markingAsRead, setMarkingAsRead] = useState(null);
  const [replyOpen, setReplyOpen] = useState({}); // { contactId: bool }
  const [replyText, setReplyText] = useState({}); // { contactId: string }
  const [replying, setReplying] = useState(null); // contactId currently sending

  // Check if user is admin
  const isAdmin = currentUser?.email === appConfig.adminEmails;

  useEffect(() => {
    // Check admin access
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    if (!isAdmin) {
      navigate("/");
      return;
    }

    loadContacts();
  }, [isAuthenticated, isAdmin, navigate]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await getAllContacts();
      setContacts(data);
      if (data.length === 0) {
        toast.info('No contact inquiries found');
      }
    } catch (err) {
      setError("Failed to load contacts");
      toast.error('Failed to load contact inquiries');
      console.error("Error loading contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (contactId) => {
    try {
      setMarkingAsRead(contactId);
      await markContactAsRead(contactId);
      // Update the local state
      setContacts((prev) =>
        prev.map((contact) => (contact.id === contactId ? { ...contact, read: true, status: "read" } : contact))
      );
      toast.success('Marked as read successfully');
    } catch (err) {
      console.error("Error marking as read:", err);
      toast.error('Failed to mark as read');
    } finally {
      setMarkingAsRead(null);
    }
  };

  const handleReply = async (contact) => {
    const msg = (replyText[contact.id] || '').trim();
    if (!msg) { toast.warn('Please write a reply message.'); return; }
    setReplying(contact.id);
    const result = await replyToContact(contact.id, msg);
    setReplying(null);
    if (result.success) {
      toast.success(`Reply sent to ${contact.email}!`);
      setContacts(prev => prev.map(c =>
        c.id === contact.id
          ? { ...c, status: 'replied', read: true, replyMessage: msg, repliedAt: new Date().toISOString() }
          : c
      ));
      setReplyOpen(prev => ({ ...prev, [contact.id]: false }));
      setReplyText(prev => ({ ...prev, [contact.id]: '' }));
    } else {
      toast.error(result.message || 'Failed to send reply.');
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  const getStatusBadge = (status, read) => {
    if (!read) return <span className="status-badge new">New</span>;
    switch (status) {
      case "read":
        return <span className="status-badge read">Read</span>;
      case "replied":
        return <span className="status-badge replied">Replied</span>;
      default:
        return <span className="status-badge new">New</span>;
    }
  };

  const filteredContacts = contacts.filter((contact) => {
    if (filter === "all") return true;
    if (filter === "new") return !contact.read;
    return contact.status === filter;
  });

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading contacts...</p>
        </div>
      </div>
    );
  }

  // Show access denied for non-admin users
  if (isAuthenticated && !isAdmin) {
    return (
      <div className="page-container">
        <div className="access-denied-container">
          <div className="access-denied-icon"><MdBlock /></div>
          <h2>Access Denied</h2>
          <p>You don't have permission to access the admin panel.</p>
          <p>Only site administrators can view this page.</p>
          <button onClick={() => navigate("/")} className="back-home-btn">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <p>{error}</p>
          <button onClick={loadContacts} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title">Contact Messages</h1>
          <p className="page-subtitle">Manage and respond to customer inquiries</p>
        </div>
      </section>

      {/* Admin Controls */}
      <section className="admin-controls">
        <div className="container">
          <div className="controls-header">
            <div className="stats-summary">
              <div className="stat-item">
                <span className="stat-number">{contacts.length}</span>
                <span className="stat-label">Total Messages</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{contacts.filter((c) => !c.read).length}</span>
                <span className="stat-label">Unread</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{contacts.filter((c) => c.status === "replied").length}</span>
                <span className="stat-label">Replied</span>
              </div>
            </div>

            <div className="filter-controls">
              <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
                <option value="all">All Messages</option>
                <option value="new">New Messages</option>
                <option value="read">Read Messages</option>
                <option value="replied">Replied Messages</option>
              </select>

              <button onClick={loadContacts} className="refresh-btn">
                <MdRefresh style={{verticalAlign: 'middle', marginRight: '8px'}} /> Refresh
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts List */}
      <section className="contacts-list-section">
        <div className="container">
          {filteredContacts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon"><MdMailOutline /></div>
              <h3>No messages found</h3>
              <p>There are no messages matching your current filter.</p>
            </div>
          ) : (
            <div className="contacts-grid">
              {filteredContacts.map((contact) => (
                <div key={contact.id} className={`contact-card ${!contact.read ? "unread" : ""}`}>
                  <div className="contact-header">
                    <div className="contact-info">
                      <h3>{contact.name}</h3>
                      <p className="contact-email">{contact.email}</p>
                      {contact.company && <p className="contact-company">{contact.company}</p>}
                    </div>
                    <div className="contact-meta">
                      {getStatusBadge(contact.status, contact.read)}
                      <span className="contact-date">{formatDate(contact.createdAt)}</span>
                    </div>
                  </div>

                  <div className="contact-subject">
                    <strong>Subject:</strong>
                    <span>{contact.subject}</span>
                  </div>

                  <div className="contact-message">
                    <strong>Message:</strong>
                    <p>{contact.message}</p>
                  </div>

                  <div className="contact-actions">
                    {!contact.read && (
                      <button
                        onClick={() => handleMarkAsRead(contact.id)}
                        className="mark-read-btn"
                        disabled={markingAsRead === contact.id}
                      >
                        {markingAsRead === contact.id ? (<><span className="btn-spinner" /> Marking...</>) : 'Mark as Read'}
                      </button>
                    )}
                    <button
                      className="reply-btn"
                      onClick={() => setReplyOpen(prev => ({ ...prev, [contact.id]: !prev[contact.id] }))}
                    >
                      {replyOpen[contact.id] ? <MdExpandLess style={{verticalAlign:'middle',marginRight:4}} /> : <MdSend style={{verticalAlign:'middle',marginRight:4}} />}
                      {replyOpen[contact.id] ? 'Cancel' : (contact.status === 'replied' ? 'Reply Again' : 'Reply')}
                    </button>
                  </div>

                  {/* Inline reply box */}
                  {replyOpen[contact.id] && (
                    <div className="reply-box">
                      {contact.replyMessage && (
                        <div className="reply-prev">
                          <span>Previous reply:</span>
                          <p>{contact.replyMessage}</p>
                        </div>
                      )}
                      <textarea
                        className="reply-textarea"
                        rows={4}
                        placeholder={`Write your reply to ${contact.name}...`}
                        value={replyText[contact.id] || ''}
                        onChange={e => setReplyText(prev => ({ ...prev, [contact.id]: e.target.value }))}
                      />
                      <button
                        className="send-reply-btn"
                        onClick={() => handleReply(contact)}
                        disabled={replying === contact.id}
                      >
                        {replying === contact.id
                          ? (<><span className="btn-spinner" /> Sending...</>)
                          : (<><MdSend style={{verticalAlign:'middle',marginRight:6}} />Send Reply</>)
                        }
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
