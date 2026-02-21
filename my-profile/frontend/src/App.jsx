import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

function App() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Failed to fetch entries', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('guestbook')
        .insert([{ name: form.name, message: form.message }]);
      
      if (error) throw error;

      setForm({ name: '', message: '' });
      await fetchEntries(); // Refresh list
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>Guestbook</h1>
        <p className="subtitle">Leave a message for the community</p>
      </header>

      <div className="card main-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="e.g. Jane Doe"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              placeholder="Write something nice..."
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              required
              rows={4}
            />
          </div>
          <div className="actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Signing...' : 'Sign Guestbook'}
            </button>
          </div>
        </form>
      </div>

      <div className="entries">
        <h3>Recent Entries ({entries.length})</h3>
        {isLoading ? (
          <div className="loading">Loading messages...</div>
        ) : entries.length > 0 ? (
          entries.map(entry => (
            <div key={entry.id} className="entry-card">
              <div className="entry-header">
                <strong>{entry.name}</strong>
                <span className="date">
                  {new Date(entry.created_at).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <p className="entry-message">{entry.message}</p>
            </div>
          ))
        ) : (
          <div className="empty-state">No messages yet. Be the first to sign!</div>
        )}
      </div>
    </div>
  );
}

export default App;