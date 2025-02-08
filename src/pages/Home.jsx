import Categories from '.././Components/Categories/Categories'
import Sort, {list} from '.././Components/Sort/Sort'
import PizzaBlock from '.././Components/PizzaBlock/PizzaBlock'
import React from 'react'
import Skeleton from '.././Components/PizzaBlock/PizzaBlockSkeleton'
import PaginationControlled from '../Components/Pagination/Paginate'
import {SearchContext} from '../App'
import {useDispatch, useSelector} from 'react-redux'
import {
  setCategoryId,
  setCountPizzas,
  setCurrentPage,
  setFilters
} from '../Redux/sliices/filterSlice'
import axios from 'axios'
import qs from 'qs'
import {useNavigate} from 'react-router'

const Home = () => {
  const navigate = useNavigate()
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const categoryId = useSelector(state => state.filterSlice.categoryId);
  const dispatch = useDispatch();
  const onChangeCategory = (id) =>{
    dispatch(setCategoryId(id))

  };

  const countPizzas = useSelector(state => state.filterSlice.countPizzas);
  const onChangeCountPizzas = (value) => {
    dispatch(setCountPizzas(value));
  };

  const limitPizzas = useSelector(state => state.filterSlice.limitPizzas);
  const pagesCount = Math.ceil(countPizzas / limitPizzas)

  const currentPage =  useSelector(state => state.filterSlice.currentPage);
  const onChangeCurrentPage = (value)=>{
    dispatch(setCurrentPage(value))
  }

  const sortType = useSelector((state) =>state.filterSlice.sortType.sort)

  const {searchValue} = React.useContext(SearchContext);
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)


  const pizzas = items.filter(obj => {
    return obj.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false
  }).map((obj) => <PizzaBlock {...obj} key={obj.id}/>
  )
  const skeleton = [...new Array(items.length)].map((_, index) => (
    <Skeleton key={index}/>))

  const fetchPizzas = ()=>{
    setIsLoading(true)


    const order = sortType.includes('-') ? 'asc' : 'desc'
    const sortBy = sortType.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    axios
      .get(`https://6794d4b2aad755a134ea88e6.mockapi.io/items?page=${currentPage}&limit=${limitPizzas}&${category}&sortBy=${sortBy}&order=${order}`)
      .then((res)=>{
        setItems(res.data)
        setIsLoading(false)

        switch (categoryId) {
          case 0:
            // для категории "Все"
            onChangeCountPizzas(12)
            break
          case 1:
            //
            onChangeCountPizzas(6)
            break
          case 2:
            //
            onChangeCountPizzas(1)
            break
          case 3:
            //
            onChangeCountPizzas(1)
            break
          case 4:
            //
            onChangeCountPizzas(2)
            break
          case 5:
            onChangeCountPizzas(2)
            break
          default:
            onChangeCountPizzas(12)

        }

      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }

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
  },[categoryId, sortType, currentPage,])

  React.useEffect(() => {
    if(!isSearch.current){
      fetchPizzas();
    }
    isSearch.current = false;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Can be 'auto' or 'smooth'
    })
  }, [categoryId, sortType, currentPage,])

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
        <div className="content__items">
          {isLoading ? skeleton : pizzas}
        </div>
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
