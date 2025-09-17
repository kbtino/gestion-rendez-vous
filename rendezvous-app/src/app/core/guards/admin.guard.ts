// import { CanActivateFn, Route, Router } from '@angular/router';
// import { inject } from '@angular/core';

// export const adminGuard: CanActivateFn = (route, state) => {
//   // Inject Router
//   const router = inject(Router);

//   //Recuperation de l'utilisateur depuis le localStorage
//   const userData = localStorage.getItem('user');
//   const currentUser = userData ? JSON.parse(userData) : null;

//   //Vérification du role de l'utilisateur
//   if (currentUser && currentUser.role === 'admin') {
//     //L'utilisateur est admin, accès autorisé
//     return true;
//   } else {
//     //L'utilisateur n'est pas admin, accès refusé
//     alert('Accès refusé. Vous devez être administrateur pour accéder à cette page.');
//     router.navigate(['/dashboard']); // Redirection vers le tableau de bord ou une autre page appropriée
//     return false;
//   }
// };

import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const userStr = localStorage.getItem('currentUser');
  if (!userStr) {
    alert('⚠️ Aucun utilisateur connecté !');
    return false;
  }

  const user = JSON.parse(userStr);
  console.log("🔎 Vérif rôle utilisateur :", user);

  if (user.role === 'admin') {
    return true;
  } else {
    alert('⛔ Accès réservé aux administrateurs');
    return false;
  }
};
