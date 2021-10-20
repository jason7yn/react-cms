import { Breadcrumb } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
//depend on layout component-> keypath of side menu state is preserve
//depend on link of breadcrumb item ->
export default function AppBreadCrumb(props) {
  const router = useRouter();
  const query = router.query;
  let keyPath = props.keyPath;
  return (
    <Breadcrumb className="breadcrumb">
      <Breadcrumb.Item key="Overview">
        <Link href="/dashboard">CMS MANAGER SYSTEM</Link>
      </Breadcrumb.Item>

      {keyPath.map((path, index) => {
        if (index !== keyPath.length - 2) {
          return <Breadcrumb.Item key={path}>{path}</Breadcrumb.Item>;
        } else {
          return (
            <Breadcrumb.Item key={path}>
              <Link href="/dashboard/">{path}</Link>
            </Breadcrumb.Item>
          );
        }
      })}
    </Breadcrumb>
  );
}
