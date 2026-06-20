export default function FadeUp({ children, className = "", delay = "" }) {
  const delayClass =
    delay === 100 ? "delay-100" : delay === 200 ? "delay-200" : delay === 300 ? "delay-300" : "";

  return (
    <div className={`animate-fade-up ${delayClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
