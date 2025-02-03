import React from 'react'

const Categories = (props) => {
    const categories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ];

    return (
        <div className="categories">
            <ul>
                {
                    categories.map((name,i) =>
                    <li className={props.value === i? 'active' : '' }
                        onClick={()=>{props.setCategoryId(i)}}
                        key={i}>
                        {name}
                    </li>)
                }
            </ul>
        </div>
    )
}

 export default Categories;