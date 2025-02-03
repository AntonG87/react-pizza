import Categories from '.././Components/Categories/Categories'
import Sort from '.././Components/Sort/Sort'
import PizzaBlock from '.././Components/PizzaBlock/PizzaBlock'
import React from 'react'
import Skeleton from '.././Components/PizzaBlock/PizzaBlockSkeleton'
import PaginationControlled from '../Components/Pagination/Paginate'
import {SearchContext} from '../App'

const Home = () => {
  const {searchValue} = React.useContext(SearchContext);
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [categoryId, setCategoryId] = React.useState(0)
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sort: 'rating'
  })
  const [currentPage, setCurrentPage] = React.useState(1)
  const [сountPizzas,setCountPizzas] = React.useState(0)



  const limitPizzas = 3;
  const pagesCount = Math.ceil(сountPizzas / limitPizzas)


  const pizzas = items.filter(obj => {
    return obj.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false
  }).map((obj) => <PizzaBlock {...obj} key={obj.id}/>
  )

  const skeleton = [...new Array(items.length)].map((_, index) => (
    <Skeleton key={index}/>))

  React.useEffect(() => {setCurrentPage(1);}, [categoryId]);

  React.useEffect(() => {
    setIsLoading(true)
    console.log(currentPage)

    const order = sortType.sort.includes('-') ? 'asc' : 'desc'
    const sortBy = sortType.sort.replace('-', '')
    const category = categoryId > 0 ? `category=${categoryId}` : ''
    fetch(`https://6794d4b2aad755a134ea88e6.mockapi.io/items?page=${currentPage}&limit=${limitPizzas}&${category}&sortBy=${sortBy}&order=${order}`)

      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(json => {
        setItems(json)
        setIsLoading(false)

        switch (categoryId) {
          case 0:
            // для категории "Все"
            setCountPizzas(12)
            break
          case 1:
            //
            setCountPizzas(6)
            break
          case 2:
            //
            setCountPizzas(1)
            break
          case 3:
            //
            setCountPizzas(1)
            break
          case 4:
            //
            setCountPizzas(2)
            break
          case 5:
            setCountPizzas(2)
            break
          default:
            setCountPizzas(12)

        }

      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Can be 'auto' or 'smooth'
    })
  }, [categoryId, sortType, currentPage,])



  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId}
                      setCategoryId={(id) => setCategoryId(id)}/>
          <Sort value={sortType} setSortSelected={(i) => setSortType(i)}/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading ? skeleton : pizzas}
        </div>
        {pagesCount > 1
          ? <PaginationControlled pagesCount={pagesCount}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}/>
          :''
        }
      </div>
    </div>
  )
}

export default Home
