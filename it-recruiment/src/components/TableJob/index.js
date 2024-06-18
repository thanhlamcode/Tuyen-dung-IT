import { Button, Radio, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getJobsOnIdCompany } from "../../service/getJobs";
import { getCookie } from "../../helpers/cookie";
import EditJob from "../EditJob";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
function TableJob() {
  const loading = useSelector((state) => state.reloadReducer);

  const [top, setTop] = useState("topCenter");
  const [bottom, setBottom] = useState("bottomCenter");
  const idCompany = getCookie("idCompany");
  const [dataJob, setDataJob] = useState([]);
  useEffect(() => {
    getJobsOnIdCompany(idCompany).then((data) => {
      setDataJob(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  console.log(dataJob);

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
    },
    {
      title: "Mức lương ($)",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Thời gian",
      key: "createAt",
      dataIndex: "createAt",
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
      render: (_, { index }) => {
        return (
          <>
            <Space direction="vertical">
              <Button icon={<EyeOutlined />}></Button>
              <EditJob />
              <Button
                icon={<DeleteOutlined />}
                style={{
                  color: "red",
                }}
              ></Button>
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
      />
    </>
  );
}

export default TableJob;
