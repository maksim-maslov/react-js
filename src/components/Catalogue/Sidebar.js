
import React, { Component } from 'react';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: [
        'Балетки',
        'Босоножки и сандалии',
        'Ботильоны',
        'Ботинки',
        'Ботфорты',
        'Галоши',
        'Тапочки',
        'Туфли',
        'Сапоги'
      ],
      color: [
        {color: 'beige', title: 'Бежевый'},
        {color: 'whitesnake', title: 'Белый'},
        {color: 'shocking-blue', title: 'Голубой'},
        {color: 'yellow', title: 'Жёлтый'},
        {color: 'king-crimson', title: 'Алый'},
        {color: 'deep-purple', title: 'Фиолетовый'},
        {color: 'black-sabbath', title: 'Чёрный'}
      ],
      size: [
        [8, 10, 12, 14],
        [15, 16, 18, 20]
      ],
      heelSize: [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10]
      ],
      reason: [
        'Офис',
        'Вечеринка',
        'Свадьба',
        'Спорт',
        'Путешествие',
        'Свидание',
        'Дома',
        'Произвести впечатление'
      ],
      season: [
        'Лето',
        'Осень'
      ]
    };
  }

  render() {
    const { updateFilters } = this.props;
    const { type, color, size, heelSize, reason, season } = this.state;

    return(
      <section className="sidebar">
          <section className="sidebar__division">
            <div className="sidebar__catalogue-list" onClick={event => updateFilters(event)}>
              <div className="sidebar__division-title">
                <h3>Каталог</h3>
                <div className="opener-down"></div>
              </div>
              <ul>
                {type.map((el, index) => <li key={index}><a href="#">{el}</a></li>)}
              </ul>
            </div>
          </section>

          <div className="separator-150 separator-150-1"></div>

          <section className="sidebar__division">
            <div className="sidebar__price" onClick={event => updateFilters(event)}>
              <div className="sidebar__division-title">
                <h3>Цена</h3>
                <div className="opener-down"></div>
              </div>
              <div className="price-slider">
                <div className="circle-container">
                  <div className="circle-1"></div>
                  <div className="line-white"></div>
                  <div className="line-colored"></div>
                  <div className="circle-2"></div>
                </div>
                <div className="counter">
                  <input type="text" className="input-1" value="1000"/>
                  <div className="input-separator"></div>
                  <input type="text" className="input-2" value="30 000"/>
                </div>
              </div>
            </div>
          </section>

          <div className="separator-150 separator-150-2"></div>

          <section className="sidebar__division">
            <div className="sidebar__color" onClick={event => updateFilters(event)}>
              <div className="sidebar__division-title">
                <h3>Цвет</h3>
                <div className="opener-down"></div>
              </div>
              <ul>    
                {color.map((el, index) => <li key={index}><a href="#"><div className={`color ${el.color}`}></div><span className="color-name">{el.title}</span></a></li>)}
              </ul>
            </div>
          </section>

          <div className="separator-150 separator-150-3"></div>    

          <section className="sidebar__division">
            <div className="sidebar__size" onChange={event => updateFilters(event)}>
              <div className="sidebar__division-title">
                <h3>Размер</h3><div className="opener-down"></div>
              </div>
              <ul>
                {size.map((element, index) => {
                  return(
                    <div className={`list-${index + 1}`}>
                      {element.map((el, idx) => <li key={idx}><label><input type="checkbox" className="checkbox" name={`checkbox-${el}`} value={el}/><span className="checkbox-custom"></span> <span className="label">{el}</span></label></li>)}
                    </div>
                  )
                })} 
              </ul>
            </div>
          </section>

          <div className="separator-150 separator-150-4"></div>   

          <section className="sidebar__division">    
            <div className="sidebar__heel-height" onChange={event => updateFilters(event)}>
              <div className="sidebar__division-title">
                <h3>Размер каблука</h3><div className="opener-down"></div>
                <ul>
                  {heelSize.map((element, index) => {
                    return(
                      <div className={`list-${index + 1}`}>
                        {element.map((el, idx) => <li><label><input type="checkbox" className="checkbox" name={`checkbox-${el}`} value={el}/><span className="checkbox-custom"></span> <span className="label">{el}</span></label></li>)}
                      </div>
                    )
                  })}                   
                </ul>
              </div>
            </div>
          </section>

          <div className="separator-150 separator-150-5"></div> 

          <section className="sidebar__division">  
            <div className="sidebar__occasion" onClick={event => updateFilters(event)}>
              <div className="sidebar__division-title">
                <h3>Повод</h3><div className="opener-down"></div>
              </div>
              <ul>
                {reason.map((el, index) => <li key={index}><a href="#">{el}</a></li>)}                
              </ul>
            </div>
          </section>

          <div className="separator-150 separator-150-6"></div>   

          <section className="sidebar__division">
            <div className="sidebar__season" onClick={event => updateFilters(event)}>
              <div className="sidebar__division-title">
                <h3>Сезон</h3><div className="opener-down"></div>                
              </div>
              <ul>
                {season.map((el, index) => <li><a href="#">{el}</a></li>)}                 
              </ul>
            </div>
          </section>

          <div className="separator-150 separator-150-7"></div>   
                  
          <section className="sidebar__division">
            <div className="sidebar__brand">
              <h3>Бренд</h3>
              <form action="post" className="brand-search" onSubmit={event => updateFilters(event)}>
                <input type="search" name="search" className="brand-search" id="brand-search" placeholder="Поиск" />
                <input type="submit" name="button" className="submit" value="" />
              </form>
            </div>

            <label><input type="checkbox" className="checkbox" name="checkbox-disc" value="" /><span className="checkbox-discount" onChange={event => this.props.updateFilters(event)}></span> <span className="text-discount">Со скидкой</span></label>

            <div className="separator-240"></div>
          </section>
              
          <section className="sidebar__division">    
            <div className="drop-down" onClick={event => updateFilters(event)}>
              <a href="#"><span className="drop-down-icon"></span>Сбросить</a>
            </div>
          </section>
      </section>
    );
  }
}    

export default Sidebar;

 
