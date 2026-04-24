import { site } from "@/lib/site";

export function TopBar() {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <span className="topbar-tag">
          <span className="pulse-dot" />
          Fast response — storm clean-up across QLD & NSW
        </span>
        <div className="topbar-links">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <span className="topbar-sep">·</span>
          <a href={site.phoneHref}>{site.phoneDisplay}</a>
        </div>
      </div>
    </div>
  );
}
