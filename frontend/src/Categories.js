import React from 'react';
import styled from 'styled-components';
import FruitsIcon from '../src/categoryimages/fruits-vegetables.png';
import DairyIcon from '../src/categoryimages/dairy-eggs.png';
import MeatIcon from '../src/categoryimages/meat-fish.png';
import DrinksIcon from '../src/categoryimages/drinks-beverages.png';
import BakeryIcon from '../src/categoryimages/bakery-pastry.png';
import MoreIcon from '../src/categoryimages/more.png';

const Categories = () => {
  return (
    <HeaderNav>
      <HeaderNavLink to={`/categoryimages/fruits-vegetables.png`}>
        <img src={FruitsIcon} alt="Fruits & Vegetables" />
        <span>Fruits & Vegetables</span>
      </HeaderNavLink>
      <HeaderNavLink to={`frontend/public/categoryimages/dairy-eggs.png`}>
        <img src={DairyIcon} alt="Dairy & Eggs" />
        <span>Dairy & Eggs</span>
      </HeaderNavLink>
      <HeaderNavLink to={`/frontend/public/categoryimages/meat-fish.png`}>
        <img src={MeatIcon} alt="Meat & Fish" />
        <span>Meat & Fish</span>
      </HeaderNavLink>
      <HeaderNavLink to={`/categoryimages/drinks-beverages.png`}>
        <img src={DrinksIcon} alt="Drinks & Beverages" />
        <span>Drinks & Beverages</span>
      </HeaderNavLink>
      <HeaderNavLink to={`/categories/bakery-pastry`}>
        <img src={BakeryIcon} alt="Bakery & Pastry" />
        <span>Bakery & Pastry</span>
      </HeaderNavLink>
      <HeaderNavLink to={`/categories/more`}>
        <img src={MoreIcon} alt="More" />
        <span>More</span>
      </HeaderNavLink>
    </HeaderNav>
  );
};

export default Categories;

const HeaderNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const HeaderNavLink = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  padding: 10px;
  cursor: pointer;

  /* Set a fixed size for the container */
  width: 180px;
  height: 180px;
  margin: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Maintain aspect ratio without distorting */
    border-radius: 50%;
    transition: transform 0.2s;
  }

  &:hover img {
    transform: scale(1.07);
  }

  span {
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translate(-50%, 50%);
    font-size: 14px;
    color: white;
  }

  @media (max-width: 767px) {
    width: calc(50% - 20px);
  }

  @media (max-width: 480px) {
    width: calc(100% - 20px);
  }
`;
