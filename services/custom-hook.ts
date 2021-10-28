import { useEffect,useState } from "react"
import { useRouter } from "next/router";

type Role = 'student'|'manager'|'teacher';
export function useRole():Role{
    const router = useRouter();
    const path = router.pathname.split('/');
    const role = path[2];
    
    return role as Role;
}