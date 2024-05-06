import { Routes } from '@angular/router';
import { CategoryComponent } from '../../product/component/category/category.component';
import { ProductComponent } from '../../product/component/product/product.component';
import { RegisterComponent } from '../../authentication/register/register.component';
import { LoginComponent } from '../../authentication/login/login.component';
import { SecuredComponent } from '../../authentication/secured/secured.component';
import { authenticationGuard } from '../../authentication/_guard/authentication.guard';
import { ProductDetailComponent } from '../../product/component/product-detail/product-detail.component';
import { HomeComponent } from '../../../home/home.component';
import { InvoiceComponent } from '../../invoice/component/invoice/invoice.component';
import { Product2Component } from '../../product/component/product2/product2.component';


export const AppLayoutRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'category', component: CategoryComponent },
    // {path: 'register', component: RegisterComponent},
    // {path: 'login', component: LoginComponent},
    { path: 'secured', component: SecuredComponent, canActivate: [authenticationGuard] },
    { path: 'product', component: Product2Component},
    {path: 'product/:categoryId/:category', component: Product2Component},
    { path: 'product/:gtin', component: ProductDetailComponent },
    {path: "factura", component:InvoiceComponent}
];
