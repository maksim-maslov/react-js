import './css/normalize.css';
import './css/font-awesome.min.css';
import apiBaseUrl from './configApp.js'

import Catalogue from './components/Catalogue/Catalogue';
import Footer from './components/Footer/Footer';
import Favorite from './components/Favorite/Favorite';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import MainPage from './components/MainPage/MainPage';
import Order from './components/Order/Order';
import OrderDone from './components/OrderDone/OrderDone';
import ProductCardDesktop from './components/ProductCardDesktop/ProductCardDesktop';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      browsedProducts: [],                                            // Массив просмотренных товаров (ответ от сервера)
      browsedProductsIdList: localStorage.getItem('browsedProducts')  // Массив объектов id просмотренных товаров 
        ? JSON.parse(localStorage.getItem('browsedProducts'))         // /[{id: "11"}, {id: "22"},...]/ (хранитися в localStorage)
        : [],
      cartId: localStorage.getItem('cartId')                          // id корзины (хранится в localStorage)
        ? localStorage.getItem('cartId') 
        : '',
      categories: [],                                         // Массив категорий товаров (ответ от сервера)
      favorites: {},                                          // Добавленные в "Избранное" товары (ответ от сервера, вместе со статусом)
      favoritesIdList: localStorage.getItem('favorites')      // Массив объектов id товаров, добавленных в "Избранное"
        ? JSON.parse(localStorage.getItem('favorites') )      // /[{id: "11"}, {id: "22"},...]/ (хранится в localStorage)
        : [], 
      featuredCategories: [],                                 // Массив категорий товаров для блока "Новинки"
      featuredProducts: [],                                   // Массив товаров для блока "Новиники" (все категории)
      filters: {},                                            // Объект с фильтрами для товаров
      productsInBasket: []                                    // Массив добавленных в корзину товаров         
    };

    this.getFavorites = this.getFavorites.bind(this);
    this.updateBasket = this.updateBasket.bind(this);    
    this.updateBrowsedProducts = this.updateBrowsedProducts.bind(this);
    this.updateFavorites = this.updateFavorites.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
  }


  componentDidMount() {   
    this.getCategories();     
    this.getFavorites();
    this.getBrowsedProducts();
    this.getProductsInBasket({method: 'GET'});
  }


  //Промис. Преобразует массив с объектами id товаров в строку параметров запроса
  //param products - массив id товаров 
  //return done(queryString) - строка запроса
  //

  joinProductIdsToQueryString(products = []) {
    return new Promise((done, fail) => {

      const queryString = products.reduce((memo, el) => {

        memo = memo + `id[]=${el.id}&`;

        return memo;

      }, '');

      done(queryString);
    });
  }


  //Фильтрует массив объектов по указаному полю
  //param array - исходный массив 
  //param valueToCheck - поле для фильтра
  //return Object.keys(result) - созданный массив
  //

  filterArrayOnValue(array, valueToCheck) {
    const result = array.reduce((memo, el) => {
      memo[el[valueToCheck]] = true;
      return memo;
    }, {});
    
    return Object.keys(result); 
  }


  //Получает категории товаров
  //return this.setState({categories: data.data}) - массив категорий товаров
  //

  getCategories() {
    fetch(`${apiBaseUrl}/categories`)
      .then(response => response.json())
      .then(data => {
        this.setState({categories: data.data});
        return data.data;        
      })
      .then(data => this.getFeatured(data));
  }


  //Фильтрует категории и получает товары для блока "Новинки" 
  //param categories - массив категорий товаров (все категории)
  //return featuredCategories - массив категорий
  //return featuredProducts - массив товаров
  //

  getFeatured(categories) {
    fetch(`${apiBaseUrl}/featured`)
      .then(response => response.json())
      .then(data => {
        
        const featuredCategoryIds = this.filterArrayOnValue(data.data, 'categoryId');
        
        const featuredCategories = categories.filter(el => featuredCategoryIds.includes(String(el.id)));
        
        this.setState({
          featuredCategories: featuredCategories,
          featuredProducts: data.data
        });
      });
  } 


  //Обновляет массив id "Избранных" товаров
  //param productId - id товара для добавления (удаления)
  //return favoritesIdList - массив id
  //

  updateFavorites(productId) {
    const { favoritesIdList } = this.state;

    const removeElementIndex = favoritesIdList.findIndex(el => el.id === productId);

    removeElementIndex !== -1
    ? favoritesIdList.splice(removeElementIndex, 1)
    : favoritesIdList.push({id: productId});   

    this.setState({favoritesIdList: favoritesIdList}); 

    localStorage.setItem('favorites',JSON.stringify(favoritesIdList));

    this.getFavorites();
  }


  //Получает товары для "Избранного"
  //param page - номер страницы для пагинации
  //return favorites - массив товаров
  //

  getFavorites(page = 1) {  
    const { favoritesIdList } = this.state;

    if (favoritesIdList.length) {

      this.joinProductIdsToQueryString(favoritesIdList)
        .then(queryString => {

          if (this.state.filters.sortBy) {
            queryString = queryString + `&sortBy=${this.state.filters.sortBy}`;
          }   

          return fetch(`${apiBaseUrl}/products?${queryString}&page[]=${page}`);
        })
        .then(response => response.json())
        .then(data => this.setState({favorites: data})); 
    } else {

      this.setState({favorites: []});
    }
  }


  //Обновляет массив id просмотренных товаров
  //param productId - id товара для добавления (удаления)
  //return browsedProductsIdList - массив id
  //

  updateBrowsedProducts(productId) {     
    let browsedProductsIdList = this.state.browsedProductsIdList.slice(0, 11).filter(el => el.id !== Number(productId));
    
    browsedProductsIdList.unshift({id: Number(productId)});

    this.setState({browsedProductsIdList: browsedProductsIdList}); 

    localStorage.setItem('browsedProductsIdList', JSON.stringify(browsedProductsIdList));

    this.getBrowsedProducts();   
  }


  //Получает просмотренные товары
  //return browsedProducts - массив товаров
  //

  getBrowsedProducts() {
    const { browsedProductsIdList } = this.state;

    if (browsedProductsIdList.length) {

      this.joinProductIdsToQueryString(browsedProductsIdList)
        .then(queryString => fetch(`${apiBaseUrl}/products?${queryString}`))
        .then(response => response.json())
        .then(data => this.setState({
          browsedProducts: browsedProductsIdList.map(el => data.data.find(element => element.id === el.id))
        }));

    } 
  }


  //Обновляет товары в корзине
  //param product - товар для добавления
  //
  
  updateBasket(product) {
    if (product) {

      if (!product.size) {
        return;
      } 

      const params = {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(product)
      };  

      this.getProductsInBasket(params);
    } else {

      !localStorage.getItem('cartId')
      ? this.setState({productsInBasket: []})
      : null;      
    }   
  }


  //Получает товары в корзине
  //param params - параметры для запроса 
  //return productsInBasket - массив товаров
  //

  getProductsInBasket(params) {
    const cartId = localStorage.getItem('cartId');

    if (params.method === 'GET' && !cartId) {
      this.setState({productsInBasket: []});
      return;
    } 

    const url = cartId
    ? `${apiBaseUrl}/cart/${cartId}`
    : `${apiBaseUrl}/cart/`;        

    fetch(url, params)
      .then(response => response.json())
      .then(data => {

        if (data.status === 'ok') {

          let result; 

          if (/\S+cart\/\S+/.test(url)) {

            result = data.data.products;
          } else {

            const response = JSON.parse(params.body);

            if (response instanceof Array) {
              result = response;
            } else {
              result = new Array(response);
              localStorage.setItem('cartId', data.data.id);
            }  
          }

          return result;
        } else if (/Корзина.+/.test(data.message)) {

          localStorage.setItem('cartId', '');

          this.setState({productsInBasket: []});

          throw new Error(`abort promise: status '${data.status}'`);
        }
      })
      .then(productArray => {

        return this.joinProductIdsToQueryString(productArray)
          .then(queryString => fetch(`${apiBaseUrl}/products?${queryString}`))
          .then(response => response.json())
          .then(data => {
            return productArray.map((el, index) => {
              return {item: data.data.filter(element => element.id === el.id)[0], size: el.size, amount: el.amount};
            });
          })
          .then(data => this.setState({ productsInBasket: data }));  

      })
      .catch(error => console.log(error));        
  } 
  
  
  //Обновляет фильтры товаров (сортировку)
  //param type - фильтр
  //param value - значение
  //

  updateFilters(type = '', value = '') {    
    let { filters } = this.state;

    if (type === 'size' || type === 'heelSize') {

      const size = value;

      if (filters.hasOwnProperty(type)) {

        const index = filters[type].indexOf(size);

        if (index !== -1) {
          filters[type].splice(index, 1);
          filters[type].length === 0
          ? delete filters[type]
          : null;
        } else {
          filters[type].push(size);
        }
      } else {

        filters[type] = [];
        filters[type].push(size);
      }
    } else if (type === 'discounted') {

      value === true
      ? filters.discounted = 'true'
      : delete filters['discounted'];      
    } else if (type === 'brand') {

      value !== '' 
      ? filters[type] = value
      : delete filters[type];     
    } else if (type === 'sortBy') {

      filters.sortBy = value;
      this.updateFavorites();
    } else if (type === 'reset') {

      for (let key in filters) {
        delete filters[key];
      }       
    } else {

      filters[type] = value;
    } 
      
    this.setState({filters: filters});
  }


  render() {
    const { 
      browsedProducts, 
      categories, 
      favorites, 
      favoritesIdList,       
      featuredCategories, 
      featuredProducts, 
      filters,
      productsInBasket, 
    } = this.state;
    
    return (
      <Router basename={process.env.PUBLIC_URL} >
        <div className="container">
          <Header                                         // Хедер
            categories={categories} 
            productsInBasket={productsInBasket} 
            updateBasket={this.updateBasket}            
          />          
          <Switch>
            <Route path="/catalogue" 
              render={props => <Catalogue                 // Каталог                  
                {...props} 
                browsedProducts={browsedProducts} 
                categories={categories}   
                favoritesIdList={favoritesIdList}   
                filters={filters}   
                updateFavorites={this.updateFavorites} 
                updateFilters={this.updateFilters}                 
              />} 
            />
            <Route path="/favorite" 
              render={props => favorites.status === 'ok'
              ? <Favorite                                 // Избранное
                  {...props} 
                  favorites={favorites}                 
                  getFavorites={this.getFavorites} 
                  updateFavorites={this.updateFavorites}   
                  updateFilters={this.updateFilters}                 
                />
              : <Loader />
              } 
            /> 
            <Route path="/product-card-desktop/:id" 
              render={props => categories.length
              ? <ProductCardDesktop                       // Карточка товара
                  {...props} 
                  browsedProducts={browsedProducts}
                  categories={categories} 
                  favoritesIdList={favoritesIdList}
                  updateFavorites={this.updateFavorites}   
                  updateBasket={this.updateBasket} 
                  updateBrowsedProducts={this.updateBrowsedProducts} 
                />
              : <Loader />
              } 
            />
            <Route path="/order" 
              render={props => <Order                     // Оформление заказа
                {...props} 
                productsInBasket={productsInBasket} 
                updateBasket={this.updateBasket} 
              />} 
            />
            <Route path="/order-done"                     // Заказ оформлен
              component={OrderDone}       
            />    
            <Route path="/"                               // Главная
              render={props => favoritesIdList.length && featuredCategories.length && featuredProducts.length
                ? <MainPage 
                    {...props} 
                    favoritesIdList={favoritesIdList} 
                    featuredCategories={featuredCategories} 
                    featuredProducts={featuredProducts}  
                    updateFavorites={this.updateFavorites} 
                  />
                : <Loader />
              }
            />
          </Switch>          
          <Footer                                         // Футер
          />                                              
        </div>
      </Router>
    );
  }
}

export default App;
