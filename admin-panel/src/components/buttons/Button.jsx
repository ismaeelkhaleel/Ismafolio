"use client";
import React from 'react';
import styled from 'styled-components';

const Button = ({name}) => {
  return (
    <StyledWrapper>
      <button>{name}</button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    margin: 12px 0;
    height: 48px;
    width: 100%;
    min-width: 140px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    font-weight: 600;
    cursor: pointer;
    font-size: 15px;
    color: white;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  button:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  button:active {
    transform: translateY(0);
  }
`;

export default Button;
