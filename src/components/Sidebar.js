
import React, { Component } from 'react';

class Sidebar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <section className="sidebar">
          <section className="sidebar__division">
            <div className="sidebar__catalogue-list" onClick={event => this.props.updateFilters(event)}>
              <div className="sidebar__division-title">
                <h3>Каталог</h3>
                <div className="opener-down"></div>
              </div>
              <ul>
                <li><a href="#">Балетки</a></li>
                <li><a href="#">Босоножки и сандалии</a></li>
                <li><a href="#">Ботильоны</a></li>
                <li><a href="#">Ботинки</a></li>
                <li><a href="#">Ботфорты</a></li>
                <li><a href="#">Галоши</a></li>
                <li><a href="#">Тапочки</a></li>
                <li><a href="#">Туфли</a></li>
                <li><a href="#">Сапоги</a></li>
              </ul>
            </div>
          </section>

          <div className="separator-150 separator-150-1"></div>

          <section className="sidebar__division">
            <div className="sidebar__price" onClick={event => this.props.updateFilters(event)}>
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
            <div className="sidebar__color" onClick={event => this.props.updateFilters(event)}>
              <div className="sidebar__division-title">
                <h3>Цвет</h3>
                <div className="opener-down"></div>
              </div>
              <ul>                   
                <li><a href="#"><div className="color beige"></div><span className="color-name">Бежевый</span></a></li>
                <li><a href="#"><div className="color whitesnake"></div><span className="color-name">Белый</span></a></li>
                <li><a href="#"><div className="color shocking-blue"></div><span className="color-name">Голубой</span></a></li>
                <li><a href="#"><div className="color yellow"></div><span className="color-name">Жёлтый</span></a></li>
                <li><a href="#"><div className="color king-crimson"></div><span className="color-name">Алый</span></a></li>
                <li><a href="#"><div className="color deep-purple"></div><span className="color-name">Фиолетовый</span></a></li>
                <li><a href="#"><div className="color black-sabbath"></div><span className="color-name">Чёрный</span></a></li>
              </ul>
            </div>
          </section>

          <div className="separator-150 separator-150-3"></div>    

          <section className="sidebar__division">
            <div className="sidebar__size" onChange={event => this.props.updateFilters(event)}>
              <div className="sidebar__division-title">
                <h3>Размер</h3><div className="opener-down"></div>
              </div>
              <ul>
                <div className="list-1">
                  <li><label><input type="checkbox" className="checkbox" name="checkbox-8" value="8"/><span className="checkbox-custom"></span> <span className="label">8</span></label></li>
                  <li><label><input type="checkbox" className="checkbox" name="checkbox-10" value="10"/><span className="checkbox-custom"></span> <span className="label">10</span></label></li>
                  <li><label><input type="checkbox" className="checkbox" name="checkbox-12" value="12"/><span className="checkbox-custom"></span> <span className="label">12</span></label></li>
                  <li><label><input type="checkbox" className="checkbox" name="checkbox-14" value="14"/><span className="checkbox-custom"></span> <span className="label">14</span></label></li>
                  {/* <li><label><input type="checkbox" className="checkbox" name="checkbox-39"/><span className="checkbox-custom"></span> <span className="label">39</span></label></li> */}
                </div>
                <div className="list-2">
                  <li><label><input type="checkbox" className="checkbox" name="checkbox-15" value="15"/><span className="checkbox-custom"></span> <span className="label">15</span></label></li>
                  <li><label><input type="checkbox" className="checkbox" name="checkbox-16" value="16"/><span className="checkbox-custom"></span> <span className="label">16</span></label></li>
                  <li><label><input type="checkbox" className="checkbox" name="checkbox-18" value="18"/><span className="checkbox-custom"></span> <span className="label">18</span></label></li>
                  <li><label><input type="checkbox" className="checkbox" name="checkbox-20" value="20"/><span className="checkbox-custom"></span> <span className="label">20</span></label></li>
                  {/* <li><label><input type="checkbox" className="checkbox" name="checkbox-40"/><span className="checkbox-custom"></span> <span className="label">40</span></label></li>  */}
                </div>
              </ul>
            </div>
          </section>

          <div className="separator-150 separator-150-4"></div>   

          <section className="sidebar__division">    
            <div className="sidebar__heel-height" onChange={event => this.props.updateFilters(event)}>
              <div className="sidebar__division-title">
                <h3>Размер каблука</h3><div className="opener-down"></div>
                <ul>
                  <div className="list-1">
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-1" value="1"/><span className="checkbox-custom"></span> <span className="label">1</span></label></li>
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-2" value="2"/><span className="checkbox-custom"></span> <span className="label">2</span></label></li>
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-3" value="3"/><span className="checkbox-custom"></span> <span className="label">3</span></label></li>
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-4" value="4"/><span className="checkbox-custom"></span> <span className="label">4</span></label></li>
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-5" value="5"/><span className="checkbox-custom"></span> <span className="label">5</span></label></li>
                  </div>
                  <div className="list-2">
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-6" value="6"/><span className="checkbox-custom"></span> <span className="label">6</span></label></li>
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-7" value="7"/><span className="checkbox-custom"></span> <span className="label">7</span></label></li>
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-8" value="8"/><span className="checkbox-custom"></span> <span className="label">8</span></label></li>
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-9" value="9"/><span className="checkbox-custom"></span> <span className="label">9</span></label></li>
                    <li><label><input type="checkbox" className="checkbox" name="checkbox-10" value="10"/><span className="checkbox-custom"></span> <span className="label">10</span></label></li> 
                  </div>
                </ul>
              </div>
            </div>
          </section>

          <div className="separator-150 separator-150-5"></div> 

          <section className="sidebar__division">  
            <div className="sidebar__occasion" onClick={event => this.props.updateFilters(event)}>
              <div className="sidebar__division-title">
                <h3>Повод</h3><div className="opener-down"></div>
              </div>
              <ul>
                <li><a href="#">Офис</a></li>
                <li><a href="#">Вечеринка</a></li>
                <li><a href="#">Свадьба</a></li>
                <li><a href="#">Спорт</a></li>
                <li><a href="#">Путешествие</a></li>
                <li><a href="#">Свидание</a></li>
                <li><a href="#">Дома</a></li>
                <li><a href="#">Произвести впечатление</a></li>
              </ul>
            </div>
          </section>

          <div className="separator-150 separator-150-6"></div>   

          <section className="sidebar__division">
            <div className="sidebar__season" onClick={event => this.props.updateFilters(event)}>
              <div className="sidebar__division-title">
                <h3>Сезон</h3><div className="opener-down"></div>                
              </div>
              <ul>
                <li><a href="#">Лето</a></li>
                <li><a href="#">Осень</a></li>                  
              </ul>
            </div>
          </section>

          <div className="separator-150 separator-150-7"></div>   
                  
          <section className="sidebar__division">
            <div className="sidebar__brand">
              <h3>Бренд</h3>
              <form action="post" className="brand-search" onSubmit={event => this.props.updateFilters(event)}>
                <input type="search" name="search" className="brand-search" id="brand-search" placeholder="Поиск" />
                <input type="submit" name="button" value="" className="submit"/>
              </form>
            </div>

            <label><input type="checkbox" className="checkbox" name="checkbox-disc" value="" /><span className="checkbox-discount" onClick={event => this.props.updateFilters(event)}></span> <span className="text-discount">Со скидкой</span></label>

            <div className="separator-240"></div>
          </section>
              
          <section className="sidebar__division">    
            <div className="drop-down" onClick={event => this.props.updateFilters(event)}>
              <a href="#"><span className="drop-down-icon"></span>Сбросить</a>
            </div>
          </section>
      </section>
    );
  }
}    

export default Sidebar;

 
