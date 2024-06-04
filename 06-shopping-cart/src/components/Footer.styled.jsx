import styled from 'styled-components'

export const StyledFooter = styled.footer`
  position: fixed;
  left: 16px;
  bottom: 16px;
  text-align: left;
  background: rgba(0, 0, 0, 0.7);
  padding: 8px 24px;
  border-radius: 32px;
  opacity: 0.95;
  backdrop-filter: blur(8px);
  color: #fff;

  span {
    font-size: 14px;
    color: #09f;
    opacity: 0.8;
  }

  h4,
  h5 {
    margin: 0;
    display: flex;
  }

  @media (max-width: 615px) {
    display: none;
  }
`
