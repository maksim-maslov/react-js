import React, { Component } from 'react';

import { HashRouter, Route, Link, Nav, NavLink, Switch } from 'react-router-dom';

class MainMenu extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          categories: []
        };
    }
    
    componentDidMount() {
        fetch('https://neto-api.herokuapp.com/bosa-noga/categories')
            .then(response => response.json())
            .then(data => {this.setState({ categories: data.data })});
    }

    render() {
        const { categories } = this.state;
        return(
            <nav className="main-menu">
                <div className="wrapper">
                    <ul className="main-menu__items">
                        <li className="main-menu__item main-menu__item_sales">
                            <NavLink to="/catalogue">Акции</NavLink>
                        </li>
                        {categories.map(el => 
                            <li key={el.id} className="main-menu__item main-menu__item_sales">
                                <NavLink to="/catalogue">{el.title}</NavLink>
                            </li>                
                        )}
                    </ul>
                </div>
            </nav>
        )
    }

}


//         <nav className="main-menu">
//             <div className="wrapper">
//                 {/* <ul className="main-menu__items"> */}
//                     <ListCategories />
//                     {/* <li className="main-menu__item main-menu__item_sales">
//                     <NavLink to="/catalogue">Акции</NavLink>
//                     </li>
//                     <li className="main-menu__item main-menu__item_women">
//                     <NavLink to="/catalogue">Женская обувь</NavLink>
//                     </li>
//                     <li className="main-menu__item main-menu__item_men">
//                     <NavLink to="/catalogue">Мужская обувь</NavLink>
//                     </li>
//                     <li className="main-menu__item main-menu__item_kids">
//                     <NavLink to="/catalogue">Детская обувь</NavLink>
//                     </li>
//                     <li className="main-menu__item main-menu__item_accessories">
//                     <NavLink to="/catalogue">Аксессуары</NavLink>
//                     </li>
//                     <li className="main-menu__item main-menu__item_home">
//                     <NavLink to="/catalogue">Для дома</NavLink>
//                     </li>
//                     <li className="main-menu__item main-menu__item_brands">
//                     <NavLink to="/catalogue">Бренды</NavLink>
//                     </li>
//                     <li className="main-menu__item main-menu__item_new">
//                     <NavLink to="/catalogue">Новинки</NavLink>
//                     </li> */}
//                 {/* </ul> */}
//             </div>
//         </nav>


export default MainMenu;

