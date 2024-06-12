import { useEffect, useState } from "react";
import { getTags } from "../../service/getTags";
import { Button, Form, Select, Tag } from "antd";
import { getCitys } from "../../service/getCitys";
import "./styles.scss";
import Slider from "../../components/Slider";
import { getCompany } from "../../service/getCompany";

function Introduce() {
  const [dataTag, setDataTag] = useState([]);
  const [dataCity, setDataCity] = useState([]);
  const [dataCompa, setDataCompa] = useState([]);
  useEffect(() => {
    getTags().then((data) => {
      setDataTag(data);
    });
  }, []);

  useEffect(() => {
    getCompany().then((data) => {
      setDataCompa(data);
    });
  }, []);

  useEffect(() => {
    getCitys().then((data) => {
      setDataCity(data);
    });
  }, []);

  const filterOption = (input, option) =>
    (option?.value ?? "").toLowerCase().includes(input.toLowerCase());

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const handleSubmit = (e) => {
    console.log(e);
  };

  return (
    <>
      <div className="introduce">
        <h1>1000+ IT Jobs For Developer</h1>
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
            // width: "100%",
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Thành phố:"
            name="city"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn 1 thành phố",
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              placeholder="Chọn 1 thành phố"
              optionFilterProp="children"
              options={dataCity}
              filterOption={filterOption}
              onSearch={onSearch}
            />
          </Form.Item>
          <Form.Item
            label="Ngôn ngữ lập trình"
            name="language"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngôn ngữ lập trình",
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select"
              options={dataTag}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 18,
            }}
          >
            <Button type="primary" htmlType="submit">
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
        <div className="tag">
          {dataTag.map((item) => (
            <>
              <Tag key={item.id} color="blue">
                {item.value}
              </Tag>
            </>
          ))}
        </div>
        <Slider dataCompa={dataCompa} />
      </div>
    </>
  );
}

export default Introduce;
