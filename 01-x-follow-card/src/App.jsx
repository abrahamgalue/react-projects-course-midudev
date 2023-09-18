import "./App.css";
import { XFollowCard } from "./XFollowCard.jsx";

const users = [
  {
    userName: "elmundodezowl",
    name: "Zowl",
    isFollowing: false,
  },
  {
    userName: "HolaMundoDev",
    name: "HolaMundo",
    isFollowing: true,
  },
  {
    userName: "vegetta777",
    name: "Vegetta777",
    isFollowing: false,
  },
  {
    userName: "LosVlogsdeDross1",
    name: "Los Vlogs de Dross",
    isFollowing: true,
  },
];

export function App() {
  return (
    <section className="App">
      {users.map(({ userName, name, isFollowing }) => (
        <XFollowCard
          key={userName}
          userName={userName}
          initialIsFollowing={isFollowing}
        >
          {name}
        </XFollowCard>
      ))}
    </section>
  );
}
