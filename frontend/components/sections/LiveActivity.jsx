import React, { useEffect, useState } from 'react';
import styles from './LiveActivity.module.css';
import useLeetCodeStats from '../../hooks/useLeetCodeStats';

export default function LiveActivity({ ready, scrollProgress = 0 }) {
  const [githubState, setGithubState] = useState({ loading: true, repo: '', timeAgo: '' });
  const leetCodeSolved = useLeetCodeStats(225);

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const res = await fetch('https://api.github.com/users/octotat-bot/events/public');
        const data = await res.json();
        const pushEvent = data.find(e => e.type === 'PushEvent');
        if (pushEvent) {
          const repoName = pushEvent.repo.name.split('/')[1];
          const date = new Date(pushEvent.created_at);

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
      } catch {
        setGithubState({ loading: false, repo: 'GitHub API limit reached', timeAgo: '' });
      }
    };

    fetchGithub();
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
        <div className={styles.statValue}>{leetCodeSolved}</div>
        <div className={styles.statDetail}>problems crushed</div>
      </a>

    </div>
  );
}
