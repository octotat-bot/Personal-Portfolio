import React, { useEffect, useState } from 'react';
import styles from './LiveActivity.module.css';

export default function LiveActivity({ ready, scrollProgress = 0 }) {
  const [githubState, setGithubState] = useState({ loading: true, repo: '', timeAgo: '' });
  const [leetcodeState, setLeetcodeState] = useState({ loading: true, solved: 0 });

  useEffect(() => {
    // Fetch GitHub last push
    const fetchGithub = async () => {
      try {
        const res = await fetch('https://api.github.com/users/octotat-bot/events/public');
        const data = await res.json();
        const pushEvent = data.find(e => e.type === 'PushEvent');
        if (pushEvent) {
          const repoName = pushEvent.repo.name.split('/')[1];
          const date = new Date(pushEvent.created_at);
          
          // Calculate time ago
          const diffMs = Date.now() - date.getTime();
          const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
          const diffDays = Math.floor(diffHrs / 24);
          
          let timeStr = '';
          if (diffHrs < 1) timeStr = 'Just now';
          else if (diffHrs < 24) timeStr = `${diffHrs} hr${diffHrs > 1 ? 's' : ''} ago`;
          else timeStr = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

          setGithubState({ loading: false, repo: repoName, timeAgo: timeStr });
        } else {
          setGithubState({ loading: false, repo: 'No recent pushes', timeAgo: '' });
        }
      } catch (err) {
        setGithubState({ loading: false, repo: 'GitHub API limit reached', timeAgo: '' });
      }
    };

    // Fetch LeetCode stats
    const fetchLeetcode = async () => {
      try {
        // Use alfa-leetcode-api for reliable live data
        let res = await fetch('https://alfa-leetcode-api.onrender.com/hakka123/solved');
        let data = await res.json();
        
        if (data && data.solvedProblem) {
          setLeetcodeState({ loading: false, solved: data.solvedProblem });
        } else {
           setLeetcodeState({ loading: false, solved: 225 });
        }
      } catch (err) {
        setLeetcodeState({ loading: false, solved: 225 }); // fallback
      }
    };

    fetchGithub();
    fetchLeetcode();
  }, []);

  if (!ready) return null;

  const gitVisible = scrollProgress >= 0.35;
  const leetVisible = scrollProgress >= 0.55;

  return (
    <div className={styles.statsContainer}>
      
      {/* GitHub Stat Card */}
      <a href="https://github.com/mukundmangla" target="_blank" rel="noreferrer" className={`${styles.statCard} ${gitVisible ? styles.visible : ''}`}>
        <div className={styles.statHeader}>
          <span className={styles.statTitle}>Live Git Push</span>
          <span className={styles.statIcon}>🐙</span>
        </div>
        {!githubState.loading ? (
          <>
            <div className={styles.statValue}>
              {githubState.timeAgo && <span className={styles.pulse} />}
              {githubState.timeAgo || 'Recent'}
            </div>
            <div className={styles.statDetail}>repo: {githubState.repo}</div>
          </>
        ) : (
          <div className={styles.statDetail}>Locating signal...</div>
        )}
      </a>

      {/* LeetCode Stat Card */}
      <a href="https://leetcode.com/u/hakka123/" target="_blank" rel="noreferrer" className={`${styles.statCard} ${leetVisible ? styles.visible : ''}`}>
        <div className={styles.statHeader}>
          <span className={styles.statTitle}>LeetCode Algo</span>
          <span className={styles.statIcon}>⚡</span>
        </div>
        {!leetcodeState.loading ? (
          <>
            <div className={styles.statValue}>{leetcodeState.solved}</div>
            <div className={styles.statDetail}>problems crushed</div>
          </>
        ) : (
          <div className={styles.statDetail}>Crunching data...</div>
        )}
      </a>

    </div>
  );
}
