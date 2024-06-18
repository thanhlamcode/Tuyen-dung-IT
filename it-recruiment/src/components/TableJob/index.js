import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import { getJobsOnIdCompany } from "../../service/getJobs";
import { getCookie } from "../../helpers/cookie";
import { DeleteOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getTags } from "../../service/getTags";
import { useForm } from "antd/es/form/Form";
import { getCitys } from "../../service/getCitys";
function TableJob() {
  const loading = useSelector((state) => state.reloadReducer);

  const [option, setOption] = useState([]);
  const [city, setCity] = useState([]);

  const onFill = () => {
    form.setFieldsValue({
      name: "Hello world!",
      salary: 5000,
    });
  };

  useEffect(() => {
    getTags().then((data) => {
      setOption(data);
    });

    getCitys().then((data) => {
      setCity(data);
    });
  }, []);
  const [top, setTop] = useState("topCenter");
  const [bottom, setBottom] = useState("bottomCenter");
  const idCompany = getCookie("idCompany");
  const [dataJob, setDataJob] = useState([]);
  const [dataTag, setTag] = useState([]);
  useEffect(() => {
    getJobsOnIdCompany(idCompany).then((data) => {
      setDataJob(data);
    });

    getTags().then((data) => {
      setTag(data);
    });

    // form.resetFields(dataJob);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  console.log(dataJob);
  // console.log(dataTag);
  const initTag = [];
  dataTag.forEach((item) =>
    initTag.push({
      text: item.value,
      value: item.value,
    })
  );

  const handleDelete = (key) => {
    const newData = dataJob.filter((item) => item.key !== key);
    setDataJob(newData);
  };

  const rule = [
    {
      required: true,
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (id) => {
    setIsModalOpen(true);
    console.log(id);
    const data = dataJob.filter((item) => item.id === id);
    console.log(data[0]);
    form.setFieldsValue(data[0]);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = useForm();

  const columns = [
    {
      title: "Tên job",
      dataIndex: "name",
      key: "name",
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag, index) => {
            let color = index % 2 === 0 ? "blue" : "cyan";
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      filters: initTag,
      onFilter: (value, record) => record.tags.indexOf(value) === 0,
    },
    {
      title: "Mức lương ($)",
      dataIndex: "salary",
      key: "salary",
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title: "Thời gian",
      key: "createAt",
      dataIndex: "createAt",
      sorter: (a, b) => dataJob.reverse(),
    },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <>
          {status !== undefined && (
            <Tag
              color={status ? "green" : "red"}
              style={{
                fontSize: "15px",
              }}
            >
              {status ? "Đang bật" : "Đang tắt"}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (index, record) => {
        // console.log(record);
        return (
          <>
            <Space direction="vertical">
              <Button icon={<EyeOutlined />}></Button>
              <Button
                onClick={() => {
                  showModal(record.id);
                }}
                style={{
                  color: "#0080CF",
                }}
                icon={<EditOutlined />}
              ></Button>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.id)}
              >
                <Button
                  icon={<DeleteOutlined />}
                  style={{
                    color: "red",
                  }}
                ></Button>
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Radio.Group
        style={{
          marginBottom: 10,
        }}
        value={top}
        onChange={(e) => {
          setTop(e.target.value);
        }}
      />

      <Radio.Group
        style={{
          marginBottom: 10,
        }}
        value={bottom}
        onChange={(e) => {
          setBottom(e.target.value);
        }}
      />
      <Table
        columns={columns}
        dataSource={dataJob.reverse()}
        pagination={{
          position: [top, bottom],
        }}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />

      {/* Modal */}
      <Modal
        title="Tạo việc làm mới"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onLoad={onFill}
          // onFinish={handleFinish}
          wrapperCol={{
            span: 24,
          }}
          labelCol={{ span: 24 }}
        >
          {/* <Button onClick={onFill}>Onfill</Button> */}
          <Row>
            <Col span={24}>
              <Form.Item label="Tên công việc:" name="name" rules={rule}>
                <Input></Input>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label="Tags" name="tags" rules={rule}>
                <Select
                  placeholder="Search to Select"
                  mode="multiple"
                  options={option}
                  allowClear
                ></Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                label="Mức lương / tháng (USD)"
                name="salary"
                rules={rule}
              >
                <InputNumber
                  min={0}
                  max={10000}
                  style={{ width: "100%" }}
                  addonAfter="$"
                ></InputNumber>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label="Mô tả" name="description" rules={rule}>
                <Input.TextArea
                  style={{
                    height: "100px",
                  }}
                ></Input.TextArea>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item label="Thành phố" name="city" rules={rule}>
                <Select
                  placeholder="Search to Select"
                  mode="multiple"
                  options={city}
                  allowClear
                ></Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                label="Trạng thái"
                name="status"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 16 }}
                initialValue={true}
              >
                <Switch defaultChecked />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[10, 10]}>
            <Col span={24}>
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Save
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default TableJob;
