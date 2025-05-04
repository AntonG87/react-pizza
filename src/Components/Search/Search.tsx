import React, {useRef} from 'react'
// @ts-ignore
import styles from './Search.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {selectFilter, setSearchValue} from '../../Redux/sliices/filterSlice'

const Search = () => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector(selectFilter);
  const inputRef = useRef<HTMLInputElement>(null); // Устанавливаем правильный реф


  const onClickClear = () => {
    dispatch(setSearchValue(''));  // Сбрасываем значение в Redux
    inputRef.current?.focus();      // Фокусируем инпут
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100"
        height="100"
        viewBox="0 0 72 72"
      >
        <path d="M 31 11 C 19.973 11 11 19.973 11 31 C 11 42.027 19.973 51 31 51 C 34.974166 51 38.672385 49.821569 41.789062 47.814453 L 54.726562 60.751953 C 56.390563 62.415953 59.088953 62.415953 60.751953 60.751953 C 62.415953 59.087953 62.415953 56.390563 60.751953 54.726562 L 47.814453 41.789062 C 49.821569 38.672385 51 34.974166 51 31 C 51 19.973 42.027 11 31 11 z M 31 19 C 37.616 19 43 24.384 43 31 C 43 37.616 37.616 43 31 43 C 24.384 43 19 37.616 19 31 C 19 24.384 24.384 19 31 19 z"></path>
      </svg>

      <input
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
          dispatch(setSearchValue(e.target.value)); // Отправка значения в Redux
        }}
        ref={inputRef}
        value={searchValue}
        className={styles.input}
        placeholder="Search Burgers..."
      />

      {searchValue && (
        <svg
          onClick={onClickClear}
          className={styles.closeIcon}
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 50 50"
        >
          <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
        </svg>
      )}
    </div>
  );
};

export default Search;
