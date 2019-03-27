# Github Search

An Angular SPA that allows a user to search a github.com repository by name and display a repository’s relevant information.

Demo: https://elcsiga.github.io/github-search/

## Limitations

- Currently only the autocomplete feature in the search header 
component (probably the most complex logic in this simple app) is
covered with tests.

- Github API returns only with 30 items, this is a limitation of
the not authenticated calls.

## 3rd party packages used

 - Angular Material
 - d3 
 - ngx-md (for rendering the issue markdown bodies)

## Running the app locally

```
npm install
npm start
```

#### Running tests

```
npm test
```

#### Deploying the application to GitHub pages

```
npm install -g angular-cli-ghpages
npm tun deploy
```

Application will be available at https://elcsiga.github.io/github-search/ .

