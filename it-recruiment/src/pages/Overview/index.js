import { Col, Progress, Row } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import {
  allCV,
  allCVRead,
  countJob,
  countJobStatus,
} from "../../helpers/overviewhelper";
import "./styles.scss";
import ColumnLine from "./ColumnLine";

function Overview() {
  const idCompany = getCookie("idCompany");
  const [countJobData, setCountJob] = useState(0);
  const [status, setStatus] = useState(0);
  const [totalCv, setCV] = useState(0);
  const [CVRead, setCvRead] = useState(0);

  useEffect(() => {
    countJob(idCompany).then((data) => {
      setCountJob(data);
    });
    countJobStatus(idCompany).then((data) => {
      setStatus(data);
    });
    allCV(idCompany).then((data) => {
      setCV(data);
    });
    allCVRead(idCompany).then((data) => {
      setCvRead(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(countJobData);

  return (
    <>
      <div className="overview">
        <Row gutter={[20, 20]}>
          <Col xl={6} md={12} sm={24} xs={24}>
            <div className="number-job">
              TỔNG SỐ CÔNG VIỆC
              <p>
                {countJobData} <span>CÔNG VIỆC</span>
              </p>
            </div>
          </Col>
          <Col xl={6} md={12} sm={24} xs={24}>
            <div className="jobing">
              CÔNG VIỆC ĐANG TUYỂN DỤNG
              <div className="bottom">
                {" "}
                <p>
                  {status} <span>CÔNG VIỆC</span>
                </p>
                <Progress
                  type="circle"
                  percent={((status / countJobData) * 100).toFixed(1)}
                  size={50}
                  strokeColor="#DC1A50"
                />{" "}
              </div>
            </div>
          </Col>
          <Col xl={6} md={12} sm={24} xs={24}>
            <div className="allcv">
              TỔNG SỐ CV{" "}
              <p>
                {totalCv} <span>CV</span>{" "}
              </p>
            </div>
          </Col>
          <Col xl={6} md={12} sm={24} xs={24}>
            <div className="cvread">
              SỐ CV ĐÃ ĐỌC{" "}
              <div className="bottom">
                <p>
                  {CVRead} <span>CV</span>{" "}
                </p>{" "}
                <Progress
                  type="circle"
                  percent={((CVRead / totalCv) * 100).toFixed(1)}
                  size={50}
                  strokeColor="#0DBF76"
                />{" "}
              </div>
            </div>
          </Col>
        </Row>

        <h1>ANT DESIGN CHARTS</h1>
        <Row gutter={10}>
          <Col xs={16}>
            <ColumnLine />
          </Col>
          <Col xs={8}></Col>
        </Row>
      </div>
    </>
  );
}

export default Overview;
