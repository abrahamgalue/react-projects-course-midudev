import { useState } from "react";

export function XFollowCard({ children, userName, initialIsFollowing }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

  const text = isFollowing ? "Following" : "Follow";
  const buttonClassName = isFollowing
    ? "x-followCard-button is-following"
    : "x-followCard-button";

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <article className="x-followCard">
      <header className="x-followCard-header">
        <img
          className="x-followCard-avatar"
          alt="profile photo"
          src={`https://unavatar.io/youtube/${userName}`}
        />
        <div className="x-followCard-info">
          <strong>{children}</strong>
          <span className="x-followCard-infoUserName">@{userName}</span>
        </div>
      </header>

      <aside>
        <button onClick={handleClick} className={buttonClassName}>
          <span className="x-followCard-text">{text}</span>
          <span className="x-followCard-stopFollow">Unfollow</span>
        </button>
      </aside>
    </article>
  );
}
