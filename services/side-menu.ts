import { SideNav } from "./routes";
import {isEmpty} from 'lodash'
import { generateKey } from "crypto";

interface Query {
    id?:string
}

/**
 * genetate keys by extracting all label properties within sidenav
 * @param data SideNav[]  
 * @returns string[][] - 2D array contains all label property
 */
function generateKeys(data: SideNav[], parent = ""): string[][] {
  const keys = data.map((item) => {
    let key = item.label; //string
    if (parent) {
      key = [parent, key].join("/"); //string
    }
    if (item.subNav && item.subNav.length) {
      //[parent/child,parent/child]
      return generateKeys(item.subNav, key).map((item) => item.join("/"));
    } else {
      return [key]; //string
    }
  });
  return keys;
}
/**
 * genetate paths by extracting all path properties within sidenav
 * @param data SideNav[]  
 * @returns string[][] - 2D array contains all path property
 */
function generatePaths(data: SideNav[], parent = ""): string[][] {
  const paths = data.map((item) => {
    let path = item.path.join(""); //convert array to string
    if (parent) {
      path = [parent, path].join("/"); //string
    }
    if (item.subNav && item.subNav.length) {
      return generatePaths(item.subNav, path).map((item) => item.join("/"));
    } else {
      //Todo:change here to dynamically obtain user role 
      return [path].map((item) => `/dashboard/manager/${item}`);
    }
  });
  return paths;
}

/**
 * get keys and paths 
 * @param data SideNav[]
 * @returns keys and paths in 1D array
 */
function getKeysAndPaths(data:SideNav[]){
  //get keys and paths(2D array) and convert it to 1D array(reduce method)
  const keys = generateKeys(data).reduce((prev,next)=>prev.concat(next))
  const paths = generatePaths(data).reduce((prev, next) => prev.concat(next))
  return {keys,paths}
}

function isPathEqual(target:string){
    return function(current:string){
        current = current.endsWith('/')?current.slice(0,-1):current
        return current===target
    }
}
/**
 * check whether the current url points to a detail page
 * @param query router.query
 * @returns true if current page is detail page, else false
 */
function isDetailPage(query:Query):boolean{
  return !isEmpty(query)?true:false
}
/**
 * @param data array contains all sidenav item
 * @param pathname pathname of current url
 * @param query query of current url
 * @returns current key
 */
export function getActiveKey(data:SideNav[],pathname:string,query:Query):string{
    const isDetail= isDetailPage(query)
    const currentRoute = isDetail?pathname.slice(0,pathname.lastIndexOf('/')):pathname;
    const isEqual = isPathEqual(currentRoute)
    const {keys,paths} = getKeysAndPaths(data)
    const index = paths.findIndex(isEqual)
    return keys[index]||''

}

export function configBreadCrumbItems(data:SideNav[],pathname:string,query:Query){
  const isDetail = isDetailPage(query)
  const currentRoute = isDetail?pathname.slice(0,pathname.lastIndexOf('/')):pathname;
  const isEqual = isPathEqual(currentRoute)
  const {keys,paths} = getKeysAndPaths(data)
  //if index === -1, item not found, else, found
  const index = paths.findIndex(isEqual)
  if(index===-1){
    return {}
  }
  else{
    let items = keys[index].split('/')
    items = isDetail?items.concat(['Detail']):items
    let path = paths[index]
    path = path.endsWith('/')?path.slice(0,-1):path
    return {items,path}
  }
}
