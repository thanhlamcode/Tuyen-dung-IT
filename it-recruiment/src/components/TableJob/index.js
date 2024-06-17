import { Button, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getJobsOnIdCompany } from "../../service/getJobs";
import { getCookie } from "../../helpers/cookie";
import { render } from "sass";
import EditJob from "../EditJob";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
function TableJob() {
  const idCompany = getCookie("idCompany");
  const [dataJob, setDataJob] = useState([]);
  useEffect(() => {
    getJobsOnIdCompany(idCompany).then((data) => {
      setDataJob(data);
    });
  }, []);

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
      <Table columns={columns} dataSource={dataJob} />
    </>
  );
}

export default TableJob;
