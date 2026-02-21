return (
  <div className="container">
    <header style={{ textAlign: 'center' }}>
      <h1>Guestbook</h1>
      <p className="subtitle">Join the wall of fame</p>
    </header>

    <div className="card">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="Leave a message..."
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            required
            rows={3}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Post Message'}
        </button>
      </form>
    </div>

    <div className="entries">
      {entries.map(entry => (
        <div key={entry.id} className="entry-card">
          <div className="entry-header">
            <strong>{entry.name}</strong>
            <span className="date">{new Date(entry.created_at).toLocaleDateString()}</span>
          </div>
          <p className="entry-message">{entry.message}</p>
        </div>
      ))}
    </div>
  </div>
);