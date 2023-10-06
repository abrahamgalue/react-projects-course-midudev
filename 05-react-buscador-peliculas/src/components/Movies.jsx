import styled from 'styled-components'

export const Movies = styled.ul`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  list-style: none;
  margin: 0;
  padding: 1.125rem 0 0;
  width: 100%;
`

export const Movie = styled.li`
  text-align: center;
`

export const ReleaseDate = styled.p`
  @media (prefers-color-scheme: dark) {
    color: rgb(217, 217, 217, 0.25);
  }

  @media (prefers-color-scheme: light) {
    color: rgb(38, 38, 38, 0.75);
  }

  font-weight: 600;
  margin: 0 0 5px calc(10% - 13px);
  text-align: start;
  user-select: none;
  text-transform: capitalize;
`

export const MovieImage = styled.img`
  border-radius: 8px;
  height: 357px;
  transition: transform 0.2s;
  aspect-ratio: 2/3;

  &:hover {
    cursor: pointer;
    transform: scale(1.025);
    box-shadow: 0 0 13px 3px rgba(0, 0, 0, 0.25);
  }
`

export const MovieTitle = styled.h3`
  margin: 0;
  padding: 0;
  user-select: none;
`
