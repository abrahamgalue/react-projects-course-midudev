import { useState } from 'react'
import styled from 'styled-components'

const Article = styled.article`
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 0.8rem;
  justify-content: space-between;
  width: 300px;
`
const CardHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 4px;
`

const CardAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 100px;
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const UserName = styled.span`
  opacity: 0.6;
`

const CardButton = styled.aside``

const FollowBtnText = styled.span`
  display: block;
`

const UnfollowBtnText = styled.span`
  display: none;
`

const FollowButton = styled.button`
  cursor: pointer;
  border: 0;
  border-radius: 1000px;
  padding: 8.5px 16px;
  font-weight: bold;
  background-color: rgb(239, 243, 244);

  &:hover {
    background-color: rgb(215, 219, 220);
  }

  &.is-following {
    border: 1px solid rgb(83, 100, 113);
    background: transparent;
    color: rgb(239, 243, 244);
    width: 95px;
  }

  &.is-following:hover {
    background-color: rgba(244, 33, 46, 0.1);
    color: rgb(244, 33, 46);
    border: 1px solid rgb(103, 7, 15);
    opacity: 1;
    ${FollowBtnText} {
      display: none;
    }
    ${UnfollowBtnText} {
      display: block;
    }
  }
`

export function XFollowCard({ children, userName, initialIsFollowing }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

  const text = isFollowing ? 'Following' : 'Follow'
  const buttonClassName = isFollowing ? 'is-following' : null

  const handleClick = () => {
    setIsFollowing(!isFollowing)
  }

  return (
    <Article>
      <CardHeader>
        <CardAvatar
          alt='profile photo'
          src={`https://unavatar.io/youtube/${userName}`}
        />
        <CardInfo>
          <strong>{children}</strong>
          <UserName>@{userName}</UserName>
        </CardInfo>
      </CardHeader>

      <CardButton>
        <FollowButton onClick={handleClick} className={buttonClassName}>
          <FollowBtnText>{text}</FollowBtnText>
          <UnfollowBtnText>Unfollow</UnfollowBtnText>
        </FollowButton>
      </CardButton>
    </Article>
  )
}
