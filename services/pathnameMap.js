import { useRouter } from "next/router";
const sideMenuKeyPath = {
  "/dashboard": ["Overview"],
  "/dashboard/students": ["Student", "Student List"],
  "/dashboard/students/[id]": ["Student", "Student List"],
  "/dashboard/teachers": ["Teacher", "Teacher List"],
  "/dashboard/teachers/[id]": ["Teacher", "Teacher List"]
};
const breadcrumbKeyPath = {
  "/dashboard": ["Overview"],
  "/dashboard/students": ["Student", "Student List"],
  "/dashboard/students/[id]": ["Student", "Student List", "Detail"],
  "/dashboard/teachers": ["Teacher", "Teacher List"],
  "/dashboard/teachers/[id]": ["Teacher", "Teacher List", "Detail"]
};

function getMenuPath(router) {
  let pathName = router.pathname;
  return sideMenuKeyPath[pathName];
}
function getBreadcrumbPath(router) {
  let pathName = router.pathname;
  return breadcrumbKeyPath[pathName];
}

export { getMenuPath, getBreadcrumbPath };
