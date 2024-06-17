import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableJob from "../../components/TableJob";
function JobManager() {
  return (
    <>
      <div className="job-manager">
        <h3>Danh sách việc làm</h3>
        <Button icon={<PlusOutlined />}>Tạo việc mới</Button>
        <div className="table-job">
          <TableJob />
        </div>
      </div>
    </>
  );
}

export default JobManager;
