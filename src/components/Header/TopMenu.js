import './css/TopMenu.css';

import React from 'react';


function TopMenu() {

  const topMenuItem = [
    'Возврат',
    'Доставка и оплата',
    'О магазине',
    'Контакты',
    'Новости'
  ];

  return(
    <div className="top-menu">
      <div className="wrapper">
        <ul className="top-menu__items">
          {topMenuItem.map((el, index) => {
            return (
              <li className="top-menu__item"
                  key={index}>
                <a>{el}</a>
              </li>
            );
          })}          
        </ul>
      </div>
    </div>
  );
}

export default TopMenu;


