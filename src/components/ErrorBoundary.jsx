import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--bg-accent)',
          borderRadius: 'var(--border-radius-lg)',
          color: 'var(--text-primary)',
          maxWidth: '600px',
          margin: '2rem auto'
        }}>
          <h2 style={{ color: 'var(--orange-primary)', marginBottom: '1rem' }}>
            Oops! Something went wrong
          </h2>
          <details style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)' }}>
            <summary style={{ marginBottom: '1rem', cursor: 'pointer' }}>
              Error details (click to expand)
            </summary>
            <div style={{ 
              background: 'var(--bg-primary)', 
              padding: '1rem', 
              borderRadius: 'var(--border-radius)',
              fontSize: '0.9rem',
              fontFamily: 'monospace',
              border: '1px solid var(--bg-accent)'
            }}>
              <strong>Error:</strong> {this.state.error && this.state.error.toString()}
              <br />
              <strong>Stack trace:</strong> {this.state.errorInfo.componentStack}
            </div>
          </details>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary"
            style={{ marginTop: '1rem' }}
          >
            Reload Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
