import { Breadcrumb } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { routes } from "../../services/routes";
import { configBreadCrumbItems } from "../../services/side-menu";
import { useRole } from "../../services/custom-hook";

export default function AppBreadCrumb() {
  const router = useRouter();
  const pathname = router.pathname; //string - /dashboard/students etc
  const query = router.query;
  console.log("query", query);
  const role = useRole();
  const sideNav = routes.get(role);
  const { items, path } = configBreadCrumbItems(sideNav, pathname, query);
  const detailIndex = items.indexOf("Detail");

  return (
    <Breadcrumb className="breadcrumb">
      <Breadcrumb.Item key="Overview">
        <Link
          href={`/dashboard/${role}`}
        >{`CMS ${role.toUpperCase()} SYSTEM`}</Link>
      </Breadcrumb.Item>
      {items.map((item, index) => {
        if (detailIndex === -1) {
          return <Breadcrumb.Item key={item}>{`${item}`}</Breadcrumb.Item>;
        } else {
          return (
            <Breadcrumb.Item>
              {index === detailIndex - 1 ? (
                <Link href={`${path}`}>{item}</Link>
              ) : (
                item
              )}
            </Breadcrumb.Item>
          );
        }
      })}
    </Breadcrumb>
  );
}
