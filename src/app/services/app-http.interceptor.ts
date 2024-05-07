import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {AppStateService} from "./app-state.service";
import {finalize} from "rxjs";
import {LoadingService} from "./loading.service";



export const appHttpInterceptor: HttpInterceptorFn = (req, next,) => {
let appState = inject(AppStateService);
const loadingService = inject(LoadingService);

/* appState.setProductState({
  status : "LOADING"
})*/

 loadingService.showLoadingSpinner();
let request = req.clone({
  headers : req.headers.set("Authorization", "Bearer JWT")
});
return next(request).pipe(
  finalize(()=>{
   // appState.setProductState({
    //  status : ""
   // })
    loadingService.hideLoadingSpinner();
  })
);

};
