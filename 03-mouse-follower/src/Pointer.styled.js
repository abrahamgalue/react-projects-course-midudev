import styled from 'styled-components';

const FollowMouseCursor = styled.div.attrs(({ position }) => ({
  style: {
    transform: `translate(${position.x}px, ${position.y}px)`,
  },
}))`
  background-color: rgba(48, 39, 178, 0.6);
  border-radius: 50%;
  border: 1px solid #fff;
  filter: blur(8px);
  height: 50px;
  left: -25px;
  opacity: 0.8;
  pointer-events: none;
  position: absolute;
  top: -25px;
  width: 50px;
`;

export default FollowMouseCursor;
