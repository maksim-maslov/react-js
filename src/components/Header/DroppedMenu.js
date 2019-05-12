import './css/DroppedMenu.css';

import React, { Component } from 'react';

class DroppedMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reason: [
        'Офис',
        'Вечеринка',
        'Свадьба',
        'Спорт',
        'Море',
        'Дом',
        'Повседневное',
      ],

      type: [
        'Балетки',
        'Босоножки',
        'Ботильоны',
        'Ботинки',
        'Ботфорты',
        'Галоши',
        'Кеды и кроссовки',
        'Мокасины',
        'Полусапоги',
        'Резиновые сапоги',
        'Сабо',
        'Сапоги',
        'Сникерсы',
        'Тапочки',
        'Туфли',
        'Шлёпанцы и вьетнамки'      
      ],

      season: [
        'Зима',
        'Весна',
        'Лето',
        'Осень'
      ],

      brands: [
        'Albano',    
        'Ballin',
        'Baldinini',
        'Damlax',
        'Pegia',
        'Renzi',
        '...все бренды'
      ]
    }; 
  }


  render() {
    const { droppedMenuVisible, updateDroppedMenuVisible } = this.props;
    const { reason, type, season, brands } = this.state;
    
    return(
      <div 
        className={`dropped-menu ${droppedMenuVisible ? 'dropped-menu_visible' : ''}`} 
        onMouseLeave={() => updateDroppedMenuVisible(-1, false)}
      >
        <div className="wrapper">

          <div className="dropped-menu__lists dropped-menu__lists_women">
            <h3 className="dropped-menu__list-title">Повод</h3>
            <ul className="dropped-menu__list">
              {reason.map((el, index) => <li key={index} className="dropped-menu__item" onClick={() => updateDroppedMenuVisible(-1, false)}><a>{el}</a></li>)}
            </ul>
          </div>

          <div className="dropped-menu__lists dropped-menu__lists_three-coloumns">
            <h3 className="dropped-menu__list-title">Тип обуви</h3>
            <ul className="dropped-menu__list">
              {type.map((el, index) => <li key={index} className="dropped-menu__item" onClick={() => updateDroppedMenuVisible(-1, false)}><a>{el}</a></li>)}
            </ul>
          </div>

          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">Сезон</h3>
            <ul className="dropped-menu__list">
              {season.map((el, index) => <li key={index} className="dropped-menu__item" onClick={() => updateDroppedMenuVisible(-1, false)}><a>{el}</a></li>)}
            </ul>
          </div>

          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">Бренды</h3>
            <ul className="dropped-menu__list">
              {brands.map((el, index) => <li key={index} className="dropped-menu__item" onClick={() => updateDroppedMenuVisible(-1, false)}><a>{el}</a></li>)}             
            </ul>
          </div>

        </div>
      </div>
    );
  }
}

export default DroppedMenu;