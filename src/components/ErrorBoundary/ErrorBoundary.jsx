import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('UI crash:', error, info?.componentStack);
  }

  handleReload = () => {
    this.setState({ hasError: false });
    window.location.href = '/';
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        background: '#0a1628',
        color: '#fff',
        fontFamily: 'Segoe UI, system-ui, sans-serif'
      }}>
        <h1 style={{ color: '#e8a020', marginBottom: '1rem' }}>Une erreur est survenue</h1>
        <p style={{ opacity: 0.7, marginBottom: '2rem', maxWidth: '500px' }}>
          Désolé, quelque chose s'est mal passé. Notre équipe a été notifiée.
        </p>
        <button
          onClick={this.handleReload}
          style={{
            padding: '12px 28px',
            background: '#e8a020',
            color: '#0a1628',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }
}
