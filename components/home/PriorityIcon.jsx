const PATHS = {
  health: (
    <>
      <path d="M20.8 8.7c0 5.4-8.8 11-8.8 11s-8.8-5.6-8.8-11a4.7 4.7 0 0 1 8.8-2.2 4.7 4.7 0 0 1 8.8 2.2Z" />
      <path d="M4.5 12h4l2-3.5 3.2 7 2-3.5h3.8" />
    </>
  ),
  education: (
    <>
      <path d="M12 5.2c-2.2-1.6-5.3-2-9-1.3v14c3.7-.7 6.8-.3 9 1.3 2.2-1.6 5.3-2 9-1.3v-14c-3.7-.7-6.8-.3-9 1.3Z" />
      <path d="M12 5.2v14" />
    </>
  ),
  entrepreneurship: (
    <>
      <path d="M12 20v-8" />
      <path d="M12 13c-5.2 0-8-2.6-8-7 5.5 0 8 2.3 8 7Z" />
      <path d="M12 10c0-4.1 2.5-6 7-6 0 4.5-2.4 7-7 7" />
    </>
  ),
  agriculture: (
    <>
      <path d="M12 21V11" />
      <path d="M12 15c-4.4 0-7-2.4-7-6.5 4.8 0 7 2.2 7 6.5Z" />
      <path d="M12 11c0-4.2 2.6-6.5 7-6.5 0 4.4-2.5 6.5-7 6.5Z" />
    </>
  ),
  inclusion: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.8 20v-1.5a6.2 6.2 0 0 1 12.4 0V20" />
      <path d="M16 5.2a3.5 3.5 0 0 1 0 6.8M18 14.5a5 5 0 0 1 3.2 4.7V20" />
    </>
  ),
};

export function PriorityIcon({ name }) {
  return <svg viewBox="0 0 24 24">{PATHS[name]}</svg>;
}

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
