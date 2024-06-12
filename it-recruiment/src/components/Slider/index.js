import { Col, Row } from "antd";
import "./styles.scss";

function Slider(props) {
  const { dataCompa } = props;
  console.log(dataCompa);
  return (
    <>
      <div className="slider">
        <div>
          {dataCompa.map((item) => (
            <>
              <div className="wrap-img">
                <img alt="Ảnh công ty" src={item.thumbnail}></img>
              </div>
              <div className="wrap-content">
                <Row>
                  <Col span={8}>
                    <div className="wrap-content__img">
                      <img alt="logo" src={item.logo}></img>
                    </div>
                  </Col>
                  <Col span={16}>
                    <h3>{item.companyName}</h3>
                    <h4>{item.description}</h4>
                    <p>{item.detail}</p>
                  </Col>
                </Row>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Slider;
