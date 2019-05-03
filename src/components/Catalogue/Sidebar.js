
import React, { Component } from 'react';

import $ from 'jquery';
import slider from '../../../node_modules/jquery-ui/ui/widgets/slider';

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

  componentDidMount() {

    $("input#minCost").change(function(){
      var value1=$("input#minCost").val();
      var value2=$("input#maxCost").val();
    
        if(parseInt(value1) > parseInt(value2)){
        value1 = value2;
        $("input#minCost").val(value1);
      }
      $("#slider-range").slider("values",0,value1);	
    });
    
      
    $("input#maxCost").change(function(){
      var value1=$("input#minCost").val();
      var value2=$("input#maxCost").val();
      
      if (value2 > 100000) { value2 = 100000; $("input#maxCost").val(100000)}
    
      if(parseInt(value1) > parseInt(value2)){
        value2 = value1;
        $("input#maxCost").val(value2);
      }
      $("#slider-range").slider("values",1,value2);
    });


    $("#slider-range").slider({
      min: 0,
      max: 100000,
      values: [0, 100000],
      range: true,
      change: (event, ui) => {
        const minPrice = ui.values[0];
        const maxPrice = ui.values[1];
        $("input#minCost").val(minPrice);
        $("input#maxCost").val(maxPrice);
        this.props.updateFilters('minPrice', minPrice);   
        this.props.updateFilters('maxPrice', maxPrice);   
      }
      
    });

  }

  render() {

    const { updateFilters, filters, brands } = this.props;
    const { type, color, size, heelSize, reason, season } = this.state;
    const isCancel = JSON.stringify(filters) === '{}';

    if (isCancel) {
      $("#slider-range").slider("values", 0, 0);
      $("#slider-range").slider("values", 1, 100000);
    } 

    return(
      <section className="sidebar">
          <section className="sidebar__division">
            <div className="sidebar__catalogue-list">
              <div className="sidebar__division-title">
                <h3>Каталог</h3>
                <div className="opener-down"></div>
              </div>
              <ul>
                {type.map((el, index) => <li key={index} onClick={() => updateFilters('type', el)}><a>{el}</a></li>)}
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
                  <div id="slider-range"></div>
                </div>
                <div className="counter">
                  <input type="text" id="minCost" defaultValue="0" value={isCancel ? 0 : null}/>
                  <div className="input-separator"></div>
                  <input type="text" id="maxCost" defaultValue="100000" value={isCancel ? 100000 : null}/>
                </div>
              </div>              
            </div>
          </section>

          <div className="separator-150 separator-150-2"></div>

          <section className="sidebar__division">
            <div className="sidebar__color" >
              <div className="sidebar__division-title">
                <h3>Цвет</h3>
                <div className="opener-down"></div>
              </div>
              <ul>    
                {color.map((el, index) => <li key={index} onClick={() => updateFilters('color', el.title)}><a><div className={`color ${el.color}`}></div><span className="color-name">{el.title}</span></a></li>)}
              </ul>
            </div>
          </section>

          <div className="separator-150 separator-150-3"></div>    

          <section className="sidebar__division">
            <div className="sidebar__size" >
              <div className="sidebar__division-title">
                <h3>Размер</h3><div className="opener-down"></div>
              </div>
              <ul>
                {size.map((element, index) => {
                  return(
                    <div className={`list-${index + 1}`}>
                      {element.map((el, idx) => <li key={idx} onChange={() => updateFilters('size', el)}><label><input type="checkbox" className="checkbox" name={`checkbox-${el}`} value={el} checked={isCancel ? false : null}/><span className="checkbox-custom"></span> <span className="label">{el}</span></label></li>)}
                    </div>
                  )
                })} 
              </ul>
            </div>
          </section>

          <div className="separator-150 separator-150-4"></div>   

          <section className="sidebar__division">    
            <div className="sidebar__heel-height" >
              <div className="sidebar__division-title">
                <h3>Размер каблука</h3><div className="opener-down"></div>
                <ul>
                  {heelSize.map((element, index) => {
                    return(
                      <div className={`list-${index + 1}`}>
                        {element.map((el, idx) => <li key={idx} onChange={() => updateFilters('heelSize', el)}><label><input type="checkbox" className="checkbox" name={`checkbox-${el}`} value={el} checked={isCancel ? false : null}/><span className="checkbox-custom"></span> <span className="label">{el}</span></label></li>)}
                      </div>
                    )
                  })}                   
                </ul>
              </div>
            </div>
          </section>

          <div className="separator-150 separator-150-5"></div> 

          <section className="sidebar__division">  
            <div className="sidebar__occasion" >
              <div className="sidebar__division-title">
                <h3>Повод</h3><div className="opener-down"></div>
              </div>
              <ul>
                {reason.map((el, index) => <li key={index} onClick={() => updateFilters('reason', el)}><a>{el}</a></li>)}                
              </ul>
            </div>
          </section>

          <div className="separator-150 separator-150-6"></div>   

          <section className="sidebar__division">
            <div className="sidebar__season" >
              <div className="sidebar__division-title">
                <h3>Сезон</h3><div className="opener-down"></div>                
              </div>
              <ul>
                {season.map((el, index) => <li key={index} onClick={() => updateFilters('season', el)}><a>{el}</a></li>)}
              </ul>
            </div>
          </section>

          <div className="separator-150 separator-150-7"></div>   
                  
          <section className="sidebar__division">
            <div className="sidebar__brand">
              <h3>Бренд</h3>
              <select name="" className="sidebar-brand__container" onChange={ev => updateFilters('brand', ev.currentTarget.value)}>
                <option selected={isCancel ? true : null } value=""></option>
                {brands.map((el, index) => <option value={el}>{el}</option>)}
              </select>              
            </div>

            <label>
              <input type="checkbox" className="checkbox" name="checkbox-disc" value="" onChange={ev => updateFilters('discounted', ev.currentTarget.checked)} checked={isCancel ? false : null}/>
              <span className="checkbox-discount" ></span>
              <span className="text-discount">Со скидкой</span>
            </label>

            <div className="separator-240"></div>
          </section>
              
          <section className="sidebar__division">    
            <div className="drop-down" onClick={() => updateFilters('reset')}>
              <a><span className="drop-down-icon"></span>Сбросить</a>
            </div>
          </section>
      </section>
    );
  }
}    

export default Sidebar;

 
