import styled from 'styled-components'

export const CartLabel = styled.label`
  align-items: center;
  background: #09f;
  border-radius: 9999px;
  cursor: pointer;
  display: flex;
  height: 32px;
  justify-content: center;
  padding: 4px;
  position: fixed;
  right: 24px;
  top: 24px;
  transition: all 0.3s ease;
  width: 32px;
  z-index: 9999;

  &:hover {
    scale: 1.1;
  }
`

export const Checkbox = styled.input.attrs({ type: 'checkbox', hidden: true })``

export const CartSection = styled.aside`
  background: #fff;
  box-shadow: 0 0 10px 1px rgb(15, 15, 15, 0.2);
  display: none;
  padding: 35px;
  position: fixed;
  right: 0px;
  top: 0px;
  width: 200px;
  user-select: none;
  height: 100%;
  overflow: auto;

  img {
    aspect-ratio: 16/9;
    width: 75%;
    border-radius: 8px;
    object-fit: fill;
  }

  li {
    // border-bottom: 1px solid #444;
    padding-bottom: 16px;
  }

  footer {
    display: flex;
    gap: 8px;
    justify-content: center;
    align-items: center;
  }

  footer button {
    padding: 9px;
  }

  ${Checkbox}:checked + & {
    height: -webkit-fill-available;
    display: block;
  }
`
