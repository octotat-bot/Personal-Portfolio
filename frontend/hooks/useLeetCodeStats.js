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
  } catch {
    // Storage blocked or corrupt entry: treat as a cache miss.
  }
  return null;
}

function setCache(data) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // Storage blocked: skip caching.
  }
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
    // The initial state already used a fresh cache entry, if there was one.
    if (getCached()) return;
    fetchOnce().then(val => {
      if (val) setSolved(val);
    });
  }, []);

  return solved;
}
