import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Parth Goyal | Full-Stack Developer Portfolio — parthspace.in';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

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
          padding: '56px 64px',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Purple glow — top-right */}
        <div
          style={{
            position: 'absolute',
            top: '-180px',
            right: '-180px',
            width: '560px',
            height: '560px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.30) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Blue glow — bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: '-160px',
            left: '-120px',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 800,
                color: '#fff',
              }}
            >
              {/* <img src="/parthlogo.png" alt="logo" /> */}
              P
            </div>
            <span
              style={{
                fontSize: '26px',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: '#f1f5f9',
              }}
            >
              parthspace.in
            </span>
          </div>

          {/* Stack pills */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {['MERN', 'Next.js', 'TypeScript', 'Python'].map((tech) => (
              <span
                key={tech}
                style={{
                  padding: '5px 14px',
                  borderRadius: '20px',
                  background: 'rgba(124,58,237,0.12)',
                  border: '1px solid rgba(124,58,237,0.30)',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#c4b5fd',
                  letterSpacing: '0.02em',
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Main headline block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            position: 'relative',
          }}
        >
          {/* Eyebrow row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '4px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '2px',
                background: 'linear-gradient(to right, #7c3aed, #3b82f6)',
                borderRadius: '2px',
                display: 'flex',
              }}
            />
            <span
              style={{
                fontSize: '13px',
                letterSpacing: '0.18em',
                color: '#a78bfa',
              }}
            >
              FULL-STACK DEVELOPER · IT STUDENT · BVCOE, NEW DELHI
            </span>
          </div>

          {/* Name — flex so "Parth" + "Goyal" are separate spans */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '18px',
              lineHeight: 1.05,
            }}
          >
            <span
              style={{
                fontSize: '80px',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                color: '#f8fafc',
              }}
            >
              Parth
            </span>
            <span
              style={{
                fontSize: '80px',
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

          <p
            style={{
              fontSize: '22px',
              color: '#94a3b8',
              margin: '0',
              maxWidth: '780px',
              lineHeight: 1.45,
            }}
          >
            Crafting immersive frontends &amp; scalable backend systems — from cinematic UIs to production-grade APIs.
          </p>
        </div>

        {/* Footer row */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            borderTop: '1px solid rgba(148,163,184,0.12)',
            paddingTop: '28px',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', gap: '48px' }}>
            {[
              { label: 'STACK', value: 'MERN + Next.js' },
              { label: 'FOCUS', value: 'Full-Stack Dev' },
              { label: 'LOCATION', value: 'New Delhi, India' },
            ].map((item) => (
              <div
                key={item.label}
                style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    color: '#64748b',
                    letterSpacing: '0.10em',
                  }}
                >
                  {item.label}
                </span>
                <span style={{ fontSize: '17px', color: '#e2e8f0', fontWeight: 600 }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(74,222,128,0.08)',
              border: '1px solid rgba(74,222,128,0.25)',
              borderRadius: '24px',
              padding: '8px 20px',
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
            <span style={{ fontSize: '15px', color: '#4ade80', fontWeight: 600 }}>
              Open to Opportunities
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
