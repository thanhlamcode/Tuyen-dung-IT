import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";

function EditJob() {
  return (
    <>
      <Button
        style={{
          color: "#0080CF",
        }}
        icon={<EditOutlined />}
      ></Button>
    </>
  );
}

export default EditJob;
