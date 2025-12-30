
export const Divider = () => {
  return (
    <div className="w-full bg-white py-32 flex flex-col items-center justify-center border-t border-neutral-100">
      <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-neutral-300 to-transparent mb-8" />
      <h2 className="text-sm font-mono text-neutral-400 tracking-[0.5em] uppercase text-center">
        Selected Works<br/>
        <span className="text-neutral-900 text-[10px] mt-2 block tracking-widest">2023 — 2025</span>
      </h2>
    </div>
  );
};