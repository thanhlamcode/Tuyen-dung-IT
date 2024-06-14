import { Col, Row, Tag } from "antd";
import { useSelector } from "react-redux";
import {
  filterData,
  filterLanguage,
  searchFunction,
} from "../../helpers/search";
import "./styles.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const inputSearch = useSelector((state) => state.searchReducer);
  console.log(inputSearch);
  const [dataJobs, setDataJobs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      let jobs;
      if (inputSearch.city == null) {
        jobs = await filterLanguage(inputSearch);
      } else {
        jobs = await searchFunction(inputSearch);
      }
      const data = await filterData(jobs); // Chờ `filterData` hoàn tất
      setDataJobs(data); // Cập nhật `dataJobs` với dữ liệu đã lọc
    };

    fetchData();
  }, [inputSearch]);
  console.log(dataJobs);

  const handleClick = (id) => {
    navigate(`/apply/${id}`);
  };

  return (
    <>
      <div className="search">
        <div className="search__header">
          <h1>Kết quả tìm kiếm: </h1>
          <Tag color="green">{inputSearch.city}</Tag>
          {inputSearch.language.map((item) => (
            <Tag color="cyan" key={item}>
              {item}
            </Tag>
          ))}
        </div>

        <div className="search__result">
          <Row gutter={[20, 20]}>
            {dataJobs.map((item) => (
              <>
                <Col span={24}>
                  <div
                    className="search__result--item"
                    onClick={() => {
                      handleClick(item.id);
                    }}
                  >
                    <div className="wrap-image">
                      <img src={item.company.logo} alt="logo"></img>
                    </div>
                    <div className="wrap-content">
                      <h2>{item.name}</h2>
                      <h3>{item.company.companyName}</h3>
                      <p>
                        <strong>Địa chỉ làm việc:</strong>{" "}
                        {item.city.map((itemCity) => (
                          <>{itemCity}, </>
                        ))}
                      </p>
                      <p>
                        {" "}
                        <strong>Mức lương:</strong> {item.salary}
                      </p>
                      <p>
                        {" "}
                        <strong>Mô tả công việc:</strong> {item.description}
                      </p>
                      <div className="tags">
                        {item.tags.map((item) => (
                          <>
                            {" "}
                            <Tag color="orange">{item}</Tag>
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                </Col>
              </>
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}

export default Search;
