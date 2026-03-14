export default function Card({ children, onClick, selected }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: selected ? '#eef6ff' : '#fff',
        border: selected ? '2px solid #3b82f6' : '1px solid #ddd',
        padding: '16px',
        marginBottom: '16px',
        borderRadius: '8px',
        boxShadow: selected
          ? '0 4px 12px rgba(0,0,0,0.15)'
          : '0 2px 4px rgba(0,0,0,0.05)',
        transition:
          'transform 0.15s ease, box-shadow 0.15s ease, border 0.15s ease',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onMouseEnter={(e) => {
        if (onClick) e.currentTarget.style.transform = 'scale(1.01)';
      }}
      onMouseLeave={(e) => {
        if (onClick) e.currentTarget.style.transform = 'scale(1)';
      }}>
      {children}
    </div>
  );
}
