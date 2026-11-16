// Логотип партнёра MyChauffeurDrive.com (векторная перерисовка присланного PNG)
export default function PartnerLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`mcd ${className}`}>
      <svg viewBox="0 0 32 32" className="mcd-mark" aria-hidden>
        <rect x="1" y="1" width="30" height="30" fill="none" stroke="#b8935a" strokeWidth="2" />
        <rect x="8" y="8" width="16" height="16" fill="#c9a46a" />
      </svg>
      <span className="mcd-text">
        MyChauffeurDrive<span className="mcd-com">.com</span>
      </span>
    </span>
  );
}
