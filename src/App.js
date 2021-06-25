import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faRetweet,
  faHeart,
  faShareSquare,
  faEllipsisH,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import UserPhoto from "./assets/user.jpg";
import { fakeTweets } from "./fakeTweets";
function App() {
  const [tweets, setTweets] = useState(fakeTweets);
  const user = {
    avatar: UserPhoto,
    name: "Luke skywalker",
    username: "walkerofskies",
  };

  return (
    <AppContainer>
      <header>
        Home <FontAwesomeIcon icon={faStar} />
      </header>
      <WhatsHappening
        onSubmit={(input) => {
          setTweets([
            {
              user,
              content: input,
              meta: { timeAgo: new Date().toDateString() },
            },
            ...tweets,
          ]);
        }}
      />
      {tweets.map((tweet) => (
        <Tweet {...tweet} />
      ))}
    </AppContainer>
  );
}

const AppContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  border: 1px solid rgba(0, 0, 0, 0.2);
  & > header {
    border-bottom: 1px solid rgb(0, 0, 0, 0.3);
    display: flex;
    padding: 20px 30px;
    justify-content: space-between;
  }
`;

const WhatsHappening = ({ onSubmit }) => {
  const [tweetContent, setTweetContent] = useState("");
  return (
    <HappeningContainer>
      <img src={UserPhoto} />
      <input
        style={{ fontSize: tweetContent ? 16 : 28 }}
        placeholder="What's happening?"
        value={tweetContent}
        onChange={(e) => {
          setTweetContent(e.target.value);
        }}
      />
      <button
        onClick={() => {
          onSubmit(tweetContent);
          setTweetContent("");
        }}
      >
        Tweet
      </button>
    </HappeningContainer>
  );
};
const HappeningContainer = styled.div`
  display: grid;
  grid-template: 1fr 30px / auto 1fr auto;
  grid-gap: 15px;
  padding: 20px;

  * {
    grid-column: 2;
  }
  img {
    grid-column: 1;
    height: 64px;
    width: 64px;
    border-radius: 32px;
  }
  button {
    grid-column: 3;
    border-radius: 15px;
    padding: 0 20px;
    color: white;
    font-weight: bold;
    background-color: #1da1f2;
    border: none;
  }
  input {
    grid-column: 2/4;
    font-size: 32px;
    border: none;
    outline: none;
    padding: 0px 20px;
    &:focus {
      border: none;
    }
  }
  border-bottom: 5px solid rgba(0, 0, 0, 0.2);
`;

const Tweet = (props) => {
  return (
    <StyledTweet>
      <img src={props.user.avatar} />
      <header>
        <h1>{props.user.name}</h1> <span>@{props.user.username}</span>·{" "}
        {props.meta.timeAgo}
        <FontAwesomeIcon icon={faEllipsisH} />
      </header>
      <p>{props.content}</p>
      <footer>
        <label>
          <FontAwesomeIcon icon={faComment} />
          {props.meta?.comments ?? 0}
        </label>
        <label>
          <FontAwesomeIcon icon={faRetweet} />
          {props.meta?.retweets ?? 0}
        </label>
        <label>
          <FontAwesomeIcon icon={faHeart} />
          {props.meta?.likes ?? 0}
        </label>
        <FontAwesomeIcon icon={faShareSquare} />
      </footer>
    </StyledTweet>
  );
};
export default App;

const StyledTweet = styled.article`
  display: grid;
  grid-template-columns: 64px 1fr;
  grid-gap: 10px 15px;
  padding: 10px 20px;
  * {
    grid-column: 2;
  }
  header {
    grid-row: 1;
    display: flex;
    justify-content: flex-start;

    h1 {
      font-weight: bold;
    }
    span {
      color: rgba(0, 0, 0, 0.6);
    }

    span,
    h1 {
      margin-right: 5px;
    }

    svg {
      margin-left: auto;
    }
  }

  footer {
    display: flex;
    justify-content: space-between;
    padding-right: 30px;
    svg {
      margin-right: 5px;
    }
  }
  img {
    grid-column: 1;
    grid-row: 1/3;
    height: 64px;
    width: 64px;
    border-radius: 32px;
  }
  svg {
    color: rgba(0, 0, 0, 0.4);
  }
  border: 1px solid rgba(0, 0, 0, 0.2);
  & + & {
    border-top: none;
  }
`;
