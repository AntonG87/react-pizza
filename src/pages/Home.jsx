import Categories from '.././Components/Categories/Categories'
import Sort, {list} from '.././Components/Sort/Sort'
import PizzaBlock from '.././Components/PizzaBlock/PizzaBlock'
import React from 'react'
import Skeleton from '.././Components/PizzaBlock/PizzaBlockSkeleton'
import PaginationControlled from '../Components/Pagination/Paginate'
import {useDispatch, useSelector} from 'react-redux'
import {
  selectFilter,
  setCategoryId,
  setCountPizzas,
  setCurrentPage,
  setFilters
} from '../Redux/sliices/filterSlice'
import qs from 'qs'
import {useNavigate} from 'react-router'
import {fetchPizzas} from '../Redux/sliices/pizzasSlice'


const Home = () => {
  const {limitPizzas,categoryId,searchValue,currentPage,countPizzas} = useSelector(selectFilter)
  const sortType = useSelector(state => state.filterSlice.sortType.sort)
  const navigate = useNavigate()
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const dispatch = useDispatch();
  const onChangeCategory = (id) =>{
    dispatch(setCategoryId(id))
  };

  const onChangeCountPizzas = (value) => {
    dispatch(setCountPizzas(value));
  };

  const pagesCount = Math.ceil(countPizzas / limitPizzas)

  const {items,status} = useSelector(state =>state.pizzasSlice)

  const onChangeCurrentPage = (value)=>{
    dispatch(setCurrentPage(value))
  }

  const pizzas = items.filter(obj => {
   return obj.title.toLowerCase().includes(searchValue.toLowerCase());
  }).map((obj) => <PizzaBlock key={obj.id} {...obj}/> )

  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index}/>))

  const getPizzas = async () => {
    // Determines sorting order based on sortType
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    // Constructs the category query parameter if categoryId > 0
    const category = categoryId > 0 ? `category=${categoryId}` : '';

      dispatch(
        fetchPizzas({
          currentPage,
          limitPizzas,
          category,
          sortBy,
          order,
        })
      );

      // Updates the count of pizzas based on categoryId
      switch (categoryId) {
        case 0:
          onChangeCountPizzas(12);
          break;
        case 1:
          onChangeCountPizzas(6);
          break;
        case 2:
          onChangeCountPizzas(1);
          break;
        case 3:
          onChangeCountPizzas(1);
          break;
        case 4:
          onChangeCountPizzas(2);
          break;
        case 5:
          onChangeCountPizzas(2);
          break;
        default:
          onChangeCountPizzas(12);
      }// Sets loading state to false after fetching and updating state
  };


  React.useEffect(() => {
    onChangeCurrentPage(1);
  }, [categoryId]);

  React.useEffect(()=>{
   if(isMounted.current){
     const queryString = qs.stringify({
         sortType: sortType,
         categoryId,
         currentPage
       }
     )
     navigate(`?${queryString}`)
   }
    isMounted.current = true
  },[categoryId, sortType, currentPage])

  React.useEffect(() => {
    if(!isSearch.current){
      getPizzas();
    }
    isSearch.current = false;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Can be 'auto' or 'smooth'
    })
  }, [categoryId, sortType, currentPage])

  React.useEffect(()=>{
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sortType = list.find(obj => obj.sort === params.sortType)
      dispatch(setFilters(
        {
          ...params,
          sortType
        }
      ))
      getPizzas()
      isSearch.current = true
    }
  },[]);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId}
                      setCategoryId={(id) => onChangeCategory(id)}/>
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {
          status === 'error'
            ? (
            <div>
              <h2>
                Ошибка загрузки данных
              </h2>
              <p>
                Приносим свои извинения,сервис полностью не доступен!
              </p>
            </div>
          )
            : (<div className="content__items">
              { status ==='loading' ? skeleton : pizzas}
            </div>)
        }

        {pagesCount > 1
          ? <PaginationControlled pagesCount={pagesCount}
                                  currentPage={currentPage}
                                  setCurrentPage={onChangeCurrentPage}/>
          :''
        }
      </div>
    </div>
  )
}

export default Home
