import { Breadcrumb } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
<<<<<<< HEAD
//depend on layout component-> keypath of side menu state is preserve
//depend on link of breadcrumb item ->
export default function AppBreadCrumb(props) {
  const router = useRouter();
  const query = router.query;
  let keyPath = props.keyPath;
=======
export default function AppBreadCrumb(props) {
  const router = useRouter();
  const path = router.pathname; //string - /dashboard/students etc

>>>>>>> feat:typescript, route data structure
  return (
    <Breadcrumb className="breadcrumb">
      <Breadcrumb.Item key="Overview">
        <Link href="/dashboard">CMS MANAGER SYSTEM</Link>
      </Breadcrumb.Item>
<<<<<<< HEAD

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
=======
      {props.keyPath.map((path) => (
        <Breadcrumb.Item key={path}>{path}</Breadcrumb.Item>
      ))}
>>>>>>> feat:typescript, route data structure
    </Breadcrumb>
  );
}
