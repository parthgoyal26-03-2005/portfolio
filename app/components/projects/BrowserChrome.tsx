export function BrowserChrome({ url }: { url?: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-glass-stroke bg-surface-container-lowest/90 px-4 py-3 backdrop-blur-md">
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-glass-stroke bg-surface-container/60 px-3 py-1.5">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
        <span className="truncate font-mono text-[10px] text-text-muted sm:text-xs">
          {url ?? "preview.designer.exe"}
        </span>
      </div>
    </div>
  );
}
