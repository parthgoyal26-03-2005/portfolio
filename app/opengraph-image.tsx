import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Parth Goyal | Full-Stack Developer Portfolio — parthspace.in';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* ── Editable LeetCode-style stats (update with your real numbers) ── */
const STATS = {
  solved: 350,
  total: 3934,
  easy: { done: 166, total: 882 },
  medium: { done: 162, total: 1842 },
  hard: { done: 22, total: 815 },
  submissions: 540,
  activeDays: 180,
};

/* ── Tech stack (Simple Icons CDN slug + brand hex) ── */
const TECH = [
  { label: 'Next.js', slug: 'nextdotjs', color: 'ffffff' },
  { label: 'React', slug: 'react', color: '61DAFB' },
  { label: 'TypeScript', slug: 'typescript', color: '3178C6' },
  { label: 'Node.js', slug: 'nodedotjs', color: '5FA04E' },
  { label: 'MongoDB', slug: 'mongodb', color: '47A248' },
  { label: 'Python', slug: 'python', color: '3776AB' },
];

/* ── GitHub-style heatmap palette ── */
const HEAT = ['rgba(255,255,255,0.05)', '#0e4429', '#006d32', '#26a641', '#39d353'];
const COLS = 24;
const ROWS = 7;
const heatCells = Array.from({ length: COLS * ROWS }, (_, i) => {
  const v = ((i * 2654435761) % 100) / 100;
  const level = v < 0.45 ? 0 : v < 0.62 ? 1 : v < 0.8 ? 2 : v < 0.92 ? 3 : 4;
  return HEAT[level];
});

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#070611',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
          padding: '46px 56px',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glows */}
        <div
          style={{
            position: 'absolute',
            top: '-200px',
            right: '-160px',
            width: '560px',
            height: '560px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.32) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-220px',
            left: '-160px',
            width: '520px',
            height: '520px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* ── Top bar ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 800,
                color: '#fff',
              }}
            >
              P
            </div>
            <span
              style={{
                fontSize: '24px',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: '#f1f5f9',
              }}
            >
              parthspace.in
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(74,222,128,0.08)',
              border: '1px solid rgba(74,222,128,0.25)',
              borderRadius: '24px',
              padding: '8px 18px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#4ade80',
                display: 'flex',
              }}
            />
            <span style={{ fontSize: '14px', color: '#4ade80', fontWeight: 600 }}>
              Open to Opportunities
            </span>
          </div>
        </div>

        {/* ── Middle: hero text + stats card ── */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '40px',
            position: 'relative',
          }}
        >
          {/* Left hero */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.98 }}>
              <span
                style={{ fontSize: '78px', fontWeight: 800, letterSpacing: '-0.04em', color: '#f8fafc' }}
              >
                Parth
              </span>
              <span
                style={{
                  fontSize: '78px',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Goyal
              </span>
            </div>

            {/* Role label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '18px' }}>
              <div
                style={{
                  width: '36px',
                  height: '2px',
                  background: 'linear-gradient(to right, #7c3aed, #3b82f6)',
                  display: 'flex',
                }}
              />
              <span style={{ fontSize: '15px', letterSpacing: '0.22em', color: '#a78bfa' }}>
                FULL-STACK DEVELOPER
              </span>
            </div>

            <p
              style={{
                fontSize: '21px',
                color: '#94a3b8',
                margin: '16px 0 0 0',
                maxWidth: '480px',
                lineHeight: 1.45,
              }}
            >
              Building scalable web applications, API-driven systems &amp; modern digital experiences.
            </p>

            {/* Tech icons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '26px' }}>
              {TECH.map((t) => (
                <div
                  key={t.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 14px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <img
                    src={`https://cdn.simpleicons.org/${t.slug}/${t.color}`}
                    width={20}
                    height={20}
                    alt=""
                  />
                  <span style={{ fontSize: '15px', color: '#cbd5e1', fontWeight: 500 }}>
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: stats card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '420px',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '24px',
              gap: '20px',
            }}
          >
            {/* Card header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '17px', fontWeight: 700, color: '#f1f5f9' }}>
                LeetCode Activity
              </span>
              <span style={{ fontSize: '13px', color: '#64748b' }}>@draftpunk</span>
            </div>

            {/* Solved + breakdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontSize: '44px', fontWeight: 800, color: '#f8fafc' }}>
                    {STATS.solved}
                  </span>
                  <span style={{ fontSize: '16px', color: '#64748b' }}>/{STATS.total}</span>
                </div>
                <span style={{ fontSize: '13px', color: '#4ade80', fontWeight: 600 }}>
                  ✓ Problems Solved
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                {[
                  { label: 'Easy', c: '#22c55e', v: STATS.easy },
                  { label: 'Med.', c: '#eab308', v: STATS.medium },
                  { label: 'Hard', c: '#ef4444', v: STATS.hard },
                ].map((d) => (
                  <div
                    key={d.label}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                  >
                    <span style={{ fontSize: '13px', color: d.c, fontWeight: 600, width: '42px' }}>
                      {d.label}
                    </span>
                    <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                      {d.v.done}/{d.v.total}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Heatmap */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                {STATS.submissions} submissions · {STATS.activeDays} active days
              </span>
              <div style={{ display: 'flex', gap: '3px' }}>
                {Array.from({ length: COLS }).map((_, col) => (
                  <div key={col} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {Array.from({ length: ROWS }).map((_, row) => (
                      <div
                        key={row}
                        style={{
                          width: '11px',
                          height: '11px',
                          borderRadius: '2px',
                          backgroundColor: heatCells[col * ROWS + row],
                          display: 'flex',
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom strip: terminal + category cards ── */}
        <div style={{ display: 'flex', width: '100%', gap: '16px', position: 'relative' }}>
          {/* Terminal */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              borderRadius: '12px',
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '14px 18px',
              fontFamily: 'monospace',
            }}
          >
            <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'flex' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308', display: 'flex' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', display: 'flex' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', color: '#a78bfa' }}>parth@portfolio:~$</span>
              <span style={{ fontSize: '14px', color: '#cbd5e1' }}>building solutions that scale</span>
            </div>
          </div>

          {/* Category cards */}
          {[
            { t: 'Frontend', s: 'React · Next.js' },
            { t: 'Backend', s: 'Node · Express' },
            { t: 'Database', s: 'MongoDB · SQL' },
          ].map((c) => (
            <div
              key={c.t}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '160px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '14px 16px',
                gap: '4px',
              }}
            >
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#e2e8f0' }}>{c.t}</span>
              <span style={{ fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>{c.s}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
