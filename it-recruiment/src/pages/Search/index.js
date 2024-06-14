import { Tag } from "antd";
import { useSelector } from "react-redux";
import "./styles.scss";

function Search() {
  const inputSearch = useSelector((state) => state.searchReducer);
  console.log(inputSearch);
  return (
    <>
      <div className="search">
        <div className="search__header">
          <h1>Kết quả tìm kiếm: </h1>
          <Tag color="green">{inputSearch.city}</Tag>
          {inputSearch.language.map((item) => (
            <>
              <Tag color="cyan">{item}</Tag>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;
