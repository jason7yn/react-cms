import AppLayout from "../../../component/Layout/layout";
import { Row, Col, Card, Avatar } from "antd";
const { Meta } = Card;
export default function Details() {
  const tabListNoTitle = [
    {
      key: "about",
      tab: "About"
    },
    {
      key: "course",
      tab: "Courses"
    }
  ];
  return (
    <Row justify="space-around">
      <Col span={8}>
        <Card
          title={
            <Avatar
              size={120}
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          }
        >
          <Card.Grid hoverable={false}>
            <p>Name</p>
            <p>ABC</p>
          </Card.Grid>
          <Card.Grid hoverable={false}>
            <p>Name</p>
            <p>ABC</p>
          </Card.Grid>
          <Card.Grid hoverable={false}>
            <p>Name</p>
            <p>ABC</p>
          </Card.Grid>
          <Card.Grid hoverable={false}>
            <p>Name</p>
            <p>ABC</p>
          </Card.Grid>
        </Card>
      </Col>
      <Col span={14}>
        <Card tabList={tabListNoTitle}></Card>
      </Col>
    </Row>
  );
}
