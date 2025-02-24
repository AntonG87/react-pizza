import Categories from '../Components/Categories/Categories'
import Sort, {list} from '../Components/Sort/Sort'
import PizzaBlock from '../Components/PizzaBlock/PizzaBlock'
import React from 'react'
import Skeleton from '../Components/PizzaBlock/PizzaBlockSkeleton'
import PaginationControlled from '../Components/Pagination/Paginate'
import {useSelector} from 'react-redux'
import notFoundJPG from '../assets/img/notFoundFilterPizza.jpg'
import {
  selectFilter,
  setCategoryId,
  setCountPizzas,
  setCurrentPage,
  setFilters
} from '../Redux/sliices/filterSlice'
import qs from 'qs'
import {useNavigate} from 'react-router'
import {fetchPizzas, Status} from '../Redux/sliices/pizzasSlice'
import {RootState, useAppDispatch} from "../Redux/store";


const Home : React.FC = () => {
  const {limitPizzas,categoryId,searchValue,currentPage,countPizzas} = useSelector(selectFilter)
  const sortType = useSelector((state: RootState) => state.filterSlice.sortType.sort)
  const navigate = useNavigate()
  const isSearch = React.useRef(true);
  const isMounted = React.useRef(false);

  const dispatch = useAppDispatch();

  const onChangeCategory = React.useCallback((id: number) => {
      dispatch(setCategoryId(id));
      },[dispatch]
  );


  const onChangeCountPizzas = (value:number) => {
    dispatch(setCountPizzas(value));
  };

  const pagesCount = Math.ceil(countPizzas / limitPizzas)

  const {items,status} = useSelector((state: RootState) =>state.pizzasSlice)

  const onChangeCurrentPage = (value:number)=>{
    dispatch(setCurrentPage(value))
  }

  const pizzas = items.filter(obj => {
    return obj.title.toLowerCase().includes(searchValue.toLowerCase())
    // @ts-ignore
  }).map((obj) => <PizzaBlock key={obj.id} {...obj}/> )

  const skeleton = [...new Array(6)].map((_, index) => (
    <Skeleton key={index}/>))

  const getPizzas = async () => {
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
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
    if(isSearch.current){
      getPizzas();
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' //
    })
  }, [categoryId, sortType, currentPage])

  React.useEffect(()=>{
    if(window.location.search) {
      const params  = qs.parse(window.location.search.substring(1))
      const sortType  = list.find(obj => obj.sort === params.sortType);
      dispatch(setFilters({
        ...params,
        //@ts-ignore
        sortType
      }));
      isSearch.current = true
    }
  },[]);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId}
                      setCategoryId={onChangeCategory}/>
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {
          status === Status.ERROR
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
              { status === Status.LOADING ? skeleton :(
                pizzas.length === 0 ? (
                  <div className='not-found-pizza-block'>
                    <img className='notFoundJPG' alt='logo' src={notFoundJPG} />
                    <p className='desc-not-found-pizza'>Нет совпадений по вашему запросу.</p>
                  </div>
                ) : (
                  pizzas
                )
              )}
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
