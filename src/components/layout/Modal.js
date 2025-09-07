export default function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
