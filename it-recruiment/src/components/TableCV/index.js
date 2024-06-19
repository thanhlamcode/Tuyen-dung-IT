import { Button, Popconfirm, Radio, Space, Table, Tag } from "antd";
import { getDataCV } from "../../helpers/getDataCV";
import { useEffect, useState } from "react";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { patch } from "../../until/request";
import { loadPage } from "../../actions/reloadAction";

function TableCV() {
  const [data, setData] = useState([]);
  const loading = useSelector((state) => state.reloadReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getDataCV();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Xử lý lỗi khi không thể lấy dữ liệu từ API
      }
    };

    fetchData();
  }, [loading]);

  console.log(data);

  const handleDelete = () => {};

  const handleSeen = (record) => {
    console.log(record);
    const data = {
      ...record,
      statusRead: true,
    };
    const respone = patch("/cvs", record.id, data);
    if (respone) {
      dispatch(loadPage());
    }
  };

  const columns = [
    {
      title: "Tên job",
      dataIndex: "job",
      key: "job",
      render: (text) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a>{text}</a>
      ),
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (text) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a>{text}</a>
      ),
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Ngày gửi",
      key: "createAt",
      dataIndex: "createAt",
      render: (text) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a>{text}</a>
      ),
    },
    {
      title: "Trạng thái",
      key: "statusRead",
      dataIndex: "statusRead",
      render: (_, { statusRead }) => (
        <>
          {statusRead ? (
            <Tag color="green">Đã đọc</Tag>
          ) : (
            <Tag color="red">Chưa đọc</Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",
      render: (_, record) => {
        return (
          <>
            <Space direction="vertical">
              <Button
                icon={<EyeOutlined />}
                onClick={() => {
                  handleSeen(record);
                }}
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

  const [bottom, setBottom] = useState("bottomCenter");
  return (
    <>
      <Table
        columns={columns}
        dataSource={data.reverse()}
        pagination={{
          position: [bottom],
        }}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />
      ;
      <Radio.Group
        style={{
          marginBottom: 10,
        }}
        value={bottom}
        onChange={(e) => {
          setBottom(e.target.value);
        }}
      />
    </>
  );
}
export default TableCV;
