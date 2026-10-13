import { useEffect, useRef } from 'react';

/** Fenêtre modale basée sur <dialog> : focus, Échap et fond gérés par le navigateur. */
export default function Modal({ open, onClose, labelledBy, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) { d.showModal ? d.showModal() : d.setAttribute('open', ''); }
    if (!open && d.open) { d.close ? d.close() : d.removeAttribute('open'); }
  }, [open]);
  return (
    <dialog ref={ref} aria-labelledby={labelledBy} onClose={onClose}
      onClick={e => { if (e.target === ref.current) onClose(); }}>
      {children}
    </dialog>
  );
}
