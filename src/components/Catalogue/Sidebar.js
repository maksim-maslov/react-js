import './css/Sidebar.css';

import $ from 'jquery';
import slider from '../../../node_modules/jquery-ui/ui/widgets/slider';

import React, { Component } from 'react';


class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.isCancel = '';

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
      ],

      typeHide: true,
      priceHide: true,
      colorHide: true,
      sizeHide: true,
      heelSizeHide: true,
      reasonHide: true,
      seasonHide: true
    };   
  }
  

  componentDidMount() {    
    this.$inputMinCost.change(() => {
      let minValueInput = Number(this.$inputMinCost.val());
      let maxValueInput = Number(this.$inputMaxCost.val());
    
      if (minValueInput > maxValueInput) {
        minValueInput = maxValueInput;
        this.$inputMinCost.val(minValueInput);
      }

      this.$sliderRange.slider('values', 0, minValueInput);	
    });
    
      
    this.$inputMaxCost.change(() => {
      let minValueInput = Number(this.$inputMinCost.val());
      let maxValueInput = Number(this.$inputMaxCost.val());
      
      if (maxValueInput > 100000) {
        maxValueInput = 100000; 
        this.$inputMaxCost.val(100000);
      }
    
      if (minValueInput > maxValueInput) {
        maxValueInput = minValueInput;
        this.$inputMaxCost.val(maxValueInput);
      }

      this.$sliderRange.slider('values', 1, maxValueInput);
    });


    this.$sliderRange.slider({
      min: 0,
      max: 100000,
      values: [0, 100000],
      range: true,
      change: (event, ui) => {
        const minPrice = ui.values[0];
        const maxPrice = ui.values[1];
        this.$inputMinCost.val(minPrice);
        this.$inputMaxCost.val(maxPrice);
        this.props.updateFilters('minPrice', minPrice);   
        this.props.updateFilters('maxPrice', maxPrice);   
      }      
    });
  }


  componentWillReceiveProps(newProps) {
    this.isCancel = JSON.stringify(newProps.filters) === '{}';
  }


  render() {
    const { updateFilters, brands } = this.props;
    const { 
      type, 
      color, 
      size, 
      heelSize, 
      reason, 
      season, 
      typeHide, 
      priceHide, 
      colorHide, 
      sizeHide, 
      heelSizeHide, 
      reasonHide, 
      seasonHide 
    } = this.state;

    if (this.isCancel) {
      this.$sliderRange.slider('values', 0, 0);
      this.$sliderRange.slider('values', 1, 100000);
    } 

    return (
      <section className="sidebar">
          <section className="sidebar__division">
            <div className="sidebar__catalogue-list">
              
              <div className="sidebar__division-title">
                <h3>Каталог</h3>
                <div className={`${typeHide ? 'opener-up' : 'opener-down'}`} 
                     onClick={() => this.setState({typeHide: !typeHide})}>
                </div>
              </div>

              <ul className={`${typeHide ? 'hide' : 'show'}`}>
                {type.map((el, index) => {
                  return (
                    <li key={index} 
                        onClick={() => updateFilters('type', el)}>
                      <a>{el}</a>
                    </li>
                  );
                })}
              </ul>

            </div>
          </section>

          <div className="separator-150 separator-150-1"></div>

          <section className="sidebar__division">
            <div className="sidebar__price" 
                 onClick={event => updateFilters(event)}>

              <div className="sidebar__division-title">
                <h3>Цена</h3>
                <div className={`${priceHide ? 'opener-up' : 'opener-down'}`} 
                     onClick={() => this.setState({priceHide: !priceHide})}>
                </div>                
              </div>

              <div className={`price-slider ${priceHide ? 'hide' : 'show'}`}>
                <div className="circle-container">
                  <div id="slider-range" 
                       ref={el => this.$sliderRange = $(el)}>
                  </div>
                </div>
                <div className="counter">
                  <input id="minCost" 
                         ref={el => this.$inputMinCost = $(el)} 
                         type="text" 
                         defaultValue="0" 
                         value={this.isCancel ? 0 : null} />
                  <div className="input-separator"></div>
                  <input id="maxCost" 
                         ref={el => this.$inputMaxCost = $(el)} 
                         type="text" 
                         defaultValue="100000" 
                         value={this.isCancel ? 100000 : null} />
                </div>
              </div>  

            </div>
          </section>

          <div className="separator-150 separator-150-2"></div>

          <section className="sidebar__division">
            <div className="sidebar__color" >

              <div className="sidebar__division-title">
                <h3>Цвет</h3>
                <div className={`${colorHide ? 'opener-up' : 'opener-down'}`} 
                     onClick={() => this.setState({colorHide: !colorHide})}>
                </div>
              </div>

              <ul className={`${colorHide ? 'hide' : 'show'}`}>    
                {color.map((el, index) => {
                  return (
                    <li key={index} 
                        onClick={() => updateFilters('color', el.title)}>
                      <a>
                        <div className={`color ${el.color}`}></div>
                        <span className="color-name">{el.title}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>

            </div>
          </section>

          <div className="separator-150 separator-150-3"></div>    

          <section className="sidebar__division">
            <div className="sidebar__size" >

              <div className="sidebar__division-title">
                <h3>Размер</h3>
                <div className={`${sizeHide ? 'opener-up' : 'opener-down'}`} 
                     onClick={() => this.setState({sizeHide: !sizeHide})}>
                </div>
              </div>

              <ul className={`${sizeHide ? 'hide' : 'show'}`}>
                {size.map((element, index) => {
                  return (
                    <div className={`list-${index + 1}`}
                         key={index}>

                      {element.map((el, idx) => {
                        return (
                          <li key={idx} 
                              onChange={() => updateFilters('size', el)}>
                            <label>
                              <input className="checkbox"                                 
                                     type="checkbox" 
                                     name={`checkbox-${el}`} 
                                     value={el} 
                                     checked={this.isCancel ? false : null} />
                              <span className="checkbox-custom"></span>
                              <span className="label">{el}</span>
                            </label>
                          </li>
                        );
                      })}

                    </div>
                  );
                })} 
              </ul>

            </div>
          </section>

          <div className="separator-150 separator-150-4"></div>   

          <section className="sidebar__division">    
            <div className="sidebar__heel-height" >
            
              <div className="sidebar__division-title">
                <h3>Размер каблука</h3>

                <div className={`${heelSizeHide ? 'opener-up' : 'opener-down'}`} 
                     onClick={() => this.setState({heelSizeHide: !heelSizeHide})}>
                </div>

                <ul className={`${heelSizeHide ? 'hide' : 'show'}`}>
                  {heelSize.map((element, index) => {
                    return (
                      <div className={`list-${index + 1}`}
                           key={index}>

                        {element.map((el, idx) => {
                          return (
                            <li key={idx} 
                                onChange={() => updateFilters('heelSize', el)}>
                              <label>
                                <input className="checkbox"                                   
                                       type="checkbox" 
                                       name={`checkbox-${el}`} 
                                       value={el} 
                                       checked={this.isCancel ? false : null} />
                                <span className="checkbox-custom"></span>
                                <span className="label">{el}</span>
                              </label>
                            </li>
                          );
                        })}
                        
                      </div>
                    );
                  })}                   
                </ul>

              </div>

            </div>
          </section>

          <div className="separator-150 separator-150-5"></div> 

          <section className="sidebar__division">  
            <div className="sidebar__occasion">

              <div className="sidebar__division-title">
                <h3>Повод</h3>                
                <div className={`${reasonHide ? 'opener-up' : 'opener-down'}`} 
                     onClick={() => this.setState({reasonHide: !reasonHide})}>
                </div>
              </div>

              <ul className={`${reasonHide ? 'hide' : 'show'}`}>
                {reason.map((el, index) => {
                  return (
                    <li key={index} 
                        onClick={() => updateFilters('reason', el)}>
                      <a>{el}</a>
                    </li>
                  );
                })}                 
              </ul>

            </div>
          </section>

          <div className="separator-150 separator-150-6"></div>   

          <section className="sidebar__division">
            <div className="sidebar__season">

              <div className="sidebar__division-title">
                <h3>Сезон</h3>
                <div className={`${seasonHide ? 'opener-up' : 'opener-down'}`} 
                     onClick={() => this.setState({seasonHide: !seasonHide})}>
                </div>                
              </div>

              <ul className={`${seasonHide ? 'hide' : 'show'}`}>
                {season.map((el, index) => {
                  return (
                    <li key={index} 
                        onClick={() => updateFilters('season', el)}>
                      <a>{el}</a>
                    </li>
                  );
                })}
              </ul>

            </div>
          </section>

          <div className="separator-150 separator-150-7"></div>   
                  
          <section className="sidebar__division">
            <div className="sidebar__brand">
              <h3>Бренд</h3>
              <select className="sidebar-brand__container"                        
                      onChange={ev => updateFilters('brand', ev.currentTarget.value)}>
                <option selected={this.isCancel ? true : null} 
                        value="">
                </option>
                {brands.map((el, index) => <option key={index} value={el}>{el}</option>)}
              </select>                            
            </div>

            <label>
              <input className="checkbox"               
                     type="checkbox" 
                     name="checkbox-disc" 
                     value="" 
                     onChange={ev => updateFilters('discounted', ev.currentTarget.checked)} 
                     checked={this.isCancel ? false : null} />
              <span className="checkbox-discount" ></span>
              <span className="text-discount">Со скидкой</span>
            </label>

            <div className="separator-240"></div>
          </section>
              
          <section className="sidebar__division">    
            <div className="drop-down" 
                 onClick={() => updateFilters('reset')}>
              <a><span className="drop-down-icon"></span>Сбросить</a>
            </div>
          </section>

      </section>
    );
  }
}    

export default Sidebar;

 
