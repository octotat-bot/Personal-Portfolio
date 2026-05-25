import { useEffect, useState } from 'react';

const CACHE_KEY = 'lc_stats';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

let inflight = null;

function getCached() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts < CACHE_TTL) return data;
  } catch {}
  return null;
}

function setCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
}

function fetchOnce() {
  if (inflight) return inflight;

  inflight = fetch('https://alfa-leetcode-api.onrender.com/Hakka123/solved')
    .then(res => {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then(data => {
      const solved = data?.solvedProblem ?? null;
      if (solved) setCache(solved);
      inflight = null;
      return solved;
    })
    .catch(() => {
      inflight = null;
      return null;
    });

  return inflight;
}

export default function useLeetCodeStats(fallback = '225+') {
  const [solved, setSolved] = useState(() => getCached() ?? fallback);

  useEffect(() => {
    const cached = getCached();
    if (cached) {
      setSolved(cached);
      return;
    }
    fetchOnce().then(val => {
      if (val) setSolved(val);
    });
  }, []);

  return solved;
}
