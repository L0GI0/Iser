<p align="center"></p>

<p align="center">
   <a href="https://github.com/L0GI0/Iser" target="_blank">
      <img src="https://github.com/L0GI0/Iser/blob/master/public/static/iser-logo.png" alt="iser" width="60px" height="auto">
   </a>
</p>

<h1 align="center">
   <a href="https://github.com/L0GI0/Iser" target="_blank" align="center">
      Iser - Free MUI & Redux Observables React Admin Dashboard
   </a>
</h1>

<p align="center">Rxjs Async Declarative & Comprehensive Free MUI React Admin Dashboard built for any domain use!

</p>

<p align="center">
   <a href="https://github.com/L0GI0/Iser/blob/feature/update-read-me-file/LICENSE.md">
      <img src="https://img.shields.io/badge/LICENSE-MIT-green" alt="license">
   </a>
</p>

This is a React app that I built form stratch, in order to use it as a ready template with already connected API and fully utilized features for any application that I'm creating for commercial or private use. It can be used and customised as a admin panel for any business and industry domain, e.g. ecommerce (Shopify dashboard). Also have different variants of this app (e.g. Next.js version) which I can share with you privately. This project uses the following technologies:

- React
- React Redux using reduxjs/toolkit
- Redux observables using rjxs (Async data streams)
- React router dom (Next.js version private)
- Epic Middleware (Declarative middleware)
- Material UI combined with styled-components
- Apexchart
- Notistack
- i18next (Internationalisation)
- Why did you render (Performance monitoring)

## Features 📦

- Analytics dashboard
<br/>![iser-notificaiton-showcase](https://github.com/L0GI0/Images/blob/master/Iser-analytics-feature.gif)<br/>
- Fully functional, dynnamically paginated, searchable users table with user edit options popovers
<br/>![iser-notificaiton-showcase](https://github.com/L0GI0/Images/blob/master/Iser-users-table-feature.gif)<br/>
- Customisable MUI theme with dark and light mode and customised MUI Components
<br/>![iser-notificaiton-showcase](https://github.com/L0GI0/Images/blob/master/Iser-theme-mode-feature.gif)<br/>
- State change notificaiton system (Custom hooks with Notistack)
<br/>![iser-notificaiton-showcase](https://github.com/L0GI0/Images/blob/master/Iser-notifications-feature.gif)<br/>
- JWT based authentication and authorisation
<br/>![iser-notificaiton-showcase](https://github.com/L0GI0/Images/blob/master/Iser-authorisation-feature.gif)<br/>
- Progressive web page
<br/>![iser-notificaiton-showcase](https://github.com/L0GI0/Images/blob/master/Iser-progressive-feature.gif)<br/>
- Admin dashboard for users management (Users table and users edit views)
- Cancelable requests using epic middleware based on async data streams
- Role based authorised features and route guards
- Internationalisation (EN-gb and PL languages implemented by defualt)
- User profile (Views for editing and customising users profile)


<a href="https://github.com/L0GI0/Iser](https://www.youtube.com/watch?v=Hh8DeDIwwGY" target="_blank">
   <img src="https://user-images.githubusercontent.com/48987014/211198294-6d7117d9-61dd-49f3-975c-2d41542833ec.png" alt="iser" width="60px" height="auto">
</a>
</br>
 <a href="https://github.com/L0GI0/Iser](https://www.youtube.com/watch?v=Hh8DeDIwwGY" target="_blank" align="center">
   Iser - Youtube
</a>


## What I Learned 💡

While building this app, I learned:

- How to implement robust but architecture clean and performance efficient react app using typescript
- How to create React App UI Layout using Material UI (Collapsable Sidebar, Navbar with search-bar, profile menu, notifications menu, language menu)
- How to use Material UI and create custom customisable theme with dark and light mode.
- How to override base MUI Components using its global CSS styles
- How to extend default MUI Theme by new properties
- How to create global notification system on target state change using Notistack, while keeping performance and not rerendering root tree
- How to implement user management UI and API: User details edition, user permission change, user deletion and handling edge cases. And how to update any live user change by an another authorised user on token refresh
- How to internationalise react app using i18next
- How to implement cancelable requests using Epic middleware
- How to implement diverse progressive web page layouts
- How to use react-redux toolkit with epic middleware using redux observables. Got familiar with rxjs, observables and declarative way of handling async code
- How to improve performance by detecting and getting rid of unnecessary app renders using why-did-you-render by Welldone Software
- How to implement JWT based authorisation and authentication. How to automatically refresh token after it's expiration is detected on any API call, and how to fulfill initial request with new token using async data stream with epic middleware

## Architecture 🏗️

This app uses the clean architecture pattern, with a strict separation of concerns between the following layers:

- UI Layer (Views) - React Material UI
- Application (Business logic) - React Redux
- Data access layer (Infrastructure): Epic middleware + rxjs/ajax

The project is organized using a feature-based folder structure, with each feature having its own folder containing all necessary components, actions, reducers, epics and selectors. Example tree for account and notifiers features:
```
├─ features
│  ├─ account
│  │  ├─ components
│  │  │  ├─ AppError.tsx
│  │  │  ├─ AuthError.tsx
│  │  │  ├─ CredentialsFormInput.tsx
│  │  │  ├─ InfoContent.tsx
│  │  │  └─ styledElements.tsx
│  │  ├─ constants.ts
│  │  ├─ settings
│  │  │  ├─ components
│  │  │  │  ├─ AppearanceSettings.tsx
│  │  │  │  └─ PasswordSettings.tsx
│  │  │  └─ SettingsView.tsx
│  │  ├─ SignIn
│  │  │  └─ SignInView.tsx
│  │  ├─ SignUp
│  │  │  └─ SignUpView.tsx
│  │  └─ store
│  │     ├─ accountEpic.ts
│  │     └─ accountSlice.ts
│  └─ notifiers
│     ├─ EnhancedSnackbarProvider.tsx
│     ├─ store
│     │  └─ notifiersSlice.ts
│     ├─ useSnackbarNotifier.ts
│     └─ useStateChangeNotifiers.tsx
```
## Getting Started ⚒️

To get started with this app, follow these steps:

1. Clone the repository to your local machine
2. Navigate to the root directory of the project
3. Run `npm install` to install dependencies
4. Run `npm run start` to start the development server
5. Download and setup [Iser-Server](https://github.com/L0GI0/Iser-Server) to unlock all application capabilities

## Credits 🙏

- [MUI](https://mui.com/)
- [React](https://reactjs.org/)
- [Material Design Icons](https://materialdesignicons.com/)
- [ApexCharts](https://apexcharts.com/)
- [SimpleScrollbar](https://grsmto.github.io/simplebar/)
- [i18next](https://www.i18next.com/)
- [why-did-you-render](https://github.com/welldone-software/why-did-you-render/)
- [redux-observable](https://redux-observable.js.org/)

## License

Licensed under MIT [LICENSE](https://github.com/L0GI0/Iser/blob/master/LICENSE.md)
