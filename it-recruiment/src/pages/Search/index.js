import { Col, Row, Tag } from "antd";
import { useSelector } from "react-redux";
import { filterLanguage, searchFuntion } from "../../helpers/search";
import "./styles.scss";
import { useEffect, useState } from "react";

function Search() {
  const inputSearch = useSelector((state) => state.searchReducer);
  console.log(inputSearch);
  const [dataJobs, setDataJobs] = useState();

  useEffect(() => {
    if (inputSearch.city == null) {
      setDataJobs(filterLanguage(inputSearch));
    } else {
      setDataJobs(searchFuntion(inputSearch));
    }
  }, [inputSearch]);

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

        <div className="search_result">
          <Row gutter={[20, 20]}>
            <Col md={12} sm={24}>
              <div>a</div>
            </Col>
            <Col md={12} sm={24}>
              <div>a</div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default Search;
