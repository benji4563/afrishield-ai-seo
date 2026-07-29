'use client';

import { useState } from 'react';

/**
 * Shows Benjamin's photo the moment it exists at public/team/benjamin-njock.jpg.
 * Until then, a branded initials placeholder — never a stock person, because
 * this frame is a specific real person and a stand-in would misrepresent him.
 * Drop the file at that path and the photo appears with no code change.
 */
export function FounderPortrait() {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="relative aspect-[4/5] w-full overflow-hidden border border-white/10 bg-ink">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/team/benjamin-njock.jpg"
          alt="Benjamin Njock, founder of AfriShield AI, at his desk."
          width={800}
          height={1000}
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-green-900 to-ink">
          <span className="font-display text-[64px] font-bold text-green-300">BN</span>
          <span className="mt-2 font-mono text-label uppercase text-white/40">
            Benjamin Njock
          </span>
          <span className="mt-6 max-w-[24ch] text-center text-small text-white/30">
            Add the portrait at public/team/benjamin-njock.jpg
          </span>
        </div>
      )}
    </figure>
  );
}
