import { Component } from '@angular/core';
import { Category } from '../../../product/_model/category';
import { SwalMessages } from '../../../commons/_dto/swal-message';
import { CategoryService } from '../../../product/_service/category.service';
import { AuthenticationService } from '../../../authentication/_service/authentication.service';
import { CartService } from '../../../invoice/_service/cart.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  categories: Category[] = [];
  
  loggedIn: boolean = false;
  isAdmin: boolean = false;

  swal: SwalMessages = new SwalMessages();

  cartQuantity: number = 0;

  constructor(
    private categoryService: CategoryService,
    private authenticationService: AuthenticationService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.loggedIn);
    if (localStorage.getItem('token')) {
      this.loggedIn = true;
    }

    if (localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user')!);
      if (user.rol == 'ADMIN') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
        this.getCartQuantity();

      }
      console.log(this.isAdmin);
    }

    this.getCategories();

    this.categoryService.getCategoriasObservable().subscribe({
      next: (v) => {
        this.categories = v;
      },
      error: (e) => {
        console.log(e);
      }
    
    })

    this.cartService.getCountObservable().subscribe({
      next: (v) => {
        console.log(v)
        this.cartQuantity = v;
        console.log(this.cartQuantity);
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

  getCategories() {
    this.categoryService.getActiveCategories().subscribe({
      next: (v) => {
        this.categories = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  logout() {
    this.authenticationService.logOut();
    this.loggedIn = false;
    window.location.reload();
  }

  showLoginModal() {
    $("#loginModal").modal("show");
  }

  showRegisterModal() {
    $("#registerModal").modal("show");
  }

  closeRegistrationModal() {
    $("#registerModal").modal("hide");
  
  }

  handleRegistrationSuccess(event: boolean) {
    if (event) {
      // Si el registro es exitoso, cierra el modal
      this.closeRegistrationModal();
    }
  }

  getCartQuantity(){
    this.cartService.getCart().subscribe({
      next: (v) => {
        this.cartQuantity = v.body!.reduce((acumulador, cart) => acumulador + cart.quantity, 0);
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  goToCart(){
    this.router.navigate(['/cart']);
  }
  


}
