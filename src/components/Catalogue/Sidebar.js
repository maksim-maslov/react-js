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
          <div className="sidebar-division__wrap sidebar-division__wrap_catalogue-list">
            
            <div className="sidebar-division-wrap__title">
              <h3 className="sidebar-division-wrap-title__text">Каталог</h3>
              <div className={`sidebar-division-wrap-title__control ${typeHide ? 'sidebar-division-wrap-title__control_opener-up' : 'sidebar-division-wrap-title__control_opener-down'}`} 
                    onClick={() => this.setState({typeHide: !typeHide})}>
              </div>
            </div>

            <ul className={`sidebar-division-wrap__content ${typeHide ? 'sidebar-division-wrap__content_hide' : 'sidebar-division-wrap__content_show'}`}>
              {type.map((el, index) => {
                return (
                  <li className="sidebar-division-wrap-content__item"
                      key={index} 
                      onClick={() => updateFilters('type', el)}>
                    <div className="sidebar-division-wrap-content-item__text">{el}</div>
                  </li>
                );
              })}
            </ul>

          </div>
        </section>

        <div className="separator-150 separator-150-1"></div>

        <section className="sidebar__division">
          <div className="sidebar-division__wrap sidebar-division__wrap_price">

            <div className="sidebar-division-wrap__title">
              <h3 className="sidebar-division-wrap-title__text">Цена</h3>
              <div className={`sidebar-division-wrap-title__control ${priceHide ? 'sidebar-division-wrap-title__control_opener-up' : 'sidebar-division-wrap-title__control_opener-down'}`} 
                    onClick={() => this.setState({priceHide: !priceHide})}>
              </div>                
            </div>

            <div className={`sidebar-division-wrap__price-slider ${priceHide ? 'sidebar-division-wrap__price-slider_hide' : 'sidebar-division-wrap__price-slider_show'}`}>
              <div className="sidebar-division-wrap-price-slider__circle-container">
                <div id="slider-range" 
                      ref={el => this.$sliderRange = $(el)}>
                </div>
              </div>
              <div className="sidebar-division-wrap-price-slider__counter">
                <input id="minCost" 
                        ref={el => this.$inputMinCost = $(el)} 
                        type="text" 
                        defaultValue="0" 
                        value={this.isCancel ? 0 : null} />
                <div className="sidebar-division-wrap-price-slider-counter__input-separator"></div>
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
          <div className="sidebar-division__wrap sidebar-division__wrap_color" >

            <div className="sidebar-division-wrap__title">
              <h3 className="sidebar-division-wrap-title__text">Цвет</h3>
              <div className={`sidebar-division-wrap-title__control ${colorHide ? 'sidebar-division-wrap-title__control_opener-up' : 'sidebar-division-wrap-title__control_opener-down'}`} 
                    onClick={() => this.setState({colorHide: !colorHide})}>
              </div>
            </div>

            <ul className={`sidebar-division-wrap__content ${colorHide ? 'sidebar-division-wrap__content_hide' : 'sidebar-division-wrap__content_show'}`}>
              {color.map((el, index) => {
                return (
                  <li className="sidebar-division-wrap-content__item" 
                      key={index} 
                      onClick={() => updateFilters('color', el.title)}>
                    <div className="sidebar-division-wrap-content-item__text">
                      <div className={`sidebar-division-wrap-content-item__color ${el.color}`}></div>
                      <span className="sidebar-division-wrap-content-item__color-name">{el.title}</span>
                    </div>
                  </li>
                );
              })}
            </ul>

          </div>
        </section>

        <div className="separator-150 separator-150-3"></div>    

        <section className="sidebar__division">
          <div className="sidebar-division__wrap sidebar-division__wrap_size" >

            <div className="sidebar-division-wrap__title">
              <h3 className="sidebar-division-wrap-title__text">Размер</h3>
              <div className={`sidebar-division-wrap-title__control ${sizeHide ? 'sidebar-division-wrap-title__control_opener-up' : 'sidebar-division-wrap-title__control_opener-down'}`} 
                    onClick={() => this.setState({sizeHide: !sizeHide})}>
              </div>
            </div>

            <ul className={`sidebar-division-wrap__content ${sizeHide ? 'sidebar-division-wrap__content_hide' : 'sidebar-division-wrap__content_show'}`}>
              {size.map((element, index) => {
                return (
                  <div className={`sidebar-division-wrap-content__list sidebar-division-wrap-content__list_list-${index + 1}`}
                        key={index}>

                    {element.map((el, idx) => {
                      return (
                        <li className="sidebar-division-wrap-content-list__item"
                            key={idx} 
                            onChange={() => updateFilters('size', el)}>
                          <label>
                            <input className="sidebar-division-wrap-content-list-item__checkbox"                                 
                                    type="checkbox" 
                                    name={`checkbox-${el}`} 
                                    value={el} 
                                    checked={this.isCancel ? false : null} />
                            <span className="sidebar-division-wrap-content-list-item__checkbox-custom"></span>
                            <span className="sidebar-division-wrap-content-list-item__label">{el}</span>
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
          <div className="sidebar-division__wrap sidebar-division__wrap_heel-height" >
          
            <div className="sidebar-division-wrap__title">
              <h3 className="sidebar-division-wrap-title__text">Размер каблука</h3>

              <div className={`sidebar-division-wrap-title__control ${heelSizeHide ? 'sidebar-division-wrap-title__control_opener-up' : 'sidebar-division-wrap-title__control_opener-down'}`} 
                    onClick={() => this.setState({heelSizeHide: !heelSizeHide})}>
              </div>

              <ul className={`sidebar-division-wrap__content ${heelSizeHide ? 'sidebar-division-wrap__content_hide' : 'sidebar-division-wrap__content_show'}`}>
                {heelSize.map((element, index) => {
                  return (
                    <div className={`sidebar-division-wrap-content__list sidebar-division-wrap-content__list_list-${index + 1}`}
                          key={index}>

                      {element.map((el, idx) => {
                        return (
                          <li className="sidebar-division-wrap-content-list__item"
                              key={idx} 
                              onChange={() => updateFilters('heelSize', el)}>
                            <label>
                              <input className="sidebar-division-wrap-content-list-item__checkbox"                                 
                                      type="checkbox" 
                                      name={`checkbox-${el}`} 
                                      value={el} 
                                      checked={this.isCancel ? false : null} />
                              <span className="sidebar-division-wrap-content-list-item__checkbox-custom"></span>
                              <span className="sidebar-division-wrap-content-list-item__label">{el}</span>
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
          <div className="sidebar-division__wrap sidebar-division__wrap_occasion">

            <div className="sidebar-division-wrap__title">
              <h3 className="sidebar-division-wrap-title__text">Повод</h3>                
              <div className={`sidebar-division-wrap-title__control ${reasonHide ? 'sidebar-division-wrap-title__control_opener-up' : 'sidebar-division-wrap-title__control_opener-down'}`} 
                    onClick={() => this.setState({reasonHide: !reasonHide})}>
              </div>
            </div>

            <ul className={`sidebar-division-wrap__content ${reasonHide ? 'sidebar-division-wrap__content_hide' : 'sidebar-division-wrap__content_show'}`}>
              {reason.map((el, index) => {
                return (
                  <li className="sidebar-division-wrap-content__item"
                      key={index} 
                      onClick={() => updateFilters('reason', el)}>
                    <div className="sidebar-division-wrap-content-item__text">{el}</div>
                  </li>
                );
              })}                 
            </ul>

          </div>
        </section>

        <div className="separator-150 separator-150-6"></div>   

        <section className="sidebar__division">
          <div className="sidebar-division__wrap sidebar-division__wrap_season">

            <div className="sidebar-division-wrap__title">
              <h3 className="sidebar-division-wrap-title__text">Сезон</h3>
              <div className={`sidebar-division-wrap-title__control ${seasonHide ? 'sidebar-division-wrap-title__control_opener-up' : 'sidebar-division-wrap-title__control_opener-down'}`} 
                    onClick={() => this.setState({seasonHide: !seasonHide})}>
              </div>                
            </div>

            <ul className={`sidebar-division-wrap__content ${seasonHide ? 'sidebar-division-wrap__content_hide' : 'sidebar-division-wrap__content_show'}`}>
              {season.map((el, index) => {
                return (
                  <li className="sidebar-division-wrap-content__item"
                      key={index} 
                      onClick={() => updateFilters('season', el)}>
                    <div className="sidebar-division-wrap-content-item__text">{el}</div>
                  </li>
                );
              })}
            </ul>

          </div>
        </section>

        <div className="separator-150 separator-150-7"></div>   
                
        <section className="sidebar__division">
          <div className="sidebar-division__wrap sidebar-division__wrap_brand">
            <h3 className="sidebar-division-wrap__brand-title-text">Бренд</h3>
            <select className="sidebar-division-wrap__brand-content"                        
                    onChange={ev => updateFilters('brand', ev.currentTarget.value)}>
              <option selected={this.isCancel ? true : null} 
                      value="">
              </option>
              {brands.map((el, index) => <option key={index} value={el}>{el}</option>)}
            </select>                            
          </div>

          <label className="sidebar-division__discount">
            <input className="sidebar-division-discount__checkbox"               
                    type="checkbox" 
                    name="checkbox-disc" 
                    value="" 
                    onChange={ev => updateFilters('discounted', ev.currentTarget.checked)} 
                    checked={this.isCancel ? false : null} />
            <span className="sidebar-division-discount__checkbox-custom" ></span>
            <span className="sidebar-division-discount__label">Со скидкой</span>
          </label>

          <div className="separator-240"></div>
        </section>
        
            
        <section className="sidebar__division">    
          <div className="sidebar-division__wrap sidebar-division__wrap_drop-down" 
                onClick={() => updateFilters('reset')}>
            <div className="sidebar-division-wrap__text"><span className="sidebar-division-wrap__drop-down-icon"></span>Сбросить</div>
          </div>
        </section>

      </section>
    );
  }
}    

export default Sidebar;

 
