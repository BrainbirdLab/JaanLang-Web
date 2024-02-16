import { redirect } from "@sveltejs/kit";

export function load(){
    console.log('redirecting');
    return redirect(302, '/');
}