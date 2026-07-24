import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Carrito } from './pages/carrito/carrito';
import { Checkout } from './pages/checkout/checkout';
import { Seguimiento } from './pages/seguimiento/seguimiento';
import { Login } from './pages/admin/login/login';
import { Dashboard } from './pages/admin/dashboard/dashboard';
import { OrderSuccess } from './pages/order-success/order-success';
import { Productos } from './pages/admin/productos/productos';
import { Pedidos } from './pages/admin/pedidos/pedidos';
import { Bienvenida } from './pages/bienvenida/bienvenida';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { Usuarios } from './pages/admin/usuarios/usuarios';
import { Categorias } from './pages/admin/categorias/categorias';
import { DeliveryMode } from './pages/admin/delivery-mode/delivery-mode';


export const routes: Routes = [


    //cliente
    {
        path: '',
        component: PublicLayout,
        children: [

            {
                path: '',
                component: Bienvenida
            },

            {
                path: 'menu',
                component: Home
            },

            {
                path: 'carrito',
                component: Carrito
            },

            {
                path: 'checkout',
                component: Checkout
            },

            {
                path: 'seguimiento',
                component: Seguimiento
            },

            {
                path: 'pedido-confirmado',
                component: OrderSuccess
            }

        ]
    },

    // panel admin


    {
        path: 'admin/login',
        component: Login
    },
    {
        path: 'admin',
        component: AdminLayout,
        children: [



            {
                path: 'dashboard',
                component: Dashboard
            },

            {
                path: 'products',
                component: Productos
            },
            {
                path: 'categorias',
                component: Categorias
            },

            {
                path: 'pedidos',
                component: Pedidos
            },
             {
                path: 'delivery-modes',
                component: DeliveryMode
            },
            {
                path: 'usuarios',
                component: Usuarios
            }

        ]
    },

    {
        path: '**',
        redirectTo: "",
    },

];
