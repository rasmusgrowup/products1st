# Product search
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Running the project

First, install the dependencies.

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About the solution

The solution has been developed using Next.js, with the new App Router architecture.
The architecture follows best practice rules in how you would structure a Next.js project.
The key components of the application can be found in the ```app``` directory.
In this directory you'll find the pages of the app, it's layout definitions and the components
used on each page. The components are reusable across the app.

Dynamic routing has been used to render a page for each product, meaning if you click on a product
on the home page, you'll get redirected to a subpage for that specific product. ```app/products/[id]```
is the route that enables this functionality. 

The product.json file has been moved to the ```data``` directory.

A product API has been developed to enable the search function, and to mimic an actual backend API serving the product data.
The API can be found in ```pages/api```, and features both an API that enables searching the entire product baglog,
and an API that serves the data for a single product.

SCSS modules are used to style the components. A global css file provides global styling, such as font declarations, color
variables, etc. The site has been made responsive, although you may find that the responsiveness needs further tweaking,
because responsiveness has not been a major focus of this project.

The product.d.ts file has been moved to the ```types``` directory, where types of different sorts is declared.
The file has been modified to better support typescript, meaning that **union types** has been added to each type.

### About the search functionality
The search functionality of this app fulfills the requirements described in the task description.
However, for a better user experience, session memory could be used to store the search queries,
so that when a user navigates from the search page to a product page, and back again, the search query
would remain, so that the user wouldn't have to repeat their searches. But for this hand-in, this has not
been the primary focus. 

## About the project

Your task is to implement a product listing feature. The products are available from the [products.json](https://raw.githubusercontent.com/servicepos/projectsearch/0f840c4a3793eca4f0c22141238f02373bbe49ea/products.json) file included in this repository. Your solution should make it possible for users to browse and search the products.

### Getting started
1. Choose your framework
2. Create a new git repository and commit your solution to this repository.
3. Implement your solution to match the requirements below.
4. When you are done, please send us a link to your repository. (You could use GitHub, GitLab, Bitbucket or similar to host your repository)

We look forward to seeing your solution.

## Functional requirements:
1. Your solution must include a list of products.
    1. The products should be fetched from the products.json file (Hint: if you use Angular you should use the HttpClient to fetch the products.json file. https://angular.io/guide/http-request-data-from-server)
    2. The list should be paginated (Hint: slice)
2. The list of products should be searchable (Hint: https://www.learnrxjs.io/learn-rxjs/recipes/type-ahead)
    1. The search results should be updated while typing in the search input. The search should debounced to prevent unnecessary fetches of the products.json file. When implemented correctly, the search should only fetch the products.json file once, when the user has stopped typing for a short period of time.
    2. The search should be implemented in a fulltext manner, so that searching for "Power SRAM" will find the product "SRAM Power Pack PG-1050”.

## Technical requirements:

1. Your solution should be implemented using a modern framework like Angular, React, Vue.js or similar.
2. Demonstrate that you understand relevant technologies in your chosen framework
    1. Separation of components, services etc.
3. Show you know how to handle callbacks or asynchronous code using: Observables, Promises, Signals or similar.
4. Use GIT as your version control

## Optional requirements:

If you find the task too easy, or want further challenges, you can consider the following list of ideas to extend your solution.

1. Detailed product view
    1. When selecting a product in the list a detail/edit view should be shown.
    2. If your chosen framework supports routing, you could add support for linking directly to a selected product.
2. Update products
    1. Add an edit form to allow users to update products.
    2. If you want, you could store the products fetched from the json file in a local cache (variable in TS, in your service, indexedDB or similar), and then write your updated products to this store.
3. Authentication
    1. Add a login page to your project. Making sure that only authenticated users are allowed to browse the products.
    2. Optionally add support for authorization, so that only certain users have access to all features of your project. For instance you could limit access to the searching feature, details view, edit view or similar.
4. Your own ideas are welcome too! If you can think of a cool technology or feature, you would like to create, we encourage you to do so.

### Helpful links:

1. https://angular.io/guide/architecture-components
2. https://angular.io/guide/setup-local
3. https://angular.io/guide/interpolation#template-expressions
4. https://angular.io/guide/pipes
5. https://angular.io/guide/http
6. https://www.learnrxjs.io

