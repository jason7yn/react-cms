import { SideNav } from "./routes";
import {isEmpty} from 'lodash'

interface Query {
    id?:string
}

/**
 * genetate keys by extracting all label properties within sidenav
 * @param data SideNav[]  
 * @returns string[][]
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
 * @returns string[][]
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
      return [path].map((item) => `/dashboard/manager/${item}`);
    }
  });
  return paths;
}
/**
 * convert keys and paths from 2D array to 1D 
 * @param keys2D  keys data stored in 2D array
 * @param paths2D paths data stored in 2D array
 * @returns keys and paths in 1D array
 */
function convert2DArray(keys2D: string[][],paths2D:string[][]) {
  const keys =keys2D.reduce((prev, next) => prev.concat(next));
  const paths = paths2D.reduce((prev, next) => prev.concat(next))
  return {keys,paths}
}

function isPathEqual(target:string){
    return function(current:string){
        console.log('target',target)
        
        current = current.endsWith('/')?current.slice(0,-1):current
        console.log('current',current)
        return current===target
    }
}
/**
 * @param data array contains all sidenav item
 * @param pathname pathname of current url
 * @param query query of current url
 * @returns current key
 */
export function getActiveKey(data:SideNav[],pathname:string,query:Query):string{
    const currentRoute = isEmpty(query)?pathname:pathname.slice(0,pathname.lastIndexOf('/'))
    const isEqual = isPathEqual(currentRoute)
    const {keys,paths} = convert2DArray(generateKeys(data),generatePaths(data))
    const index = paths.findIndex(isEqual)
    return keys[index]||''

}
