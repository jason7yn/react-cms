import { Breadcrumb } from "antd";
import Link from "next/link";
export default function AppBreadCrumb(props) {
  return (
    <Breadcrumb className="breadcrumb">
      <Breadcrumb.Item key="Overview">
        <Link href="/dashboard">CMS MANAGER SYSTEM</Link>
      </Breadcrumb.Item>
      {props.keyPath.map(path => (
        <Breadcrumb.Item key={path}>{path}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
