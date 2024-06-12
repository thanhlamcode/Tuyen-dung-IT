import { Button, Form, Input, InputNumber, Select } from "antd";
import "./styles.scss";

function Register() {
  const workingTime = [
    { key: 1, value: "Monday" },
    { key: 2, value: "Tuesday" },
    { key: 3, value: "Wednesday" },
    { key: 4, value: "Thursday" },
    { key: 5, value: "Friday" },
    { key: 6, value: "Saturday" },
    { key: 7, value: "Sunday" },
  ];

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };

  const handleSubmit = (e) => {
    console.log(e);
  };

  return (
    <>
      <div className="register">
        <h1>Đăng ký</h1>
        <Form
          {...formItemLayout}
          style={{
            maxWidth: 600,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Tên công ty"
            name="companyName"
            rules={[
              {
                required: true,
                message: "Vui lòng điền tên công ty!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng điền số điện thoại",
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
              maxLength={10}
            />
          </Form.Item>

          <Form.Item
            label="Logo"
            name="logo"
            rules={[
              {
                required: true,
                message: "Đường dẫn ảnh logo",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ảnh công ty"
            name="thumbnail"
            rules={[
              {
                required: true,
                message: "Đường dẫn ảnh công ty!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: "Vui lòng điền địa chỉ công ty!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Thời gian làm việc"
            name="workingTime"
            rules={[
              {
                required: true,
                // message: "Vui lòng điền địa chỉ công ty!",
              },
            ]}
          >
            <Select options={workingTime} mode="multiple" allowClear></Select>
          </Form.Item>

          <Form.Item
            label="Website"
            name="website"
            rules={[
              {
                required: true,
                message: "Vui lòng điền địa chỉ website công ty!",
              },
            ]}
          >
            <Input addonBefore="http://" addonAfter=".com" />
          </Form.Item>

          <Form.Item
            label="Số lượng nhân viên"
            name="quantityPeople"
            rules={[
              {
                required: true,
                message: "Vui lòng điền số lượng nhân viên!",
              },
            ]}
          >
            <InputNumber
              style={{
                width: "100%",
              }}
            ></InputNumber>
          </Form.Item>

          <Form.Item
            label="Mô tả ngắn gọn"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả chi tiết"
            name="detail"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input.TextArea
              style={{
                height: "80px",
              }}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 0,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Register;
