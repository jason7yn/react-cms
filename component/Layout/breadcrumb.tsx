import { Breadcrumb } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { routes } from "../../services/routes";
import { isEmpty, drop, head } from "lodash";

export default function AppBreadCrumb(props) {
  const router = useRouter();
  const pathname = router.pathname; //string - /dashboard/students etc
  const paths = pathname.split("/").slice(1);
  const query = router.query;

  return (
    <Breadcrumb className="breadcrumb">
      <Breadcrumb.Item key="Overview">
        <Link href="/dashboard">CMS MANAGER SYSTEM</Link>
      </Breadcrumb.Item>
      {paths.map((path) => {})}
    </Breadcrumb>
  );
}
