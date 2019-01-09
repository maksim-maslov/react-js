import React, { Component } from 'react';

class DroppedMenu extends Component {
  constructor(props) {
    super(props);
    this.reason = [
      'Офис',
      'Вечеринка',
      'Свадьба',
      'Спорт',
      'Море',
      'Дом',
      'Повседневное',
    ];
    this.type = [
      'Балетки',
      'Босоножки',
      'Ботильоны',
      'Ботинки',
      'Ботфорты',
      'Галоши',
      'Кеды и кроссовк',
      'Мокасины',
      'Полусапоги',
      'Резиновые сапоги',
      'Сабо',
      'Сапоги',
      'Сникерсы',
      'Тапочки',
      'Туфли',
      'Шлёпанцы и вьетнамки'      
    ];
    this.season = [
      'Зима',
      'Весна',
      'Лето',
      'Осень'
    ];
    this.brands = [
      'Albano',    
      'Ballin',
      'Baldinini',
      'Damlax',
      'Pegia',
      'Renzi',
      'Все'
    ];
  }

  render() {
    return(
      <div className="dropped-menu">
        <div className="wrapper">
          <div className="dropped-menu__lists dropped-menu__lists_women">
            <h3 className="dropped-menu__list-title">Повод:</h3>
            <ul className="dropped-menu__list">
              {this.reason.map((el, index) => <li key={index} className="dropped-menu__item"><a>{el}</a></li>)}
            </ul>
          </div>
          <div className="dropped-menu__lists dropped-menu__lists_three-coloumns">
            <h3 className="dropped-menu__list-title">Категории:</h3>
            <ul className="dropped-menu__list">
              {this.type.map((el, index) => <li key={index} className="dropped-menu__item"><a>{el}</a></li>)}
            </ul>
          </div>
          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">Сезон:</h3>
            <ul className="dropped-menu__list">
              {this.season.map((el, index) => <li key={index} className="dropped-menu__item"><a>{el}</a></li>)}
            </ul>
          </div>
          <div className="dropped-menu__lists">
            <h3 className="dropped-menu__list-title">Бренды:</h3>
            <ul className="dropped-menu__list">
              {this.brands.map((el, index) => <li key={index} className="dropped-menu__item"><a>{el}</a></li>)}             
            </ul>
          </div>
        </div>
      </div>
    );
  }
  
}

export default DroppedMenu;