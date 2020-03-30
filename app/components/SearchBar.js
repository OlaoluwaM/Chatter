import React from 'react';
import { motion } from 'framer-motion';
import { MdSearch } from 'react-icons/md';
import { hexToRgb } from '../utils/helper';
import { default as styled, css } from 'styled-components';

const SearchBarForm = styled(motion.form)`
  width: 75%;
  height: 5%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  padding: 0;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 12px;
  border-radius: 10px;
  background: transparent;
  background: linear-gradient(225deg, #10003d, #130049);
  box-shadow: -20px 20px 60px #0e0033, 20px -20px 60px #170055;

  ${({ disabled }) =>
    disabled &&
    css`
      filter: opacity(0.6);
    `}

  & > input {
    border: none;
    flex-basis: 75%;
    outline: transparent;
    background: transparent;
    letter-spacing: 0.1em;
    text-indent: 12px;
    font-family: var(--font1);
    font-size: 0.9em;
    font-weight: 100;
    padding: 3px;
    color: ${({ theme }) => theme.primaryColor};

    &::placeholder {
      color: ${({ theme }) => hexToRgb(theme.primaryColor, 0.2)};
    }
  }

  & > div {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    font-size: 1.4rem;
    transform: scaleX(-1);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    svg {
      stroke-width: 1.1px;
      stroke: ${({ theme }) => theme.secondaryColor};
      fill: ${({ theme }) => theme.secondaryColor};
    }
  }
`;

export default function SearchUser({ category, searchForUser, motionProps }) {
  const [input, setInput] = React.useState('');

  React.useEffect(() => {
    setInput('');
  }, [category]);

  const handleSubmit = e => {
    e.preventDefault();
    searchForUser(input);
  };

  const handleInputChange = e => {
    if (e.target.value === '') {
      searchForUser('');
    }
    setInput(e.target.value);
  };

  return (
    <SearchBarForm
      disabled={category === 'blocked'}
      {...motionProps}
      onSubmit={handleSubmit}>
      <input
        placeholder='Search User'
        onChange={handleInputChange}
        value={input}
        disabled={category === 'blocked'}
      />

      <div onClick={() => searchForUser(input)}>
        <MdSearch />
      </div>
    </SearchBarForm>
  );
}
