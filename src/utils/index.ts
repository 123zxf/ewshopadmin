import { NIcon } from "naive-ui"
import { Component, h } from "vue"

export const renderIcon = (icon: Component) => {
    return () => {
      return h(NIcon, null, {
        default: () => h(icon)
      })
    }
  }

  export function generatorMenu(routerMap:Array<any>){
    routerMap.sort((a,b)=>a.meta.sort-b.meta.sort);
    let result = routerMap.map((item)=>{
      let menu = {
        label:item?.meta?.title,
        key:item?.name,
        icon:item.meta?.icon,
        children:item.children?.a,
    }
      if(item.children && item.children.length >1 ){
        menu.children = generatorMenu(item.children)
      }  
      return menu
    })
    return result;
  }